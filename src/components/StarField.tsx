
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
    
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stars: { x: number; y: number; radius: number; alpha: number; speed: number; phase: number }[] = [];
    const shootingStars: { x: number; y: number; length: number; speed: number; opacity: number; hue: number }[] = [];
    let animationFrame = 0;
    
    // Initialize stars
    for (let i = 0; i < 260; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.7 + 0.15,
        alpha: Math.random() * 0.75 + 0.2,
        speed: reducedMotion ? 0 : Math.random() * 0.08 + 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }
    
    // Create shooting star
    const createShootingStar = () => {
      if (!reducedMotion && shootingStars.length < 5 && Math.random() < 0.025) {
        shootingStars.push({
          x: Math.random() * canvas.width * 0.9,
          y: -40 - Math.random() * 160,
          length: Math.random() * 150 + 90,
          speed: Math.random() * 13 + 12,
          opacity: 0.95,
          hue: Math.random() > 0.5 ? 190 : 265,
        });
      }
    };
    
    // Animation loop
    let frame = 0;
    const animate = () => {
      frame += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        const twinkle = reducedMotion ? star.alpha : star.alpha * (0.7 + Math.sin(frame * 0.025 + star.phase) * 0.3);
        ctx.fillStyle = `rgba(220, 244, 255, ${Math.max(0.12, twinkle)})`;
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
        
        const gradient = ctx.createLinearGradient(star.x, star.y, star.x - star.length, star.y - star.length * 0.55);
        gradient.addColorStop(0, `hsla(${star.hue}, 100%, 96%, ${star.opacity})`);
        gradient.addColorStop(0.18, `hsla(${star.hue}, 100%, 70%, ${star.opacity * 0.9})`);
        gradient.addColorStop(1, `hsla(${star.hue}, 100%, 60%, 0)`);
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.length, star.y - star.length * 0.55);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = `hsl(${star.hue}, 100%, 70%)`;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Update shooting star
        star.x += star.speed;
        star.y += star.speed * 0.55;
        star.opacity -= 0.014;
        
        // Remove faded stars
        if (star.opacity <= 0) {
          shootingStars.splice(i, 1);
          i--;
        }
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrame);
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
