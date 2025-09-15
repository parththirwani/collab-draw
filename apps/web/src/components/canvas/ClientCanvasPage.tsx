'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CanvasPage from '@/components/canvas/canvasPage';

interface ClientCanvasPageProps {
  roomId: string;
}

export default function ClientCanvasPage({ roomId }: ClientCanvasPageProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, [router]);

  return <CanvasPage roomId={roomId} />;
}
