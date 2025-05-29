
export const createTimePortalEffect = (destinationUrl: string) => {
  // Create overlay container
  const overlay = document.createElement('div');
  overlay.className = 'time-portal-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent 30%, rgba(0,0,0,0.8) 100%);
    z-index: 9999;
    pointer-events: none;
  `;
  document.body.appendChild(overlay);

  // Apply time warp effect to body
  document.body.style.filter = 'blur(2px) hue-rotate(180deg)';
  document.body.style.transition = 'filter 0.5s ease-out';

  // Create vortex rings
  for (let i = 0; i < 8; i++) {
    const ring = document.createElement('div');
    ring.className = 'vortex-ring';
    ring.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: ${100 + i * 100}px;
      height: ${100 + i * 100}px;
      border: 3px solid hsl(${i * 45}, 100%, 60%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: vortex-spin ${1 + i * 0.2}s linear infinite;
      opacity: ${1 - i * 0.1};
    `;
    overlay.appendChild(ring);
  }

  // Create energy waves
  for (let i = 0; i < 5; i++) {
    const wave = document.createElement('div');
    wave.className = 'energy-wave';
    wave.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: ${200 + i * 150}px;
      height: ${200 + i * 150}px;
      border: 2px solid rgba(0, 255, 255, 0.8);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: energy-pulse ${2 + i * 0.3}s ease-out infinite;
    `;
    overlay.appendChild(wave);
  }

  // Create explosion particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'explosion-particle';
    const angle = (i / 30) * Math.PI * 2;
    const distance = 50 + Math.random() * 200;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    particle.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 8px;
      background: hsl(${Math.random() * 360}, 100%, 60%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: particle-explosion 2s ease-out forwards;
      --end-x: ${x}px;
      --end-y: ${y}px;
    `;
    overlay.appendChild(particle);
  }

  // Create lightning bolts
  for (let i = 0; i < 12; i++) {
    const bolt = document.createElement('div');
    bolt.className = 'lightning-bolt';
    const angle = (i / 12) * 360;
    bolt.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 3px;
      height: 150px;
      background: linear-gradient(to bottom, #fff, #00ffff, transparent);
      transform: translate(-50%, -50%) rotate(${angle}deg);
      animation: lightning-flash 0.3s ease-in-out infinite alternate;
      transform-origin: center bottom;
    `;
    overlay.appendChild(bolt);
  }

  // Create flash effect
  const flash = document.createElement('div');
  flash.className = 'flash-effect';
  flash.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
    animation: flash-fade 2.3s ease-out forwards;
  `;
  overlay.appendChild(flash);

  // Generate portal sounds using Web Audio API
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Whoosh sound
  const createWhooshSound = () => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 1.5);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 1.5);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1.5);
  };

  // Portal sound
  const createPortalSound = () => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const modulator = audioContext.createOscillator();
    const modulatorGain = audioContext.createGain();
    
    modulator.connect(modulatorGain);
    modulatorGain.connect(oscillator.frequency);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
    
    modulator.type = 'sine';
    modulator.frequency.setValueAtTime(5, audioContext.currentTime);
    modulatorGain.gain.setValueAtTime(50, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
    
    oscillator.start();
    modulator.start();
    oscillator.stop(audioContext.currentTime + 2);
    modulator.stop(audioContext.currentTime + 2);
  };

  // Text-to-speech activation messages
  const activationMessages = [
    "MASTER! THE ACTIVATION SEQUENCE HAS INITIATED!",
    "ACCESS GRANTED! INITIATING DIMENSIONAL TRANSFER!",
    "TEMPORAL GATEWAY OPENED! WELCOME TO THE FUTURE!",
    "QUANTUM TUNNEL ACTIVATED! PREPARE FOR TRANSPORT!",
    "STELLAR PORTAL ENGAGED! BEGINNING JOURNEY!"
  ];

  const speakMessage = (message: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.8;
      utterance.pitch = 0.3;
      utterance.volume = 0.7;
      
      // Try to find a robotic-sounding voice
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

  // Play sounds and speak message
  createWhooshSound();
  setTimeout(() => createPortalSound(), 300);
  
  const randomMessage = activationMessages[Math.floor(Math.random() * activationMessages.length)];
  setTimeout(() => speakMessage(randomMessage), 500);

  // Cleanup and redirect after 2.3 seconds
  setTimeout(() => {
    // Final flash before opening
    const finalFlash = document.createElement('div');
    finalFlash.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      z-index: 10000;
      animation: flash-fade 0.3s ease-out forwards;
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
    }, 300);
  }, 2300);
};
