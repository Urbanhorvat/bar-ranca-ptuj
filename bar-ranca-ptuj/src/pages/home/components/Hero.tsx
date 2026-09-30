import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMG_BOATS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic zoom on image
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 2.5,
          ease: 'power2.out',
        }
      );

      // Staggered fade-up for text elements
      const textElements = contentRef.current?.querySelectorAll('.hero-animate');
      if (textElements) {
        gsap.fromTo(
          textElements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="domov"
      ref={sectionRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        <img
          src={IMG_BOATS}
          alt="Bar Ranca Ptuj – pogled z jezera s čolni"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
      >
        <p className="hero-animate font-label text-xs md:text-sm tracking-extra-wide text-white/70 uppercase mb-4 md:mb-6">
          Bar ob Ptujskem jezeru
        </p>

        <h1 className="hero-animate font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white tracking-wide mb-2 md:mb-4">
          RANCA PTUJ
        </h1>

        <p className="hero-animate font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl italic text-white/90 font-light mb-4 md:mb-6">
          Bar plaža zabava.
        </p>

        <p className="hero-animate font-body text-sm md:text-base text-white/70 max-w-lg mb-8 md:mb-10">
          Dobra družba. Hladna pijača. Pogled, ki ga ne pozabiš.
        </p>

        <div className="hero-animate flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => scrollToSection('#ponudba')}
            className="px-7 py-3 bg-primary-500 hover:bg-primary-600 text-foreground-950 text-xs font-label font-semibold tracking-extra-wide transition-all duration-300 whitespace-nowrap cursor-pointer rounded-sm animate-pulse-glow"
          >
            OGLEJ SI PONUDBO
          </button>
          <button
            onClick={() => scrollToSection('#kontakt')}
            className="px-7 py-3 border border-white/40 hover:border-white/80 text-white text-xs font-label font-medium tracking-extra-wide transition-all duration-300 whitespace-nowrap cursor-pointer rounded-sm hover:bg-white/10"
          >
            KAKO DO NAS
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-float">
        <span className="font-label text-[10px] md:text-xs tracking-extra-wide text-white/60 uppercase">
          ODKRIJ RANCO
        </span>
        <i className="ri-arrow-down-line text-white/60 text-lg" />
      </div>
    </section>
  );
}