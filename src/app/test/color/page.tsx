"use client"

import React, { useState } from "react";
import { generateColorCode } from "../../../features/colorcode";

export default function ColorCodeTest() {
  const [colorData, setColorData] = useState(generateColorCode());

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">カラーコードテスト</h1>
      <div 
        className="w-32 h-32 border-2 border-gray-300 mb-4"
        style={{ backgroundColor: colorData.color }}
      ></div>
      <p className="text-lg mb-4">カラーコード: {colorData.color}</p>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">使用された港:</h2>
        {colorData.ports.map((port, index) => (
          <p key={index} className="text-sm text-gray-600">{port}</p>
        ))}
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">使用された値:</h2>
        {colorData.values && colorData.values.map((value, index) => (
          <p key={index} className="text-sm text-gray-600">
            {['R', 'G', 'B'][index]}: {value}
          </p>
        ))}
      </div>
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setColorData(generateColorCode())}
      >
        新しいカラーを生成
      </button>
    </div>
  );
}