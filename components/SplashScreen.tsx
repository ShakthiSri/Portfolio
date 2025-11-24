'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [preloadComplete, setPreloadComplete] = useState(false);

  useEffect(() => {
    // Start preloading resources immediately
    const preloadResources = async () => {
      try {
        // Preload critical images
        const imagePromises = [
          '/photo.jpg',
          '/profile.png',
          '/badge.png',
          '/Shakthi Logo.png'
        ].map(src => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          });
        });

        // Wait for all resources or timeout after 3 seconds
        await Promise.race([
          Promise.all(imagePromises),
          new Promise(resolve => setTimeout(resolve, 3000))
        ]);

        setPreloadComplete(true);
      } catch (error) {
        console.warn('Preloading failed:', error);
        setPreloadComplete(true);
      }
    };

    preloadResources();

    // Progress timer
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100 && preloadComplete) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1.5;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete, preloadComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 1 }}
    >
      {/* Background gradient matching portfolio page */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black"></div>
      
      {/* Background animated elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8b5cf6]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Large Logo */}
      <motion.div
        className="relative mb-0"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 1.2, 
          delay: 0.3,
          type: "spring",
          stiffness: 100 
        }}
      >
        {/* Glowing background for logo */}
        <motion.div
          className="absolute inset-0 blur-2xl opacity-40"
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-40 h-40 lg:w-56 lg:h-56 bg-[#8b5cf6] rounded-full"></div>
        </motion.div>
        
        {/* Main Logo */}
        <motion.div
          className="relative"
        >
          <motion.img
            src="/Shakthi Logo.png"
            alt="Shakthi Sri Logo"
            className="w-40 h-40 lg:w-56 lg:h-56 object-contain relative z-10"
            animate={{ 
              rotateY: [0, 360],
              scale: [0.8, 1, 1]
            }}
            transition={{
              rotateY: {
                duration: 1.5,
                delay: 0.5,
                ease: "easeOut"
              },
              scale: {
                duration: 1.2,
                delay: 0.3,
                ease: "easeOut"
              }
            }}
            style={{ transformStyle: 'preserve-3d' }}
            onError={(e) => {
              // Fallback to text if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <motion.div 
            className="absolute inset-0 flex items-center justify-center text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#8b5cf6] via-[#a855f7] to-[#7c3aed]" 
            style={{ display: 'none' }}
          >
            
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Loading bar */}
      <motion.div 
        className="w-64 mt-0"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#8b5cf6] via-[#a855f7] to-[#8b5cf6] rounded-full relative"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
            {/* Completion glow */}
            {preloadComplete && progress > 90 && (
              <div className="absolute inset-0 shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
            )}
          </motion.div>
        </div>
        
        {/* Progress percentage */}
        <motion.div
          className="text-[#8b5cf6] text-sm text-center mt-2 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {Math.round(progress)}%
        </motion.div>

        {/* Loading text with status */}
        <motion.div
          className="text-gray-100 text-xs tracking-[0.5em] uppercase mt-1 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        >
          {progress < 50 ? 'Loading' : progress < 90 ? 'Preparing' : 'Ready'}
        </motion.div>
      </motion.div>

      {/* Subtle background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#8b5cf6]/30 rounded-full"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
