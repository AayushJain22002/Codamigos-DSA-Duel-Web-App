// migrate-many-problems.mjs
// Usage:
//   1) npm install firebase-admin dotenv
//   2) export SERVICE_ACCOUNT_PATH="/path/to/serviceAccountKey.json"
//   3) node migrate-many-problems.mjs <problems.json|problems.js>

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import adminPkg from 'firebase-admin';
import { configDotenv } from 'dotenv';

const require = createRequire(import.meta.url);
const admin = adminPkg;

configDotenv();
const svcPath = process.env.SERVICE_ACCOUNT_PATH;
if (!svcPath || !fs.existsSync(svcPath)) {
  console.error('Error: Set SERVICE_ACCOUNT_PATH or GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path.');
  process.exit(1);
}

const serviceAccount = require(path.resolve(svcPath));

// Prevent re-initialization error if running in weird environments, though unlikely here
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}
const db = admin.firestore();

// 2. Helper to load .json or .js/.mjs files
async function loadProblems(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  if (ext === '.json') {
    const raw = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } else if (ext === '.js' || ext === '.mjs' || ext === '.cjs') {
    const abs = path.resolve(filePath);
    const url = `file://${abs}`;
    const mod = await import(url);
    
    // Support various export styles
    if (Array.isArray(mod.dataset)) return mod.dataset;
    if (Array.isArray(mod.default)) return mod.default;
    if (Array.isArray(mod.problems)) return mod.problems;
    
    throw new Error('JS module must export an array named `dataset`, `problems`, or as `default`.');
  } else {
    throw new Error('Unsupported file extension. Use .json or .js/.mjs');
  }
}

// 3. Main Migration Logic
async function migrate(file) {
  console.log(`Loading problems from ${file}...`);
  const problems = await loadProblems(file);
  
  if (!Array.isArray(problems)) {
    throw new Error('Data must be an array of problem objects.');
  }

  const batchLimit = 500;
  let batch = db.batch();
  let ops = 0;
  let count = 0;

  for (const p of problems) {
    if (!p.id) {
      console.warn('Skipping problem without "id" field.');
      continue;
    }

    const docRef = db.collection('problems').doc(p.id);

    // Prepare the document data based on your specific schema
    const docData = {
      id: p.id,
      title: p.title || "Untitled",
      difficulty: p.difficulty || "easy",
      tags: p.tags || [],
      statement: p.statement || "",
      constraints: p.constraints || [],
      inputFormat: p.inputFormat || "",
      outputFormat: p.outputFormat || "",
      samples: p.samples || [],
      testCases: p.testCases || [],
      functionName: p.functionName || "solve",
      limits: p.limits || { timeMs: 1000, memoryMb: 256 },
      
      // We directly save the languages object (containing starterCode & wrapperTemplate)
      // Firestore maps correspond perfectly to JSON objects.
      languages: p.languages || {},

      // Timestamps
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    // Use { merge: true } so we don't accidentally wipe fields if you add extra ones manually in DB later,
    // but we ensure the structure provided in JSON overwrites the DB.
    batch.set(docRef, docData, { merge: true });

    ops++;
    count++;

    // Commit batch if limit reached
    if (ops >= batchLimit) {
      console.log(`Committing batch of ${ops} problems...`);
      await batch.commit();
      batch = db.batch();
      ops = 0;
    }
  }

  // Commit remaining
  if (ops > 0) {
    console.log(`Committing final batch of ${ops} problems...`);
    await batch.commit();
  }

  console.log(`\nSuccessfully migrated ${count} problems.`);
}

// 4. Entry Point
(async () => {
  try {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
      console.error('Usage: node migrate-many-problems.mjs <problems.json|problems.js>');
      process.exit(1);
    }
    await migrate(args[0]);
    process.exit(0);
  } catch (err) {
    console.error('Migration Failed:', err);
    process.exit(1);
  }
})();