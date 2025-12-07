// scripts/update-metadata.mjs
import adminPkg from 'firebase-admin';
import { createRequire } from 'module';
import { configDotenv } from 'dotenv';
import path from 'path';

const require = createRequire(import.meta.url);
configDotenv();
const admin = adminPkg;

// 1. SETUP: Load Service Account
const svcPath = process.env.SERVICE_ACCOUNT_PATH || process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!svcPath) {
    console.error("❌ Error: SERVICE_ACCOUNT_PATH is missing in .env");
    process.exit(1);
}
const serviceAccount = require(path.resolve(svcPath));

// Initialize only if not already initialized
if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}
const db = admin.firestore();

// 2. LOGIC: Group IDs by difficulty
async function updateMetadata() {
    console.log("🔍 Scanning 'problems' collection...");
    
    const snapshot = await db.collection('problems').get();
    
    const easy = [];
    const medium = [];
    const hard = [];
    const all = [];

    snapshot.forEach(doc => {
        const id = doc.id;
        const data = doc.data();
        const diff = (data.difficulty || 'easy').toLowerCase();

        all.push(id);
        if (diff === 'easy') easy.push(id);
        else if (diff === 'medium') medium.push(id);
        else if (diff === 'hard') hard.push(id);
    });

    // 3. SAVE: Write to 'system/metadata'
    await db.collection('system').doc('metadata').set({
        problemIds: {
            all,
            easy,
            medium,
            hard
        },
        totalCount: all.length,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`✅ Success! Metadata updated.`);
    console.log(`📊 Stats: All: ${all.length} | Easy: ${easy.length} | Medium: ${medium.length} | Hard: ${hard.length}`);
}

updateMetadata();