import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Edit2, Mail, Award, RefreshCw, ExternalLink, Users, Check, Copy, LinkIcon, Globe, Twitter, Linkedin, Github } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../lib/AuthProvider';
import { doc, getDoc, query, collection, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import NotFound from "./NotFound";
import toast from "react-hot-toast";

export default function Profile() {
  const { handle } = useParams(); // Returns "AkshatRaval" if visiting /u/AkshatRaval
  const { userData: authUser, loading: authLoading } = useAuth(); // Logged-in user
  const navigate = useNavigate();

  // State for the profile being viewed (could be me, could be someone else)
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  // Modal states
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ displayName: '', bio: '', email: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);

      // SCENARIO 1: Viewing /profile (Private Route)
      if (!handle) {
        if (!authLoading && !authUser) {
          navigate('/auth'); // Redirect if not logged in
          return;
        }
        if (authUser) {
          setProfileData(authUser);
          setIsOwner(true);
          setLoading(false);
        }
        return;
      }

      // SCENARIO 2: Viewing /u/:handle (Public Route)
      try {
        let targetUid = null;

        // A. Check handles collection
        const handleRef = doc(db, "handles", handle.toLowerCase());
        const handleSnap = await getDoc(handleRef);

        if (handleSnap.exists()) {
          targetUid = handleSnap.data().uid;
        } else {
          // B. Fallback query (if doc ID isn't the handle)
          const q = query(collection(db, "handles"), where("handle", "==", handle.toLowerCase()));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            targetUid = querySnapshot.docs[0].data().uid;
          }
        }

        if (targetUid) {
          // Check if the viewer IS the owner
          if (authUser && authUser.uid === targetUid) {
            setProfileData(authUser); // Use local fresh auth data
            setIsOwner(true);
          } else {
            // Fetch public data for stranger
            const userRef = doc(db, "users", targetUid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              setProfileData(userSnap.data());
              setIsOwner(false);
            } else {
              setProfileData(null); // User not found
            }
          }
        } else {
          setProfileData(null); // Handle not found
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [handle, authUser, authLoading, navigate]);


  // --- Event Handlers ---
  function handleEditClick() {
    setForm({
      displayName: profileData?.displayName || '',
      bio: profileData?.bio || '',
      email: profileData?.email || ''
    });
    setEditOpen(true);
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    // Safety check
    if (!authUser || !authUser.uid) {
      toast.error("You must be logged in to edit.");
      return;
    }

    // Visual feedback start
    const toastId = toast.loading("Updating profile...");

    try {
      const userRef = doc(db, "users", authUser.uid);

      // 1. Prepare the data object
      const updates = {
        displayName: form.displayName,
        bio: form.bio,
        email: form.email
      };

      // 2. Send update to Firebase
      await updateDoc(userRef, updates);

      // 3. Update the local UI state immediately 
      // (This keeps the profile snappy without needing a page reload)
      setProfileData(prev => ({
        ...prev,
        ...updates
      }));

      // 4. Success feedback
      toast.success("Profile updated successfully!", { id: toastId });
      setEditOpen(false);

    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.", { id: toastId });
    }
  }

  // --- Renders ---

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-[#07070a] flex items-center justify-center text-gray-400">
        <RefreshCw className="animate-spin mr-2" /> Loading...
      </div>
    );
  }

  if (!profileData) return <NotFound />;

  // Derived calculations
  const gamesPlayed = (profileData.wins || 0) + (profileData.losses || 0);
  const rank = profileData.elo ? Math.max(1, Math.floor(1000 - profileData.elo / 2)) : '—';
  const progress = Math.min(100, Math.max(0, ((profileData.elo || 0) / 1000) * 100));

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#07070a] to-[#0f0f11] p-6 text-gray-200 pt-16">
      <div className="max-w-6xl mx-auto">

        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {isOwner ? "Your Profile" : "Profile"}
            </h1>
            <p className="text-sm text-gray-400">
              {isOwner ? "Welcome back to your command center" : `Viewing ${profileData.userHandle || 'user'}'s stats`}
            </p>
          </div>

          {/* Only Show Edit Button if Owner */}
          {isOwner && (
            <button onClick={handleEditClick} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#141416] border border-[#28282b] text-white hover:border-gray-500 transition-colors">
              <Edit2 size={16} />
              <span className="hidden sm:inline">Edit profile</span>
            </button>
          )}
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <aside className="lg:col-span-1 space-y-4">
            <AvatarCard
              avatar={profileData.avatarUrl}
              displayName={profileData.displayName}
              userHandle={profileData.userHandle}
              bio={profileData.bio}
              elo={profileData.elo}
              joined={profileData.createdAt}
            />
          </aside>

          <section className="lg:col-span-3 space-y-6">
            <ProfileHeader data={profileData} progress={progress} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#0f0f11] border border-[#232326] rounded-2xl p-5">
                <ContactCard email={profileData.email} socials={profileData.socials} isOwner={isOwner} />

              </div>

              <div className="bg-[#0f0f11] border border-[#232326] rounded-2xl p-5">
                <h4 className="font-medium text-white">Performance</h4>
                <div className="mt-3 space-y-3">
                  <PerformanceRow label="Games played" value={gamesPlayed} />
                  <PerformanceRow label="Wins" value={profileData.wins ?? 0} />
                  <PerformanceRow label="Losses" value={profileData.losses ?? 0} />
                  <PerformanceRow label="Rank" value={profileData.elo ? `#${rank}` : '—'} />
                </div>
                <div className="mt-6">
                  <h5 className="text-sm text-gray-400">Badges</h5>
                  <BadgeList badges={profileData.badges} />
                </div>
              </div>
            </div>

            <div className="bg-[#0f0f11] border border-[#232326] rounded-2xl p-5">
              <h4 className="font-medium text-white">Activity feed</h4>
              <p className="text-sm text-gray-400 mt-2">Full feed coming soon.</p>
            </div>
          </section>
        </main>

        {/* Edit Modal (Only renders if Edit Open AND Owner) */}
        {isOwner && editOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setEditOpen(false)} />
            <motion.form initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative bg-[#141416] border border-[#28282b] rounded-2xl shadow-xl max-w-2xl w-full p-6 z-50" onSubmit={handleFormSubmit}>
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-white">Edit profile</h3>
                <button type="button" onClick={() => setEditOpen(false)} className="text-gray-400 hover:text-white">Close</button>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-xs text-gray-400 mb-1">Display name</span>
                  <input name="displayName" value={form.displayName} onChange={handleFormChange} className="p-2 border border-[#28282b] rounded bg-[#0b0b0d] text-white focus:border-indigo-500 outline-none" required />
                </label>

                <label className="flex flex-col">
                  <span className="text-xs text-gray-400 mb-1">Handle (Locked)</span>
                  <input value={profileData.userHandle || ''} readOnly className="p-2 border border-[#28282b] rounded bg-[#1a1a1c] text-gray-500 cursor-not-allowed" />
                </label>

                <label className="flex flex-col md:col-span-2">
                  <span className="text-xs text-gray-400 mb-1">Bio</span>
                  <textarea name="bio" value={form.bio} onChange={handleFormChange} className="p-2 border border-[#28282b] rounded bg-[#0b0b0d] text-white focus:border-indigo-500 outline-none" rows={3} />
                </label>

                <label className="flex flex-col md:col-span-2">
                  <span className="text-xs text-gray-400 mb-1">Email</span>
                  <input name="email" value={form.email} onChange={handleFormChange} className="p-2 border border-[#28282b] rounded bg-[#0b0b0d] text-white focus:border-indigo-500 outline-none" />
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setEditOpen(false)} className="px-4 py-2 rounded-lg border border-[#28282b] text-gray-300 hover:bg-[#1f1f22]">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Save changes</button>
              </div>
            </motion.form>
          </motion.div>
        )}

      </div>
    </div>
  );
}

