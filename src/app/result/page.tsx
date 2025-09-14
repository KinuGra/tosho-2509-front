"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { generateColorCode } from "../../features/colorcode";

export default function ResultPage() {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [colorData, setColorData] = useState(generateColorCode());
  const [showSource, setShowSource] = useState(false);

  useEffect(() => {
    const history = sessionStorage.getItem('commandHistory');
    if (history) {
      setCommandHistory(JSON.parse(history));
    }
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: colorData.color }}>
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">お疲れ様でした！</h1>
          <p className="text-gray-600">お題をクリアしました</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">獲得報酬</h2>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">経験値</span>
              <span className="text-green-600 font-bold">+100 EXP</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">実行コマンド数</h2>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">コマンド</span>
              <span className="text-blue-600 font-bold">{commandHistory.length}個</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-gray-600 font-mono text-sm">背景色: {colorData.color}</span>
              <div className="text-xs text-gray-500 mt-1">
                {colorData.ports.map((port, index) => (
                  <div key={index}>{port}</div>
                ))}
              </div>
            </div>
            <button 
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              onClick={() => setColorData(generateColorCode())}
            >
              背景色変更
            </button>
          </div>
        </div>

        {commandHistory.length > 0 && (
          <div className="bg-black text-green-400 font-mono p-4 rounded-lg mb-6 max-h-40 overflow-y-auto">
            <h3 className="text-white mb-2">実行したコマンツ履歴:</h3>
            {commandHistory.map((cmd, index) => (
              <div key={index} className="mb-1">
                <span className="text-gray-400">{index + 1}.</span> {cmd}
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3">
          <Link 
            href="/home" 
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition-colors text-center"
          >
            ホームに戻る
          </Link>
          <Link 
            href="/simulation" 
            className="block w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition-colors text-center"
          >
            もう一度挑戦
          </Link>
        </div>
      </div>
    </div>
  );
}