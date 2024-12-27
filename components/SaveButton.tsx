'use client';

import { Save } from 'lucide-react';

interface SaveButtonProps {
  onClick: () => void;
}

export default function SaveButton({ onClick }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
    >
      <Save className="w-4 h-4" />
      <span>Save Image</span>
    </button>
  );
}