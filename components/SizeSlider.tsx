'use client';

import { Sliders } from 'lucide-react';

interface SizeSliderProps {
  size: number;
  onChange: (value: number) => void;
}

export default function SizeSlider({ size, onChange }: SizeSliderProps) {
  return (
    <div className="flex items-center gap-4 w-full max-w-[200px]">
      <Sliders className="w-4 h-4 text-gray-500" />
      <input
        type="range"
        min="20"
        max="400"
        value={size}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
      />
      <span className="text-sm text-gray-600 min-w-[3ch]">{size}%</span>
    </div>
  );
}