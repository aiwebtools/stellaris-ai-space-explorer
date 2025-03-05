
import React, { useEffect, useRef } from 'react';

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Handle window resize
    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();
    
    // Star properties
    const stars: { x: number; y: number; radius: number; color: string; speed: number }[] = [];
    const shootingStars: { x: number; y: number; length: number; speed: number; opacity: number }[] = [];
    
    // Initialize stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        color: `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`,
        speed: Math.random() * 0.05
      });
    }
    
    // Create shooting star
    const createShootingStar = () => {
      if (shootingStars.length < 3 && Math.random() < 0.01) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: 0,
          length: Math.random() * 80 + 20,
          speed: Math.random() * 10 + 10,
          opacity: 1
        });
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
        
        // Move stars slightly for subtle animation
        star.y += star.speed;
        
        // Reset stars that go off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      
      // Create and animate shooting stars
      createShootingStar();
      
      // Draw and update shooting stars
      for (let i = 0; i < shootingStars.length; i++) {
        const star = shootingStars[i];
        
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x + star.length, star.y + star.length);
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Update shooting star
        star.x += star.speed;
        star.y += star.speed;
        star.opacity -= 0.01;
        
        // Remove faded stars
        if (star.opacity <= 0) {
          shootingStars.splice(i, 1);
          i--;
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default StarField;