// --- Sub Components (Same as before, slight tweaks) ---

function AvatarCard({ avatar, displayName, userHandle, bio, elo, joined }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (!userHandle) return;

    // 1. Write text to clipboard
    navigator.clipboard.writeText(userHandle);

    // 2. Show checkmark
    setCopied(true);

    // 3. Revert back to copy icon after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };
  const formatDate = (date) => {
    if (!date) return '—';

    // 1. Convert Firestore Timestamp to JS Date
    const jsDate = date.seconds ? new Date(date.seconds * 1000) : new Date(date);

    // 2. Format options for "12 Dec 25"
    return jsDate.toLocaleDateString('en-GB', {
      day: '2-digit',   // "12"
      month: 'short',   // "Dec" (use 'long' for "December")
      year: '2-digit'   // "25"  (use 'numeric' for "2025")
    });
  };
  return (
    <div className="bg-[#111113] border border-[#232326] rounded-2xl p-5 text-center">
      <div className="w-28 h-28 mx-auto rounded-full ring-2 ring-[#1f1f23] overflow-hidden bg-[#1a1a1c]">
        {avatar ? (
          <img src={`/avatars/${avatar}`} className="w-full h-full object-cover" alt="avatar" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500"><Users size={32} /></div>
        )}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white">{displayName || 'User'}</h3>
      <div className="flex justify-center mt-2">
        <button
          onClick={handleCopy}
          className="group flex items-center cursor-pointer gap-2 px-3 py-1.5 rounded-full bg-[#1a1a1c] border border-[#28282b] hover:border-indigo-500/50 hover:bg-[#232326] transition-all duration-200"
          title="Click to copy handle"
        >
          <span className="text-xs font-mono text-gray-400 group-hover:text-gray-200">
            {userHandle || 'unknown'}
          </span>

          {copied ? (
            <Check size={12} className="text-green-500" />
          ) : (
            <Copy size={12} className="text-gray-500 group-hover:text-indigo-400 transition-colors" />
          )}
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-300">{bio || 'No bio available'}</p>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm border-t border-[#232326] pt-4">
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">ELO</div>
          <div className="font-medium text-white text-lg">{elo ?? '—'}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Joined</div>
          <div className="font-medium text-white text-lg">
            {joined?.seconds
              ? formatDate(joined)
              : '—'}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileHeader({ data, progress }) {
  return (
    <div className="bg-[#111113] border border-[#232326] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
          {data?.displayName}
          {data?.elo > 800 && <Award size={20} className="text-yellow-500" />}
        </h2>
        <p className="text-sm text-gray-400 mt-1 max-w-lg">{data?.bio || 'No bio provided.'}</p>
      </div>
      <div className="w-full md:w-56 bg-[#0f0f11] p-3 rounded-xl border border-[#232326]">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Rank Progress</span>
          <span className="text-white font-mono">{data?.elo ?? 0} <span className="text-gray-600">/ 1000</span></span>
        </div>
        <div className="w-full bg-[#1a1a1d] rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
          />
        </div>
      </div>
    </div>
  )
}
function ContactCard({ email, socials, isOwner }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (!email || !isOwner && email === 'Hidden') return;

    // Allow copying if it's the owner OR if the email is public/visible
    const textToCopy = isOwner ? (email || '') : email;

    if (textToCopy && textToCopy !== 'Hidden') {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const hasSocials = socials && (socials.github || socials.linkedin || socials.website || socials.twitter);

  return (
    <div className="h-full flex flex-col">
      <h4 className="font-medium text-white flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400">
          <LinkIcon size={16} />
        </div>
        Connect
      </h4>

      <div className="space-y-4 flex-1">

        {/* --- Email Card (Clickable) --- */}
        <div
          onClick={handleCopyEmail}
          className={`group relative overflow-hidden bg-[#141416] border border-[#28282b] rounded-xl p-4 transition-all duration-300 
            ${(email && email !== 'Hidden') ? 'hover:border-indigo-500/50 cursor-pointer active:scale-[0.98]' : 'opacity-70 cursor-default'}
          `}
        >
          {/* Subtle glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#1f1f22] text-gray-300 group-hover:text-white group-hover:bg-indigo-500 transition-colors duration-300">
              <Mail size={18} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Email Address</p>
              <p className="text-gray-200 truncate font-mono text-sm">
                {isOwner ? (email || 'No email set') : (email || 'Hidden')}
              </p>
            </div>

            {/* Copy Action Icon */}
            {(email && email !== 'Hidden') && (
              <div className="text-gray-500 group-hover:text-indigo-400 transition-colors">
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </div>
            )}
          </div>
        </div>

        {/* --- Social Grid (Bento Style) --- */}
        {hasSocials ? (
          <div className="grid grid-cols-2 gap-3">
            {socials.github && (
              <SocialTile
                href={socials.github}
                icon={<Github size={18} />}
                label="GitHub"
                subLabel="Code & Repos"
                color="hover:border-white/40 hover:bg-white/5"
              />
            )}

            {socials.linkedin && (
              <SocialTile
                href={socials.linkedin}
                icon={<Linkedin size={18} />}
                label="LinkedIn"
                subLabel="Professional"
                color="hover:border-blue-500/50 hover:bg-blue-500/10"
                iconColor="group-hover:text-blue-400"
              />
            )}

            {socials.twitter && (
              <SocialTile
                href={socials.twitter}
                icon={<Twitter size={18} />}
                label="Twitter"
                subLabel="Updates"
                color="hover:border-sky-500/50 hover:bg-sky-500/10"
                iconColor="group-hover:text-sky-400"
              />
            )}

            {socials.website && (
              <SocialTile
                href={socials.website}
                icon={<Globe size={18} />}
                label="Website"
                subLabel="Portfolio"
                color="hover:border-emerald-500/50 hover:bg-emerald-500/10"
                iconColor="group-hover:text-emerald-400"
                fullWidth={!socials.twitter} // Span full width if distinct count is odd
              />
            )}
          </div>
        ) : (
          <div className="p-6 rounded-xl border border-dashed border-[#28282b] text-center">
            <p className="text-sm text-gray-500">No social links added yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* --- Helper Component for the Tiles --- */
function SocialTile({ href, icon, label, subLabel, color, iconColor, fullWidth }) {
  // Ensure href has protocol
  const safeHref = href.startsWith('http') ? href : `https://${href}`;

  return (
    <a
      href={safeHref}
      target="_blank"
      rel="noreferrer"
      className={`group flex items-center gap-3 p-3 bg-[#141416] border border-[#28282b] rounded-xl transition-all duration-300 ${color} ${fullWidth ? 'col-span-2' : ''}`}
    >
      <div className={`text-gray-400 transition-colors duration-300 ${iconColor || 'group-hover:text-white'}`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{label}</span>
        <span className="text-[10px] text-gray-500 uppercase tracking-wide">{subLabel}</span>
      </div>
      <ExternalLink size={12} className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gray-500" />
    </a>
  )
}


function BadgeList({ badges }) {
  if (!badges || badges.length === 0) return <p className="text-sm text-gray-500 italic">No badges earned yet.</p>
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {badges.map((b, i) => (
        <div key={i} className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-md text-xs font-medium">
          {b}
        </div>
      ))}
    </div>
  )
}

function PerformanceRow({ label, value }) {
  return (
    <div className="flex items-center justify-between p-2 rounded hover:bg-[#141416]">
      <div className="text-sm text-gray-400">{label}</div>
      <div className="font-medium text-white font-mono">{value}</div>
    </div>
  )
}