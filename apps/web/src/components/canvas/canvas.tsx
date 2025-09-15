"use client";

import { initDraw } from "app/Canvas-logic/Canvas";
import { useRef, useEffect } from "react";

interface CanvasProps {
  onCanvasClick: () => void;
  roomId: string;
}

export default function Canvas({ onCanvasClick, roomId }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    initDraw(canvasRef.current, roomId);
  }, [canvasRef]);

  return (
    <div
      className="h-full w-full absolute inset-0"
      style={{ backgroundColor: "#111111" }}
      onClick={onCanvasClick}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full absolute inset-0 cursor-crosshair"
      />
    </div>
  );
}
