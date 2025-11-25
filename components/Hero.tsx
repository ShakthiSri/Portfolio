'use client';

import { ArrowDown, Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    setShowPdfPreview(true);
  };

  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = '/310622205140_Shakthi_Sri.pdf';
    link.download = '310622205140_Shakthi_Sri.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closePdfPreview = () => {
    setShowPdfPreview(false);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0a] pt-20"
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

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-48 h-48 border-2 border-white/10 rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 border-2 border-white/10 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        <div
          className={`space-y-4 sm:space-y-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-white font-bold leading-tight">
            <span className="block text-4xl sm:text-5xl md:text-7xl">HI, I'M SHAKTHI</span>
            <span className="block text-4xl sm:text-5xl md:text-7xl">SRI</span>
          </h1>
          <p
            className="text-[#8b5cf6] text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ 
              fontFamily: "'Caveat', cursive",
              fontWeight: "600"
            }}
          >
            a Software Developer
          </p>

          <div className="flex gap-0 pt-4 sm:pt-6">
            <div>
              <div className="text-white text-base sm:text-lg">Easwari Engineering College Final Year Student</div>
            </div>
          </div>

          {/* Download CV Button */}
          <div className="pt-2 sm:pt-4">
            <button 
              onClick={handleDownloadCV}
              className="group bg-black/30 backdrop-blur-sm hover:bg-black/40 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 border border-[#8b5cf6]/30 hover:border-[#8b5cf6] transform hover:scale-105 hover:shadow-2xl hover:shadow-[#8b5cf6]/20 flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden glow-border-button text-white w-full sm:w-auto"
            >
              <Download size={18} className="relative z-10 group-hover:animate-bounce sm:w-5 sm:h-5" />
              <span className="relative z-10 text-sm sm:text-base">Download CV</span>
            </button>
          </div>
        </div>

        <div
          className={`relative transition-all duration-1000 delay-300 order-first lg:order-last ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <div className="relative max-w-md mx-auto lg:max-w-lg">
            {/* Main photo frame */}
            <div className="w-full aspect-square rounded-3xl overflow-hidden border-4 border-gray-700 shadow-2xl transform rotate-0">
              <img
                src="\photo.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Good Vibes Badge */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 z-10 transform -rotate-12 animate-pulse-slow">
              <img
                src="/badge.png"
                alt="Good Vibes"
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-6 right-6 sm:bottom-12 sm:right-12 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg animate-bounce"
      >
        <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* PDF Preview Modal */}
      {showPdfPreview && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="relative w-full h-full max-w-6xl flex flex-col">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-2 sm:mb-4 bg-black/50 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 rounded-t-2xl border border-[#8b5cf6]/30">
              <button
                onClick={downloadPdf}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#8b5cf6]/50 text-sm sm:text-base"
              >
                <Download size={16} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline font-semibold">Download Resume</span>
                <span className="sm:hidden font-semibold">Download</span>
              </button>

              <button
                onClick={closePdfPreview}
                className="p-2 sm:p-3 bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-white rounded-lg transition-all duration-300 border border-red-500/30 hover:border-red-500"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 bg-black/30 rounded-b-2xl border border-[#8b5cf6]/30 overflow-hidden shadow-2xl shadow-[#8b5cf6]/20">
              <iframe
                src="/310622205140_Shakthi_Sri.pdf"
                className="w-full h-full"
                title="Resume Preview"
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            transform: rotate(-12deg) scale(1);
          }
          50% {
            transform: rotate(-10deg) scale(1.05);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .glow-border-button {
          position: relative;
        }

        .glow-border-button::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 2px;
          background: linear-gradient(45deg, transparent, #8b5cf6, transparent, #a855f7, transparent);
          background-size: 200% 200%;
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask-composite: xor;
          opacity: 1;
          z-index: 0;
          transition: opacity 0.3s ease;
          animation: glow-border-rotate 2s linear infinite;
        }

        .glow-border-button:hover::before {
          opacity: 1;
          animation: glow-border-rotate 1.5s linear infinite;
        }

        .glow-border-button::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent, rgba(139, 92, 246, 0.2), transparent);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }

        .glow-border-button:hover::after {
          opacity: 1;
        }

        @keyframes glow-border-rotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}
