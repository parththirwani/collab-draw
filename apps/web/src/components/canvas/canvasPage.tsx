"use client";

import { useState } from 'react';
import { Menu, BookOpen } from 'lucide-react';
import Sidebar from './sidebar';
import Toolbar from './toolbar';
import Canvas from './canvas';
import ZoomControls from './zoomControls';

interface CanvasPageProps {
  roomId: string;
}

export default function CanvasPage({ roomId }: CanvasPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full text-white overflow-hidden relative" style={{ backgroundColor: '#111111' }}>
      {/* Main Canvas */}
      <Canvas onCanvasClick={() => setSidebarOpen(false)} roomId={roomId} />

      {/* Hamburger Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg hover:bg-gray-700 transition-colors"
        style={{ backgroundColor: '#232329' }}
      >
        <Menu size={20} />
      </button>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors text-white" style={{ backgroundColor: '#403e6a' }}>
          Share
        </button>
        <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 hover:bg-gray-700" style={{ backgroundColor: '#232329' }}>
          <BookOpen size={16} />
          Library
        </button>
      </div>

      <Toolbar />
      <ZoomControls />
    </div>
  );
}
