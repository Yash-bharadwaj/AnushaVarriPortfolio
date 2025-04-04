import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StarsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const Star = styled.div<{ size: number; left: number; top: number; delay: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: white;
  border-radius: 50%;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  animation: twinkle ${props => props.delay}s infinite;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);

  @keyframes twinkle {
    0%, 100% {
      opacity: 0.2;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const Stars: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stars = Array.from({ length: 100 }).map((_, index) => ({
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3 + 2,
  }));

  return (
    <StarsContainer ref={containerRef}>
      {stars.map((star, index) => (
        <Star
          key={index}
          size={star.size}
          left={star.left}
          top={star.top}
          delay={star.delay}
        />
      ))}
    </StarsContainer>
  );
};

export default Stars; 