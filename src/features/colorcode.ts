import { linksData } from "../data/linksdata";

function generateSingleColor() {
  const randomRows = linksData.rows
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  const colors: number[] = [];
  const ports: string[] = [];
  
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
  
  while (colors.length < 3) {
    colors.push(Math.floor(Math.random() * 256));
  }
  
  const color = `#${colors[0].toString(16).padStart(2, '0')}${colors[1].toString(16).padStart(2, '0')}${colors[2].toString(16).padStart(2, '0')}`;
  return { color, ports, values: colors };
}

export function generateColorCode(): { color: string; gradient1: string; gradient2: string; ports: string[]; values: number[] } {
  const first = generateSingleColor();
  const second = generateSingleColor();
  
  const gradient1 = `linear-gradient(135deg, ${first.color}, ${second.color})`;
  const gradient2 = `linear-gradient(45deg, ${second.color}, ${first.color})`;
  
  return {
    color: first.color,
    gradient1,
    gradient2,
    ports: [...first.ports, ...second.ports],
    values: [...first.values, ...second.values]
  };
}