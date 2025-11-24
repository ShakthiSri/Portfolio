'use client';

import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-[80vh] bg-[#0a0a0a] py-20 pb-0 relative overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), #0a0a0a`,
      }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-purple-950/20 to-[#0a0a0a]"></div>
      
      {/* Background animated elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8b5cf6]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-1000 relative ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            LET'S WORK
          </h2>
          <p
            className="text-[#8b5cf6] text-6xl md:text-6xl absolute top-3/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-6"
            style={{ 
              fontFamily: "'Caveat', cursive",
              fontWeight: "600"
            }}
          >
            Together!
          </p>
        </div>

        {/* Contact Content */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Horizontal line */}
          <div className="border-t border-gray-700 mb-12"></div>

          {/* Contact details and circular button */}
          <div className="flex items-start justify-between gap-16">
            {/* Left: Social Media Links - 2 Column Grid */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-6 flex-1">
              {/* Email/Gmail */}
              <a
                href="mailto:shakthisripackianathan@gmail.com"
                className="flex items-center gap-4 text-gray-300 hover:text-[#8b5cf6] transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-full border-2 border-gray-100 group-hover:border-[#8b5cf6] flex items-center justify-center group-hover:bg-[#8b5cf6]/10 transition-all duration-300 flex-shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-100 uppercase tracking-widest">Email</p>
                  <p className="text-sm font-light truncate">shakthisripackianathan@gmail.com</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+919787758158"
                className="flex items-center gap-4 text-gray-300 hover:text-[#8b5cf6] transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-full border-2 border-gray-100 group-hover:border-[#8b5cf6] flex items-center justify-center group-hover:bg-[#8b5cf6]/10 transition-all duration-300 flex-shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-100 uppercase tracking-widest">Phone</p>
                  <p className="text-sm font-light">+91 83005 02283</p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/shakthisri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-100 hover:text-[#8b5cf6] transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-full border-2 border-gray-100 group-hover:border-[#8b5cf6] flex items-center justify-center group-hover:bg-[#8b5cf6]/10 transition-all duration-300 flex-shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-100 uppercase tracking-widest">GitHub</p>
                  <p className="text-sm font-light truncate">github.com/shakthisri</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/shakthisri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-100 hover:text-[#8b5cf6] transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-full border-2 border-gray-100 group-hover:border-[#8b5cf6] flex items-center justify-center group-hover:bg-[#8b5cf6]/10 transition-all duration-300 flex-shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-100 uppercase tracking-widest">LinkedIn</p>
                  <p className="text-sm font-light truncate">https://www.linkedin.com/in/shakthi-sri-p/</p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/shakthisri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-100 hover:text-[#8b5cf6] transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-full border-2 border-gray-100 group-hover:border-[#8b5cf6] flex items-center justify-center group-hover:bg-[#8b5cf6]/10 transition-all duration-300 flex-shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-100 uppercase tracking-widest">Instagram</p>
                  <p className="text-sm font-light">@shakthisri</p>
                </div>
              </a>
            </div>

            {/* Right: Circular Get in touch button */}
            <div className="flex-shrink-0">
              <button
                onClick={() => window.open('https://www.linkedin.com/in/shakthi-sri-p/', '_blank')}
                className="group relative w-40 h-40 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-[#8b5cf6] via-[#9333ea] to-[#a855f7] hover:scale-105 transition-all duration-700 flex items-center justify-center shadow-[0_20px_60px_rgba(139,92,246,0.4)] hover:shadow-[0_25px_80px_rgba(139,92,246,0.6)] cursor-pointer"
              >
                {/* Inner circle with text */}
                <div className="absolute inset-2 rounded-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                  {/* Animated circular text */}
                  <svg className="w-full h-full absolute animate-spin-very-slow" viewBox="0 0 140 140">
                    <defs>
                      <path
                        id="circlePath"
                        d="M 70, 70 m -55, 0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0"
                        fill="none"
                      />
                    </defs>
                    <text className="text-[10px] fill-gray-200 font-light tracking-[0.3em] uppercase">
                      <textPath href="#circlePath" startOffset="0%" textAnchor="start">
                        Get in touch • Get in touch • Get in touch • Get in touch •
                      </textPath>
                    </text>
                  </svg>

                  {/* Center arrow */}
                  <svg className="w-8 h-8 text-white group-hover:rotate-45 group-hover:scale-110 transition-all duration-500 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer integrated */}
        <div className="border-t border-gray-700 mt-20 pt-8 pb-8">
          <div className="grid grid-cols-3 items-center gap-8">
            {/* Left: Copyright */}
            <div className="justify-self-start">
              <p className="text-gray-100 text-sm font-light">
                © 2025 Shakthi Sri
              </p>
              <p className="text-gray-100 text-xs mt-15">
                All rights reserved
              </p>
            </div>

            {/* Center: Logo */}
            <div className="flex items-center justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-[#8b5cf6] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <img
                  src="/profile.png"
                  alt="Logo"
                  className="w-25 h-10 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Right: Back to top */}
            <div className="flex justify-end">
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-3 text-gray-200 hover:text-[#8b5cf6] transition-all duration-300 text-sm"
              >
                <span className="font-bold">Back to top</span>
                <div className="w-10 h-10 rounded-full border border-gray-200 group-hover:border-[#8b5cf6] flex items-center justify-center group-hover:bg-[#8b5cf6]/10 transition-all duration-300">
                  <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spin-very-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-spin-very-slow {
          animation: spin-very-slow 20s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
