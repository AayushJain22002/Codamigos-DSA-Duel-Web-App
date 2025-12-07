import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseAdmin.js';

const LANGUAGE_ID_TO_KEY = {
  63: 'javascript', // Node.js
  71: 'python',     // Python 3
  62: 'java',       // Java
  54: 'cpp',        // C++
  50: 'c',          // C
};

const GLOBAL_IMPORTS = {
  javascript: `
/* ===== GLOBAL IMPORTS (JS Node) ===== */
const fs = require('fs');
`,
  python: `
# ===== GLOBAL IMPORTS (Python) =====
import sys, json, traceback
from typing import List, Dict, Optional, Set, Deque, Tuple 
`,
  java: `
// ===== GLOBAL IMPORTS (Java) =====
import java.io.*;
import java.util.*;
import java.lang.reflect.*;
`,
  cpp: `
/* ===== GLOBAL IMPORTS (C++) ===== */
#include <bits/stdc++.h>
using namespace std;
`,
  c: `
/* ===== GLOBAL IMPORTS (C) ===== */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
`,
};

// ---------------------------------------------------
// APPLY TEMPLATE (Imports + USER_CODE + DRIVER)
// ---------------------------------------------------
export const applyWrapperTemplate = (wrapperTemplate, userCode, functionName, langKey) => {

  const imports = GLOBAL_IMPORTS[langKey] ?? "";
  if (typeof userCode !== 'string') {
    console.error("❌ Error: userCode is missing or not a string. Received:", userCode);
    throw new Error("Internal Error: User code was not received by the server.");
  }
  let finalCode =
    `${imports}

${userCode}

${wrapperTemplate}
`;

  if (functionName) {
    finalCode = finalCode.replace(/{{FUNCTION_NAME}}/g, functionName);
  }

  return finalCode;
};

export const getWrappedSourceForSubmission = async ({
  problemId,
  languageId,
  userCode,
}) => {
  const langKey = LANGUAGE_ID_TO_KEY[languageId];
  if (!langKey) throw new Error(`Unsupported languageId: ${languageId}`);

  const problemRef = doc(db, 'problems', problemId);
  const snap = await getDoc(problemRef);
  if (!snap.exists()) throw new Error(`Problem "${problemId}" not found`);

  const problem = snap.data();
  const langConfig = problem.languages?.[langKey];

  if (!langConfig) {
    throw new Error(`Language "${langKey}" not configured for "${problemId}"`);
  }

  const wrapperTemplate = langConfig.wrapperTemplate;
  const functionName = problem.functionName || langConfig.functionName || undefined;

  const source = applyWrapperTemplate(wrapperTemplate, userCode, functionName, langKey);

  return {
    source,
    languageId: langConfig.judge0LanguageId ?? languageId,
  };
};

// Manual fallback builder
export const getWrapper = (languageId, userCode, functionName, wrapperTemplate) => {
  const langKey = LANGUAGE_ID_TO_KEY[languageId];
  return applyWrapperTemplate(wrapperTemplate, userCode, functionName, langKey);
};
