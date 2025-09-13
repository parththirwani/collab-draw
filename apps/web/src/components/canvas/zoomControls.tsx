"use client";

import { Minus, Plus, RotateCcw, Maximize } from 'lucide-react';

export default function ZoomControls() {
  return (
    <div className="fixed bottom-4 left-4 flex items-center gap-2">
      <div className="rounded-lg border border-gray-700 flex items-center" style={{ backgroundColor: '#232329' }}>
        <button className="p-2 hover:bg-gray-600 transition-colors">
          <Minus size={16} />
        </button>
        
        <div className="px-3 py-2 text-sm font-medium border-l border-r border-gray-700">
          156%
        </div>
        
        <button className="p-2 hover:bg-gray-600 transition-colors">
          <Plus size={16} />
        </button>
      </div>

      <button className="p-2 hover:bg-gray-600 rounded-lg border border-gray-700 transition-colors" style={{ backgroundColor: '#232329' }}>
        <RotateCcw size={16} />
      </button>
      
      <button className="p-2 hover:bg-gray-600 rounded-lg border border-gray-700 transition-colors" style={{ backgroundColor: '#232329' }}>
        <Maximize size={16} />
      </button>
    </div>
  );
}