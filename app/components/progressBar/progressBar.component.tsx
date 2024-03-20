'use client';
import { useState, useEffect } from 'react';

export const ProgressBar = ({ progress }: { progress: number }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(progress);
  }, [progress]);

  return (
    <div className='progress-bar'>
      <div className='progress' style={{ width: `${width}%` }} />
    </div>
  );
};
