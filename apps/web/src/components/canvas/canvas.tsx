"use client";

interface CanvasProps {
  onCanvasClick: () => void;
}

export default function Canvas({ onCanvasClick }: CanvasProps) {
  return (
    <div 
      className="h-full w-full relative" 
      style={{ backgroundColor: '#111111' }}
      onClick={onCanvasClick}
    >
      {/* Canvas Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Main Drawing Area */}
      <div className="h-full w-full relative overflow-hidden">
        {/* This would be where the actual drawing canvas/SVG would go */}
        <div className="absolute inset-0 cursor-crosshair" />
      </div>
    </div>
  );
}