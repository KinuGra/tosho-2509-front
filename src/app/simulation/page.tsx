"use client"

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { terminalcommand } from "../components/simulation/terminlacommand/terminalcommand";

// 外部で定義される想定の関数
function terminal(command: string): string {
  // ここは仮の処理例。実際にはコマンド処理を実装
  if (command === "git status") {
    return "On branch main\nnothing to commit, working tree clean";
  }
  if (command === "git init") {
    return "Initialized empty Git repository";
  }
  if (command === "clear") {
    return "CLEAR";
  }
  return `Unknown command: ${command}`;
}

export default function Playground() {
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "Type Git Command!",
  ]);
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const cmd = input.trim();

      // terminal 関数を呼び出す
      const output = terminalcommand(cmd, terminalcommand, 1, 1);

      if (cmd.toLowerCase() === "clear" || output === "CLEAR") {
        setTerminalLines(["Type Git Command!"]);
      } else {
        setTerminalLines((prev) => [...prev, `> ${cmd}`, ...output.split("\n")]);
      }

      setInput("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 上部ステップバー部分 */}
      <div className="bg-green-200 flex flex-col justify-center items-stretch p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-black">○○を作ってみよう！</span>
          <span className="font-semibold text-black">ステップステップステップ</span>
        </div>
        <div className="w-full bg-white rounded-full h-4 overflow-hidden">
          <div className="bg-green-500 h-4 w-2/3 rounded-full"></div>
        </div>
      </div>

      {/* お題とステップ */}
      <div className="bg-white p-4 text-center">
        <h2 className="text-xl font-bold text-black mb-1">MONACO EDITOR</h2>
        <p className="text-black">ステップに従ってコードを書いてみよう！</p>
      </div>

      {/* Monaco Editor 部分 */}
      <div className="flex-1 p-4 bg-white">
        <Editor
          height="300px"
          defaultLanguage="typescript"
          defaultValue="// ここにコードを書いてみよう"
          theme="vs-dark"
        />
      </div>

      {/* ターミナル部分 */}
      <div className="bg-black text-green-400 font-mono p-4 h-64 overflow-y-auto">
        {terminalLines.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}

        {/* 入力欄 */}
        <div className="flex items-center">
          <span>&gt;</span>
          <input
            type="text"
            className="bg-black text-green-400 font-mono ml-2 flex-1 outline-none"
            placeholder="Enter Git command..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
