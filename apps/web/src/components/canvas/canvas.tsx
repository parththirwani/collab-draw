"use client";

import { initDraw } from "app/Canvas-logic/Canvas";
import { useRef, useEffect, useState } from "react";

interface CanvasProps {
  onCanvasClick: () => void;
}

export default function Canvas({ onCanvasClick }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    initDraw(canvasRef.current)

  }, []);


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
