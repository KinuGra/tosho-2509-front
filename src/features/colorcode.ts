import { linksData } from "../data/linksdata";

export function generateColorCode(): { color: string; ports: string[]; values: number[] } {
  const colors: number[] = [];
  const ports: string[] = [];
  
  const randomRows = linksData.rows
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  randomRows.forEach(row => {
    const twoDigitValues = row
      .filter(value => typeof value === "string" && /^\d{2}\.\d+$/.test(value))
      .map(value => parseInt(value as string));
    
    if (twoDigitValues.length > 0) {
      const randomValue = twoDigitValues[Math.floor(Math.random() * twoDigitValues.length)];
      colors.push(randomValue);
      ports.push(`${row[1]} → ${row[3]}`);
    }
  });
  
  const r = colors[0] || 0;
  const g = colors[1] || 0;
  const b = colors[2] || 0;
  
  const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  
  return { color, ports, values: colors };
}