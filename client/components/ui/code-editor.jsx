import React, { useEffect, useState, useRef } from "react";

// ---------------------- THEME ----------------------
const highlightTheme = {
  string: "text-emerald-300",
  number: "text-pink-300",
  keyword: "text-cyan-300",
  comment: "text-neutral-500 italic",
};

const highlightKeywords = {
  Python: ["def", "print", "for", "in", "return", "class"],
  JavaScript: ["function", "console", "forEach", "return", "const", "let", "var", "class"],
  "C++": ["#include", "using", "namespace", "int", "return", "cout", "endl", "void", "string", "std", "main"],
  Bash: ["for", "do", "done", "echo"],
  Java: ["public", "static", "void", "main", "String", "System", "out", "println", "class"],
};

const defaultSnippets = [
  {
    lang: "Python",
    exe: "py",
    code: `# A simple print statement in Python
print("Hello, Akshat!")
print("Hello, Friend!")`,
  },
  {
    lang: "JavaScript",
    exe: "js",
    code: `// A simple log statement in JavaScript
console.log("Hello, Akshat!");
console.log("Hello, Friend!");`,
  },
  {
    lang: "Java",
    exe: "java",
    code: `// A simple print statement in Java
class Greeter {
  public static void main(String[] args) {
    System.out.println("Hello, Akshat!");
    System.out.println("Hello, Friend!");
  }
}`,
  },
];

// ---------------------- COMPONENT ----------------------
export default function FakeCodeEditor({
  snippets = null,
  typingSpeed = 30,
  pauseBetweenSnippets = 1000,
}) {
  const items = snippets ?? defaultSnippets;
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);
  const [forceRestart, setForceRestart] = useState(0);
  const typingRef = useRef({ i: 0, j: 0, lines: [] });
  const mounted = useRef(true);

  // Typing Logic
  function typeNextChar() {
    const { lines, i, j } = typingRef.current;
    if (i >= lines.length) return setIsPaused(true);
    if (j >= lines[i].length) {
      typingRef.current.i++;
      typingRef.current.j = 0;
      setTyped((p) => p + "\n");
      return;
    }
    const char = lines[i][j];
    typingRef.current.j++;
    setTyped((p) => p + char);
  }

  useEffect(() => {
    const txt = items[snippetIndex].code.replace(/\t/g, "    ");
    const lines = txt.split("\n");
    typingRef.current = { i: 0, j: 0, lines };
    setTyped("");
    setIsPaused(false);
  }, [snippetIndex, forceRestart]);

  useEffect(() => {
    if (isPaused) return;
    const t = setTimeout(typeNextChar, typingSpeed);
    return () => clearTimeout(t);
  }, [typed, isPaused]);

  useEffect(() => {
    if (!isPaused) return;
    const t = setTimeout(() => {
      setSnippetIndex((p) => (p + 1) % items.length);
    }, pauseBetweenSnippets);
    return () => clearTimeout(t);
  }, [isPaused]);

  useEffect(() => {
    const t = setInterval(() => setCursorOn((s) => !s), 530);
    return () => clearInterval(t);
  }, []);

  // Highlight + Tokenization
  function tokenize(line, lang) {
    const words = highlightKeywords[lang] || [];
    const tokens = [];
    const regex = new RegExp(
      `(//.*|#.*)|("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*')|\\b(${words.join("|")})\\b|\\b\\d+\\b`,
      "g"
    );

    let last = 0;
    let match;
    while ((match = regex.exec(line)) !== null) {
      if (match.index > last)
        tokens.push({ type: "plain", text: line.slice(last, match.index) });
      if (match[1]) tokens.push({ type: "comment", text: match[1] });
      else if (match[2]) tokens.push({ type: "string", text: match[2] });
      else if (match[3]) tokens.push({ type: "keyword", text: match[3] });
      else tokens.push({ type: "number", text: match[0] });
      last = regex.lastIndex;
    }
    if (last < line.length)
      tokens.push({ type: "plain", text: line.slice(last) });
    return tokens;
  }

  const displayLines = typed.split("\n");
  const totalLines = items[snippetIndex].code.split("\n").length;

  return (
    <div className="relative max-w-3xl mx-auto mt-16 ">
      <div className="rounded-xl border border-neutral-800 bg-[#0b1220]/90 shadow-2xl backdrop-blur-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-neutral-900/30 to-neutral-800/10 border-b border-neutral-700/50">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <div className="ml-3 text-sm text-neutral-300 font-medium">
              {items[snippetIndex].lang}.{items[snippetIndex].exe}
            </div>
          </div>
          <div className="text-xs hidden md:flex text-neutral-500">Read-only preview</div>
        </div>

        {/* Code Area */}
        <div className="flex font-mono text-sm text-neutral-100 overflow-hidden">
          {/* Line Numbers */}
          <div className="select-none bg-[#08101f] px-3 py-4 text-right text-xs text-neutral-500 border-r border-neutral-800">
            {Array.from({ length: totalLines }).map((_, idx) => (
              <div key={idx} className="h-5 leading-5">
                {idx + 1}
              </div>
            ))}
          </div>

          {/* Code */}
          <div className="flex-1 p-4 overflow-auto max-h-[400px] leading-5">
            {displayLines.map((line, i) => (
              <div key={i} className="whitespace-pre">
                {tokenize(line, items[snippetIndex].lang).map((t, k) => (
                  <span key={k} className={highlightTheme[t.type]}>
                    {t.text}
                  </span>
                ))}
                {i === displayLines.length - 1 && !isPaused && (
                  <span
                    className={`ml-0.5 inline-block w-0.5 h-4 bg-neutral-100 ${
                      cursorOn ? "" : "opacity-0"
                    } transition-opacity duration-100`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-800 text-xs text-neutral-400 bg-gradient-to-t from-black/10 to-transparent">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setForceRestart((c) => c + 1)}
              className="px-3 py-1 rounded bg-neutral-800/40 hover:bg-neutral-700/60 text-neutral-300 transition-all"
            >
              Restart
            </button>
            <button
              onClick={() => {
                const full = items[snippetIndex].code;
                setTyped(full);
                setIsPaused(true);
              }}
              className="px-3 py-1 rounded border border-neutral-700 bg-transparent hover:bg-neutral-800/60 text-neutral-300 transition-all"
            >
              Show Full
            </button>
          </div>
          <span>{items[snippetIndex].lang}</span>
        </div>
      </div>
    </div>
  );
}
