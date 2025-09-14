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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: colorData.gradient1 }}>
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full" style={{ background: `linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.9)), ${colorData.gradient2}` }}>
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">お疲れ様でした！</h1>
          <p className="text-gray-600">お題をクリアしました</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">獲得報酬</h2>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">経験値</span>
            <span className="text-green-600 font-bold">+100 EXP</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-gray-600 font-mono text-sm">グラデーション: 6色使用</span>
              <div className="flex gap-2 mt-2">
                <div className="w-8 h-8 rounded" style={{ background: colorData.gradient1 }}></div>
                <div className="w-8 h-8 rounded" style={{ background: colorData.gradient2 }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {colorData.ports.slice(0, 3).map((port, index) => (
                  <div key={index}>{port}</div>
                ))}
              </div>
            </div>
            <button 
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              onClick={() => setColorData(generateColorCode())}
            >
              グラデーション変更
            </button>
          </div>
        </div>

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