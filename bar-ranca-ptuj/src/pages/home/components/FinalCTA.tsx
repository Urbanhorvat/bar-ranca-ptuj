import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMG_TERRACE_LAKE, GOOGLE_MAPS_URL } from '../constants';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = contentRef.current?.querySelectorAll('.cta-animate');
      if (items) {
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToMenu = () => {
    const target = document.querySelector('#ponudba');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[70vh] md:h-[80vh] min-h-[450px] overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMG_TERRACE_LAKE}
          alt="Terasa bara Ranca Ptuj tik ob jezeru z odrazom neba"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/40" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center h-full px-5 text-center"
      >
        <h2 className="cta-animate font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-light mb-4 md:mb-6">
          Se vidimo na Ranci?
        </h2>
        <p className="cta-animate font-heading text-lg sm:text-xl md:text-2xl italic text-white/70 mb-8 md:mb-10">
          Pridi na pijačo, ostani zaradi razgleda.
        </p>

        <div className="cta-animate flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 bg-primary-500 hover:bg-primary-600 text-foreground-950 text-xs font-label font-semibold tracking-extra-wide transition-all duration-300 whitespace-nowrap rounded-sm"
          >
            <i className="ri-map-pin-line" />
            NAVODILA ZA POT
          </a>
          <button
            onClick={scrollToMenu}
            className="inline-flex items-center gap-2 px-7 py-3 border border-white/40 hover:border-white/80 text-white text-xs font-label font-medium tracking-extra-wide transition-all duration-300 whitespace-nowrap cursor-pointer rounded-sm hover:bg-white/10"
          >
            OGLEJ SI PONUDBO
          </button>
        </div>
      </div>
    </section>
  );
}