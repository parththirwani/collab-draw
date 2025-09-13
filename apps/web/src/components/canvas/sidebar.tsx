"use client";

import { X, FileText, Download, Share2, Palette, Search, HelpCircle, RotateCcw, Plus, Github, Twitter, MessageCircle, UserPlus, Sun, Moon, Monitor, ChevronDown } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { icon: FileText, label: 'Open', shortcut: 'Ctrl+O' },
    { icon: Download, label: 'Save to...', shortcut: '' },
    { icon: Share2, label: 'Export image...', shortcut: 'Ctrl+Shift+E' },
    { icon: Share2, label: 'Live collaboration...', shortcut: '' },
    { icon: Palette, label: 'Command palette', shortcut: 'Ctrl+/' },
    { icon: Search, label: 'Find on canvas', shortcut: 'Ctrl+F' },
    { icon: HelpCircle, label: 'Help', shortcut: '?' },
    { icon: RotateCcw, label: 'Reset the canvas', shortcut: '' },
  ];

  const externalLinks = [
    { icon: Plus, label: 'Excalidraw+' },
    { icon: Github, label: 'GitHub' },
    { icon: Twitter, label: 'Follow us' },
    { icon: MessageCircle, label: 'Discord chat' },
    { icon: UserPlus, label: 'Sign up' },
  ];

  const canvasColors = [
    'bg-white',
    'bg-gray-100',
    'bg-gray-800',
    'bg-green-100',
    'bg-red-100',
    'bg-black'
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-4 top-20 bottom-4 w-72 border-r border-gray-700 z-40 transform transition-transform duration-300 ease-in-out rounded-lg ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`} style={{ backgroundColor: '#232329' }}>
        <div className="p-6 h-full flex flex-col">
          {/* Menu Items */}
          <div className="space-y-1 flex-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-700 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <item.icon size={16} className="text-gray-400" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.shortcut && (
                  <span className="text-xs text-gray-500">{item.shortcut}</span>
                )}
              </button>
            ))}

            <div className="border-t border-gray-700 my-4" />

            {/* External Links */}
            {externalLinks.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 text-left transition-colors"
              >
                <item.icon size={16} className="text-gray-400" />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-auto space-y-4">
            {/* Theme Selector */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Theme</label>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <Sun size={16} className="text-gray-400" />
                </button>
                <button className="p-2 rounded-lg transition-colors" style={{ backgroundColor: '#403e6a' }}>
                  <Moon size={16} className="text-white" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <Monitor size={16} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Language Selector */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Language</label>
              <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 transition-colors">
                <span className="text-sm">English</span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>
            </div>

            {/* Canvas Background */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Canvas background</label>
              <div className="grid grid-cols-6 gap-2">
                {canvasColors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded border-2 ${
                      index === 0 ? 'border-gray-400' : 'border-gray-600'
                    } ${color} transition-colors ${
                      color === 'bg-white' ? 'border-gray-300' : ''
                    }`}
                    style={index === 0 ? { borderColor: '#403e6a' } : {}}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}