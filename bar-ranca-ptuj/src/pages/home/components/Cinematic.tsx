import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMG_TERRACE_WIDE } from '../constants';
import { useImageLoad } from '@/hooks/useImageLoad';

gsap.registerPlugin(ScrollTrigger);

export default function Cinematic() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { loaded } = useImageLoad(IMG_TERRACE_WIDE);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on image
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text reveal
      const textEls = textRef.current?.querySelectorAll('.cinematic-animate');
      if (textEls) {
        gsap.fromTo(
          textEls,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] min-h-[400px] overflow-hidden"
    >
      {/* Background Image with parallax */}
      <div ref={imageRef} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        {!loaded && (
          <div className="absolute inset-0 bg-background-800 animate-pulse" />
        )}
        <img
          src={IMG_TERRACE_WIDE}
          alt="Terasa bara Ranca Ptuj z ležalniki in pogledom na jezero"
          loading="lazy"
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center h-full px-5 text-center"
      >
        <h2 className="cinematic-animate font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight max-w-4xl">
          Dobri trenutki ne potrebujejo načrta.
        </h2>
        <p className="cinematic-animate font-heading text-lg sm:text-xl md:text-2xl text-white/70 italic mt-4 md:mt-6">
          Samo pravo lokacijo.
        </p>
      </div>
    </section>
  );
}