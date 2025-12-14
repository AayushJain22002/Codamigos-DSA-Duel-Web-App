import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Coffee } from 'lucide-react'; // Added Coffee for donation icon (optional, or use Heart)
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="w-full bg-[#050505] border-t border-[#222] text-neutral-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <img src="/icons/_Transparent_symbol.png" className='w-8 h-8' alt="Codamigos Logo"/>
              <span>Codamigos</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              The ultimate real-time arena for developers. Compete, rank up, and master algorithms together.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<FaGithub  size={20} />} href="#" />
              <SocialIcon icon={<BsTwitterX  size={20} />} href="#" />
              <SocialIcon icon={<FaLinkedin  size={20} />} href="#" />
            </div>
          </div>

          {/* Links Column 1: Platform */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/room">Create Room</FooterLink>
              <FooterLink to="/leaderboard">Leaderboard</FooterLink>
              <FooterLink to="/problems">Problem Set</FooterLink>
              <FooterLink to="/community">Community</FooterLink>
            </ul>
          </div>

          {/* Links Column 2: Support (NEW) */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/support">Customer Care</FooterLink>
              <FooterLink to="/suggestions">Suggestion Box</FooterLink>
              <FooterLink to="/blog">Official Blog</FooterLink>
              
              {/* Special Donation Link */}
              <li>
                <Link 
                  to="/donate" 
                  className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors duration-200 w-fit font-medium"
                >
                  <span>Donate</span>
                  <Heart size={12} className="fill-yellow-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Legal & Docs */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/cookies">Cookie Policy</FooterLink>
              <FooterLink to="/api-docs">API Documentation</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#222] pt-8 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>© {new Date().getFullYear()} Codamigos. All rights reserved.</p>
          <div className="flex items-center gap-1 mt-4 md:mt-0">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>by Akshat Raval</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Helper Components for clean code ---

const FooterLink = ({ to, children }) => (
  <li>
    <Link 
      to={to} 
      className="hover:text-yellow-500 transition-colors duration-200 block w-fit"
    >
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ icon, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;