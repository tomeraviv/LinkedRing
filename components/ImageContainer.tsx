'use client';

interface ImageContainerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  imageRef: React.RefObject<HTMLImageElement>;
  imageUrl: string;
  position: { x: number; y: number };
  size: number;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}

export default function ImageContainer({
  containerRef,
  imageRef,
  imageUrl,
  position,
  size,
  isDragging,
  onMouseDown,
}: ImageContainerProps) {
  return (
    <div 
      ref={containerRef}
      className="w-full h-full rounded-full overflow-hidden border-4 border-emerald-500 relative cursor-move shadow-xl bg-white"
      onMouseDown={onMouseDown}
    >
      <div
        className="absolute"
        style={{
          width: `${size}%`,
          height: `${size}%`,
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
        }}
      >
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Profile"
          className="w-full h-full object-cover"
          draggable="false"
        />
      </div>
    </div>
  );
}