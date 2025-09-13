'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CanvasPage from '@/components/canvas/mainPage';

export default function Canvas() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/'); 
    }
  }, []);

  return <CanvasPage />;
}
