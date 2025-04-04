
import React, { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  delay: number;
}

interface SparkleAnimationProps {
  theme?: 'dark' | 'light';
}

const SparkleAnimation: React.FC<SparkleAnimationProps> = ({ theme = 'dark' }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const SPARKLE_COUNT = 40; // Increased count for more sparkles

  useEffect(() => {
    // Create initial sparkles
    const initialSparkles = Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // random x position as percentage
      y: Math.random() * 100, // random starting y position
      size: 1 + Math.random() * 3, // random size between 1-4px
      opacity: 0.3 + Math.random() * 0.7, // random opacity
      speed: 15 + Math.random() * 30, // random fall speed
      delay: Math.random() * 5, // random delay for animation
    }));
    
    setSparkles(initialSparkles);
    
    // Animation loop for moving sparkles
    const animationInterval = setInterval(() => {
      setSparkles(prevSparkles => 
        prevSparkles.map(sparkle => {
          // Calculate new y position based on speed
          let newY = ((sparkle.y + 0.1 * sparkle.speed / 60) % 100);
          
          // If sparkle has moved off screen, reset it at the top
          if (newY < 0) newY = 100;
          
          return {
            ...sparkle,
            y: newY,
            x: sparkle.x + (Math.sin(newY / 20) * 0.2), // add slight horizontal movement
          };
        })
      );
    }, 16); // ~60fps
    
    return () => {
      clearInterval(animationInterval);
    };
  }, []);
  
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            opacity: sparkle.opacity,
            backgroundColor: theme === 'dark' ? 'white' : '#d946ef', // White for dark mode, magenta for light mode
            boxShadow: theme === 'dark' 
              ? `0 0 ${sparkle.size * 2}px ${sparkle.size / 2}px rgba(255, 215, 0, 0.8)`
              : `0 0 ${sparkle.size * 2}px ${sparkle.size / 2}px rgba(217, 70, 239, 0.8)`,
            filter: 'blur(0.2px)',
            animationDelay: `${sparkle.delay}s`,
            animation: `pulse-light ${1 + Math.random() * 2}s infinite alternate`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default SparkleAnimation;
