import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMG_TERRACE_CHAIRS, IMG_DECKCHAIRS, IMG_NIGHT_TERRACE } from '../constants';
import { useImageLoad } from '@/hooks/useImageLoad';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    icon: 'ri-map-pin-2-line',
    title: 'LOKACIJA',
    description: 'Edinstvena lega tik ob Ptujskem jezeru. Nič ne premaga pogleda na vodo ob sončnem zahodu.',
    bgImage: IMG_TERRACE_CHAIRS,
  },
  {
    icon: 'ri-user-smile-line',
    title: 'DRUŽENJE',
    description: 'Prostor za sproščene trenutke s prijatelji. Od popoldanske kave do večerne zabave.',
    bgImage: IMG_DECKCHAIRS,
  },
  {
    icon: 'ri-moon-clear-line',
    title: 'VZDUŠJE',
    description: 'Od dnevne kave do večernega druženja. Vsak del dneva ima svoj čar na Ranci.',
    bgImage: IMG_NIGHT_TERRACE,
  },
];

function ExperienceCardBg({ src }: { src: string }) {
  const { loaded } = useImageLoad(src);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {!loaded && <div className="absolute inset-0 bg-background-200/60 animate-pulse" />}
      <img
        src={src}
        alt=""
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.experience-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="dozivetje"
      ref={sectionRef}
      className="relative bg-background-50 py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      <div className="relative w-full px-5 md:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-label text-xs tracking-extra-wide text-primary-500 font-medium uppercase mb-3">
              DOŽIVETJE
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-foreground-950 mb-3">
              Več kot samo pijača.
            </h2>
            <p className="font-body text-sm md:text-base text-foreground-600 max-w-lg mx-auto">
              Trije razlogi, zakaj je Ranca prava izbira za tvoj naslednji obisk.
            </p>
          </div>

          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.title}
                className="experience-card group relative bg-background-100 border border-background-200/70 hover:border-accent-300/40 rounded-lg p-8 md:p-10 transition-all duration-400 overflow-hidden shadow-sm hover:shadow-lg"
              >
                {/* Background image with skeleton */}
                <ExperienceCardBg src={exp.bgImage} />

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 pointer-events-none" />

                {/* Content overlay to ensure readability */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 mb-6 md:mb-8 transition-colors duration-300">
                    <i className={`${exp.icon} text-white text-xl md:text-2xl`} />
                  </div>

                  <h3 className="font-heading text-xl md:text-2xl text-white font-light mb-3 md:mb-4 drop-shadow-md">
                    {exp.title}
                  </h3>

                  <p className="font-body text-sm md:text-base text-white/80 leading-relaxed drop-shadow-sm">
                    {exp.description}
                  </p>
                </div>

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-b-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}