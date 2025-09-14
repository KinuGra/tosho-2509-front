import { linksData } from "../data/linksdata";

export function generateColorCode(): string {
  const colors: number[] = [];
  
  linksData.rows.forEach(row => {
    const twoDigitValues = row
      .filter(value => typeof value === "string" && /^\d{2}\.\d+$/.test(value))
      .map(value => parseInt(value as string));
    
    if (twoDigitValues.length > 0) {
      const randomValue = twoDigitValues[Math.floor(Math.random() * twoDigitValues.length)];
      colors.push(randomValue);
    }
  });
  
  const r = colors[0] || 0;
  const g = colors[1] || 0;
  const b = colors[2] || 0;
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}