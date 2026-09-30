import { useState, useEffect, useCallback } from 'react';
import { NAV_LINKS, GOOGLE_MAPS_URL, IMG_LOGO } from '../constants';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const nav = document.querySelector('nav');
      const offset = nav ? nav.offsetHeight + 16 : 72;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav py-3 md:py-4'
            : 'bg-transparent py-5 md:py-6'
        }`}
      >
        <div className="w-full px-5 md:px-10 lg:px-14 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#domov"
            onClick={(e) => handleNavClick(e, '#domov')}
            className="flex items-center"
          >
            <img
              src={IMG_LOGO}
              alt="Ranca Ptuj"
              className="h-9 md:h-11 w-auto drop-shadow-lg"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-label font-medium tracking-extra-wide text-white/80 hover:text-white transition-colors duration-300 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-foreground-950 text-xs font-label font-semibold tracking-extra-wide transition-all duration-300 whitespace-nowrap rounded-sm"
          >
            <i className="ri-map-pin-line" />
            NAVODILA ZA POT
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer"
            aria-label="Odpri meni"
          >
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-[4.5px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background-950/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-heading text-2xl text-white/90 hover:text-primary-500 transition-colors duration-300"
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-8 py-3 bg-primary-500 text-foreground-950 text-sm font-label font-semibold tracking-wide rounded-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <i className="ri-map-pin-line" />
            NAVODILA ZA POT
          </a>
        </div>
      </div>
    </>
  );
}