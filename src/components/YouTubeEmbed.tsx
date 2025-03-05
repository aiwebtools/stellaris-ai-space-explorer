
import React, { useEffect, useRef } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  autoplay?: boolean;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, autoplay = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Calculate aspect ratio (16:9)
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = width * (9/16);
        containerRef.current.style.height = `${height}px`;
      }
    };
    
    // Call once and then on resize
    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  return (
    <div ref={containerRef} className="w-full relative overflow-hidden rounded-xl shadow-2xl">
      <div className="absolute inset-0 bg-space-purple/10 rounded-xl shadow-[0_0_30px_rgba(144,97,249,0.3)] animate-pulse-glow"></div>
      <iframe
        className="absolute inset-0 w-full h-full z-10"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=0&controls=1&rel=0&showinfo=0&modestbranding=1&vq=hd1080`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
