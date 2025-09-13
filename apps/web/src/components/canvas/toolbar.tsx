"use client";

import { Lock, Hand, MousePointer, Square, Diamond, Circle, ArrowUpRight, Minus, Pen, Type, Image, Eraser } from 'lucide-react';

export default function Toolbar() {
  const tools = [
    { icon: Lock, label: 'Lock', active: false },
    { icon: Hand, label: 'Hand', active: false },
    { icon: MousePointer, label: 'Selection', active: true },
    { icon: Square, label: 'Rectangle', active: false },
    { icon: Diamond, label: 'Diamond', active: false },
    { icon: Circle, label: 'Ellipse', active: false },
    { icon: ArrowUpRight, label: 'Arrow', active: false },
    { icon: Minus, label: 'Line', active: false },
    { icon: Pen, label: 'Draw', active: false },
    { icon: Type, label: 'Text', active: false },
    { icon: Image, label: 'Image', active: false },
    { icon: Eraser, label: 'Eraser', active: false },
  ];

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="rounded-lg border border-gray-700 shadow-lg p-2 flex items-center gap-1" style={{ backgroundColor: '#232329' }}>
        {tools.map((tool, index) => (
          <button
            key={index}
            className={`p-2 rounded-lg transition-colors relative group ${
              tool.active 
                ? 'text-white' 
                : 'hover:bg-gray-600 text-gray-300 hover:text-white'
            }`}
            style={tool.active ? { backgroundColor: '#403e6a' } : {}}
            title={tool.label}
          >
            <tool.icon size={18} />
          </button>
        ))}
      </div>
      
      {/* Instruction Text */}
      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">
          To move canvas, hold mouse wheel or spacebar while dragging, or use the hand tool
        </p>
      </div>
    </div>
  );
}