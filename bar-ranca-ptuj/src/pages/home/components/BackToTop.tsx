import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 md:bottom-8 right-5 md:right-8 z-40 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-background-950/80 backdrop-blur-md border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 cursor-pointer ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Nazaj na vrh"
    >
      <i className="ri-arrow-up-line text-lg" />
    </button>
  );
}