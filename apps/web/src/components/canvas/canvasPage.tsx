"use client";
import { useState } from 'react';
import { Menu, Share, BookOpen } from 'lucide-react';
import Sidebar from './sidebar';
import Toolbar from './toolbar';
import Canvas from './canvas';
import ZoomControls from './zoomControls';

export default function CanvasPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full text-white overflow-hidden relative" style={{ backgroundColor: '#111111' }}>
      {/* Main Canvas - Full Page */}
      <Canvas onCanvasClick={() => setSidebarOpen(false)} />
      
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg hover:bg-gray-700 transition-colors"
        style={{ backgroundColor: '#232329' }}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Top Right Actions */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors text-white" style={{ backgroundColor: '#403e6a' }}>
          Share
        </button>
        <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 hover:bg-gray-700" style={{ backgroundColor: '#232329' }}>
          <BookOpen size={16} />
          Library
        </button>
      </div>

      {/* Floating Toolbar */}
      <Toolbar />

      {/* Zoom Controls */}
      <ZoomControls />

      {/* Scroll Back Button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <button className="px-4 py-2 rounded-lg text-sm transition-colors hover:bg-gray-700" style={{ backgroundColor: '#232329' }}>
          Scroll back to content
        </button>
      </div>

      {/* Help Icon - Bottom Right */}
      <div className="fixed bottom-4 right-4 flex items-center gap-2 z-40">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: '#403e6a' }}>
          ?
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#232329' }}>
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}