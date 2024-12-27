'use client';

import { useState, useRef, useEffect } from 'react';
import { captureAndDownloadImage } from '@/lib/imageUtils';
import SaveButton from './SaveButton';
import SizeSlider from './SizeSlider';
import ImageContainer from './ImageContainer';

interface ProfileImageProps {
  imageUrl: string;
}

export default function ProfileImage({ imageUrl }: ProfileImageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(150);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - startPos.x;
    const newY = e.clientY - startPos.y;

    const bounds = 150;
    setPosition({
      x: Math.max(-bounds, Math.min(bounds, newX)),
      y: Math.max(-bounds, Math.min(bounds, newY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = async () => {
    if (containerRef.current && imageRef.current) {
      await captureAndDownloadImage(imageRef.current, containerRef.current);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    setPosition({ x: 0, y: 0 });
    setSize(150);
  }, [imageUrl]);

  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-[300px] h-[300px]">
          <ImageContainer
            containerRef={containerRef}
            imageRef={imageRef}
            imageUrl={imageUrl}
            position={position}
            size={size}
            isDragging={isDragging}
            onMouseDown={handleMouseDown}
          />
        </div>
        <SaveButton onClick={handleSave} />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <label className="text-sm font-medium text-gray-700">Image Size</label>
        <SizeSlider size={size} onChange={setSize} />
      </div>
    </div>
  );
}