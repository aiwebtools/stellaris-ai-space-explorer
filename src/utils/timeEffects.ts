
export const createTimePortalEffect = (destinationUrl: string, customMessage?: string) => {
  // Create overlay container
  const overlay = document.createElement('div');
  overlay.className = 'time-portal-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent 20%, rgba(0,0,0,0.95) 100%);
    z-index: 9999;
    pointer-events: none;
  `;
  document.body.appendChild(overlay);

  // Apply enhanced time warp effect to body
  document.body.style.filter = 'blur(3px) hue-rotate(270deg) saturate(3) brightness(1.5)';
  document.body.style.transition = 'filter 0.4s ease-out';

  // Create multiple layers of vortex rings with rainbow colors
  const rainbowColors = [
    '#ff0080', '#ff4000', '#ff8000', '#ffff00', '#80ff00', 
    '#00ff80', '#00ffff', '#0080ff', '#4000ff', '#8000ff', 
    '#ff00ff', '#ff0040'
  ];

  for (let i = 0; i < 15; i++) {
    const ring = document.createElement('div');
    ring.className = 'vortex-ring';
    const color = rainbowColors[i % rainbowColors.length];
    ring.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: ${80 + i * 80}px;
      height: ${80 + i * 80}px;
      border: 4px solid ${color};
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: vortex-spin ${0.8 + i * 0.15}s linear infinite;
      opacity: ${1 - i * 0.05};
      box-shadow: 0 0 20px ${color}, inset 0 0 20px ${color};
      filter: brightness(2) saturate(3);
    `;
    overlay.appendChild(ring);
  }

  // Create enhanced energy waves with multiple colors
  for (let i = 0; i < 8; i++) {
    const wave = document.createElement('div');
    wave.className = 'energy-wave';
    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff4000', '#4000ff', '#00ff40', '#ff0080', '#8000ff'];
    const color = colors[i % colors.length];
    wave.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: ${150 + i * 120}px;
      height: ${150 + i * 120}px;
      border: 3px solid ${color};
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: energy-pulse ${1.5 + i * 0.2}s ease-out infinite;
      box-shadow: 0 0 30px ${color}, inset 0 0 30px ${color};
      filter: brightness(3) saturate(4);
    `;
    overlay.appendChild(wave);
  }

  // Create enhanced explosion particles with rainbow colors
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'explosion-particle';
    const angle = (i / 50) * Math.PI * 2;
    const distance = 80 + Math.random() * 300;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
    
    particle.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: ${8 + Math.random() * 8}px;
      height: ${8 + Math.random() * 8}px;
      background: ${color};
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: particle-explosion 2s ease-out forwards;
      --end-x: ${x}px;
      --end-y: ${y}px;
      box-shadow: 0 0 15px ${color};
      filter: brightness(3) saturate(3);
    `;
    overlay.appendChild(particle);
  }

  // Create enhanced lightning bolts with bright colors
  for (let i = 0; i < 20; i++) {
    const bolt = document.createElement('div');
    bolt.className = 'lightning-bolt';
    const angle = (i / 20) * 360;
    const colors = ['#ffffff', '#ffff00', '#00ffff', '#ff00ff', '#ff4000', '#4000ff'];
    const color = colors[i % colors.length];
    bolt.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 5px;
      height: ${180 + Math.random() * 100}px;
      background: linear-gradient(to bottom, ${color}, transparent);
      transform: translate(-50%, -50%) rotate(${angle}deg);
      animation: lightning-flash 0.2s ease-in-out infinite alternate;
      transform-origin: center bottom;
      box-shadow: 0 0 20px ${color};
      filter: brightness(4) saturate(4);
    `;
    overlay.appendChild(bolt);
  }

  // Create spiral energy streams
  for (let i = 0; i < 8; i++) {
    const spiral = document.createElement('div');
    spiral.className = 'spiral-stream';
    const color = rainbowColors[i % rainbowColors.length];
    spiral.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 400px;
      height: 6px;
      background: linear-gradient(to right, transparent, ${color}, transparent);
      transform: translate(-50%, -50%) rotate(${i * 45}deg);
      animation: spiral-rotate ${2 + i * 0.3}s linear infinite;
      transform-origin: center;
      box-shadow: 0 0 25px ${color};
      filter: brightness(3) saturate(3);
    `;
    overlay.appendChild(spiral);
  }

  // Create pulsing center core
  const core = document.createElement('div');
  core.className = 'portal-core';
  core.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, #ffffff, #ffff00, #ff00ff, #00ffff);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: core-pulse 0.5s ease-in-out infinite alternate;
    box-shadow: 0 0 50px #ffffff, 0 0 100px #ffff00, 0 0 150px #ff00ff;
    filter: brightness(5) saturate(5);
  `;
  overlay.appendChild(core);

  // Create enhanced flash effect with rainbow colors
  const flash = document.createElement('div');
  flash.className = 'flash-effect';
  flash.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, 
      rgba(255,255,255,0.9) 0%, 
      rgba(255,255,0,0.8) 20%,
      rgba(255,0,255,0.7) 40%,
      rgba(0,255,255,0.6) 60%,
      rgba(255,0,128,0.5) 80%,
      transparent 100%);
    animation: flash-fade 2.3s ease-out forwards;
    filter: brightness(3) saturate(4);
  `;
  overlay.appendChild(flash);

  // Generate enhanced portal sounds using Web Audio API
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Enhanced whoosh sound with more complexity
  const createWhooshSound = () => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    const reverb = audioContext.createConvolver();
    
    oscillator.connect(filter);
    filter.connect(reverb);
    reverb.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 1.5);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 1.5);
    
    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1.5);
  };

  // Enhanced portal sound with multiple frequencies
  const createPortalSound = () => {
    for (let i = 0; i < 3; i++) {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const modulator = audioContext.createOscillator();
      const modulatorGain = audioContext.createGain();
      
      modulator.connect(modulatorGain);
      modulatorGain.connect(oscillator.frequency);
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(80 + i * 40, audioContext.currentTime);
      
      modulator.type = 'sine';
      modulator.frequency.setValueAtTime(3 + i * 2, audioContext.currentTime);
      modulatorGain.gain.setValueAtTime(30 + i * 20, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
      
      oscillator.start();
      modulator.start();
      oscillator.stop(audioContext.currentTime + 2);
      modulator.stop(audioContext.currentTime + 2);
    }
  };

  // Enhanced activation messages
  const activationMessages = [
    "MASTER! THE ACTIVATION SEQUENCE HAS INITIATED!",
    "ACCESS GRANTED! INITIATING DIMENSIONAL TRANSFER!",
    "TEMPORAL GATEWAY OPENED! WELCOME TO THE FUTURE!",
    "QUANTUM TUNNEL ACTIVATED! PREPARE FOR TRANSPORT!",
    "STELLAR PORTAL ENGAGED! BEGINNING JOURNEY!",
    "INTERDIMENSIONAL BRIDGE ESTABLISHED! COMMENCING TRANSPORT!",
    "TIME WARP SEQUENCE INITIATED! REALITY SHIFTING IN PROGRESS!"
  ];

  const speakMessage = (message: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.7;
      utterance.pitch = 0.2;
      utterance.volume = 0.8;
      
      const voices = speechSynthesis.getVoices();
      const roboticVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('daniel') || 
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('alex')
      );
      
      if (roboticVoice) {
        utterance.voice = roboticVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  // Play enhanced sounds and speak message
  createWhooshSound();
  setTimeout(() => createPortalSound(), 200);
  
  const messageToSpeak = customMessage || activationMessages[Math.floor(Math.random() * activationMessages.length)];
  setTimeout(() => speakMessage(messageToSpeak), 400);

  // Cleanup and redirect after 2.3 seconds
  setTimeout(() => {
    // Enhanced final flash before opening
    const finalFlash = document.createElement('div');
    finalFlash.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, 
        rgba(255,255,255,1) 0%, 
        rgba(255,255,0,0.8) 30%,
        rgba(255,0,255,0.6) 60%,
        rgba(0,255,255,0.4) 100%);
      z-index: 10000;
      animation: final-flash 0.4s ease-out forwards;
      filter: brightness(4) saturate(4);
    `;
    document.body.appendChild(finalFlash);

    // Open new window and cleanup
    setTimeout(() => {
      window.open(destinationUrl, '_blank', 'noopener,noreferrer');
      document.body.removeChild(overlay);
      document.body.removeChild(finalFlash);
      document.body.style.filter = '';
      document.body.style.transition = '';
      
      // Speak completion message
      setTimeout(() => speakMessage("ACCESS GRANTED! WELCOME TO THE NEW DIMENSION!"), 200);
    }, 400);
  }, 2300);
};
