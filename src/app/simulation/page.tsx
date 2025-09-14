"use client"

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Editor from "@monaco-editor/react";
import { terminalcommand } from "../../features/terminalcommand";
import { exampleTopic, Topic, Step, getTopicById } from "../components/simulation/topix/topix";

export default function Playground() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState<Topic>(exampleTopic);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [terminalLines, setTerminalLines] = useState<string[]>(["Type Git Command!"]);
  const [input, setInput] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [editorValue, setEditorValue] = useState("");
  const [initialEditorValue, setInitialEditorValue] = useState("");

  const currentStep = topic.steps[currentStepIndex];
  const progress = (currentStepIndex / topic.steps.length) * 100;

  const handleStepComplete = () => {
    if (currentStepIndex < topic.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setCommandHistory([]);
    } else {
      setIsCompleted(true);
      router.push('/result');
    }
  };

  useEffect(() => {
    const topicId = searchParams.get('topicId');
    if (topicId) {
      const selectedTopic = getTopicById(parseInt(topicId));
      if (selectedTopic) {
        setTopic(selectedTopic);
        setCurrentStepIndex(0);
        setCommandHistory([]);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    setCommandHistory([]);
    setEditorValue(currentStep.outcode);
    setInitialEditorValue(currentStep.outcode);
  }, [currentStepIndex, currentStep.outcode]);



  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input.trim();
      const newHistory = [...commandHistory, cmd];
      setCommandHistory(newHistory);
      sessionStorage.setItem('commandHistory', JSON.stringify(newHistory));

      const output = terminalcommand(
        cmd, 
        newHistory, 
        currentStep.wantcode, 
        () => {
          console.log('Step completed!', { cmd, wantcode: currentStep.wantcode, history: newHistory });
          setTerminalLines((prev) => [...prev, "\n✓ ステップ完了! 次のステップに進みます..."]);
          setTimeout(handleStepComplete, 1500);
        },
        currentStep.responses
      );


      if (cmd.toLowerCase() === "clear" || output === "CLEAR") {
        setTerminalLines(["Type Git Command!"]);
      } else if (cmd === "") {
        // 空白コマンドの場合は何も表示しない
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
          <span className="text-sm text-black">{topic.title}</span>
          <span className="font-semibold text-black">{currentStep.title}</span>
        </div>
        <div className="w-full bg-white rounded-full h-4 overflow-hidden">
          <div 
            className="bg-green-500 h-4 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* お題とステップ */}
      <div className="bg-white p-4 text-center">
        <h2 className="text-xl font-bold text-black mb-1">{currentStep.title}</h2>
        <p className="text-black">{currentStep.description}</p>
      </div>

      {/* Monaco Editor 部分 */}
      <div className="flex-1 p-4 bg-white">
        <Editor
          height="300px"
          defaultLanguage="typescript"
          value={editorValue}
          onChange={(value: string | undefined) => setEditorValue(value || "")}
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
