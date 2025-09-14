"use client"

import React, { useState } from "react";
import { generateColorCode } from "../../../features/colorcode";

export default function ColorCodeTest() {
  const [colorCode, setColorCode] = useState(generateColorCode());

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">カラーコードテスト</h1>
      <div 
        className="w-32 h-32 border-2 border-gray-300 mb-4"
        style={{ backgroundColor: colorCode }}
      ></div>
      <p className="text-lg mb-4">カラーコード: {colorCode}</p>
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setColorCode(generateColorCode())}
      >
        新しいカラーを生成
      </button>
    </div>
  );
}