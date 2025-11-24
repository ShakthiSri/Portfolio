'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section
      const currentPosition = window.scrollY + 100;

      let newActiveSection = 'home';

      // Check if we're near the top (home section)
      if (currentPosition < 200) {
        newActiveSection = 'home';
      } else {
        // Check other sections
        const sections = ['about', 'projects', 'contact'];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop } = element;
            if (currentPosition >= offsetTop - 100) {
              newActiveSection = section;
            }
          }
        }
      }

      setActiveSection(newActiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      // Scroll to top for home section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = () => {
    setShowProfileModal(true);
    setIsModalClosing(false);
  };

  const closeModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setShowProfileModal(false);
      setIsModalClosing(false);
    }, 500);
  };

  return (
    <>
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center justify-center bg-black/30 backdrop-blur-xl px-8 py-4 rounded-2xl border border-[#8b5cf6]/30 shadow-2xl shadow-[#8b5cf6]/20 min-w-[600px] gap-12">
          {/* Left Navigation */}
          <button
            onClick={() => scrollToSection('home')}
            className={`transition-all duration-300 relative group px-3 py-2 text-sm ${
              activeSection === 'home'
                ? 'text-[#8b5cf6] drop-shadow-[0_0_8px_rgba(139,92,246,1)]'
                : 'text-gray-300 hover:text-[#8b5cf6] hover:drop-shadow-[0_0_6px_rgba(139,92,246,0.6)]'
            }`}
          >
            Home
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] transition-all duration-300 ${
                activeSection === 'home'
                  ? 'w-full shadow-[0_0_8px_rgba(139,92,246,0.8)]'
                  : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </button>

          <button
            onClick={() => scrollToSection('about')}
            className={`transition-all duration-300 relative group px-3 py-2 text-sm ${
              activeSection === 'about'
                ? 'text-[#8b5cf6] drop-shadow-[0_0_8px_rgba(139,92,246,1)]'
                : 'text-gray-300 hover:text-[#8b5cf6] hover:drop-shadow-[0_0_6px_rgba(139,92,246,0.6)]'
            }`}
          >
            About
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] transition-all duration-300 ${
                activeSection === 'about'
                  ? 'w-full shadow-[0_0_8px_rgba(139,92,246,0.8)]'
                  : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </button>

          {/* Center Image */}
          <div
            className="w-30 h-10 cursor-pointer transition-all duration-300 hover:scale-110"
            onClick={openModal}
          >
            <img
              src="/profile.png"
              alt="Profile"
              className="w-full h-full object-contain"
            />
          </div>

          <button
            onClick={() => scrollToSection('projects')}
            className={`transition-all duration-300 relative group px-3 py-2 text-sm ${
              activeSection === 'projects'
                ? 'text-[#8b5cf6] drop-shadow-[0_0_8px_rgba(139,92,246,1)]'
                : 'text-gray-300 hover:text-[#8b5cf6] hover:drop-shadow-[0_0_6px_rgba(139,92,246,0.6)]'
            }`}
          >
            Projects
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] transition-all duration-300 ${
                activeSection === 'projects'
                  ? 'w-full shadow-[0_0_8px_rgba(139,92,246,0.8)]'
                  : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className={`transition-all duration-300 relative group px-3 py-2 text-sm ${
              activeSection === 'contact'
                ? 'text-[#8b5cf6] drop-shadow-[0_0_8px_rgba(139,92,246,1)]'
                : 'text-gray-300 hover:text-[#8b5cf6] hover:drop-shadow-[0_0_6px_rgba(139,92,246,0.6)]'
            }`}
          >
            Contact
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] transition-all duration-300 ${
                activeSection === 'contact'
                  ? 'w-full shadow-[0_0_8px_rgba(139,92,246,0.8)]'
                  : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-all duration-500 ${
              isModalClosing ? 'opacity-0 backdrop-blur-none' : 'opacity-100'
            }`}
            onClick={closeModal}
          />

          <div
            className={`relative z-10 bg-black/20 backdrop-blur-xl border border-[#8b5cf6]/30 rounded-3xl p-8 max-w-md mx-4 shadow-2xl shadow-[#8b5cf6]/20 transition-all duration-500 ease-in-out ${
              isModalClosing
                ? 'scale-0 opacity-0 -translate-y-20 blur-sm'
                : 'scale-100 opacity-100 translate-y-0 blur-none'
            }`}
          >
            <button
              onClick={closeModal}
              className={`absolute top-4 right-4 text-gray-400 hover:text-white transition-all duration-200 z-20 ${
                isModalClosing ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col items-center text-center">
              <div
                className={`w-32 h-32 rounded-full overflow-hidden border-4 border-[#8b5cf6]/50 mb-6 shadow-lg shadow-[#8b5cf6]/30 transition-all duration-600 ease-in-out ${
                  isModalClosing
                    ? 'scale-0 rotate-180 opacity-0'
                    : 'scale-100 rotate-0 opacity-100'
                }`}
              >
                <img
                  src="/unnamed.png"
                  alt="Shakthi Sri"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-[#8b5cf6] to-[#a855f7] flex items-center justify-center text-white font-bold text-4xl" style={{ display: 'none' }}>
                  S
                </div>
              </div>

              <div
                className={`transition-all duration-400 ${
                  isModalClosing
                    ? 'opacity-0 translate-y-8 scale-90'
                    : 'opacity-100 translate-y-0 scale-100 delay-300'
                }`}
              >
                <h2 className="text-2xl font-bold text-white mb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#a855f7]">
                    Shakthi Sri
                  </span>
                </h2>
                <p className="text-gray-300 text-sm mb-2">Software Developer</p>
                <p className="text-gray-400 text-xs mb-4">Final Year Student at Easwari Engineering College</p>

                {/* Additional profile info */}
                <div className="bg-[#8b5cf6]/10 rounded-lg p-4 mt-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Passionate about building efficient and scalable software solutions.
                    Deep learner with focus on understanding concepts and applying them effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
