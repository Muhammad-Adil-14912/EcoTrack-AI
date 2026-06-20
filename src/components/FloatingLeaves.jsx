import React from 'react';
import { motion } from 'framer-motion';

const LeafIcon = ({ color, size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2A7 7 0 0 1 11 20Z" />
    <path d="M19 2c-2.26 4.33-5.27 7.14-8 9" />
  </svg>
);

export default function FloatingLeaves() {
  // Generate configuration for 12 leaves
  const leaves = Array.from({ length: 12 }).map((_, i) => {
    const size = Math.random() * 20 + 15; // 15px to 35px
    const startX = Math.random() * 100; // % of viewport width
    const duration = Math.random() * 25 + 20; // 20s to 45s
    const delay = Math.random() * -20; // negative delay to start immediately mid-air
    const colors = ['#2E7D32', '#4CAF50', '#A5D6A7', '#38BDF8'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return { id: i, size, startX, duration, delay, color };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute opacity-15"
          initial={{ 
            x: `${leaf.startX}vw`, 
            y: '-10vh', 
            rotate: 0,
            scale: 0.8
          }}
          animate={{
            y: '110vh',
            x: [
              `${leaf.startX}vw`, 
              `${leaf.startX + (Math.random() * 10 - 5)}vw`, 
              `${leaf.startX}vw`
            ],
            rotate: [0, 180, 360],
            scale: [0.8, 1.1, 0.9]
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            delay: leaf.delay,
            ease: 'linear'
          }}
        >
          <LeafIcon color={leaf.color} size={leaf.size} />
        </motion.div>
      ))}
    </div>
  );
}
