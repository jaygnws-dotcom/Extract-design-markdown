import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const InteractiveBackground = () => {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Smooth spring physics for fluid movement
  const springConfig = { damping: 25, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [trail, setTrail] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setTrail({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Primary Smooth Cursor Spotlight */}
      <motion.div
        style={{
          position: 'absolute',
          top: smoothY,
          left: smoothX,
          width: 650,
          height: 650,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.03) 45%, transparent 70%)',
        }}
      />

      {/* Secondary Crisp Trailing Ambient Ring */}
      <motion.div
        animate={{
          x: trail.x - 25,
          y: trail.y - 25,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 250,
          mass: 0.5,
        }}
        style={{
          position: 'absolute',
          width: 50,
          height: 50,
          borderRadius: '50%',
          border: '1.5px solid rgba(37, 99, 235, 0.25)',
          backgroundColor: 'rgba(37, 99, 235, 0.04)',
        }}
      />

      {/* Subtle Floating Interactive Ambient Bubbles */}
      <motion.div
        animate={{
          x: [0, 20, -15, 0],
          y: [0, -25, 10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.04) 0%, transparent 70%)',
        }}
      />

      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '55%',
          right: '12%',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.04) 0%, transparent 70%)',
        }}
      />
    </Box>
  );
};
