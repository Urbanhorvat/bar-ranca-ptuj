import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMG_TERRACE_CHAIRS, IMG_DECKCHAIRS, IMG_COCKTAIL } from '../constants';
import { useImageLoad } from '@/hooks/useImageLoad';

gsap.registerPlugin(ScrollTrigger);

function MomentImage({ src, alt }: { src: string; alt: string }) {
  const { loaded } = useImageLoad(src);

  return (
    <div className="relative w-full h-full">
      {!loaded && <div className="absolute inset-0 bg-background-300/60 animate-pulse" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-all duration-700 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
      />
    </div>
  );
}

const MOMENTS = [
  {
    title: 'KAVA & SPROSTITEV',
    subtitle: 'Začni dan ob jezeru.',
    description: 'Sproščen dnevni obisk s skodelico kave in pogledom na vodo.',
    image: IMG_TERRACE_CHAIRS,
    alt: 'Mirna terasa bara Ranca z rumenim dežnikom ob jezeru',
  },
  {
    title: 'PIJAČA & DRUŽENJE',
    subtitle: 'Najboljši trenutki so v dobri družbi.',
    description: 'Pivo, vino ali koktejl – pravi spremljevalec vsakega pogovora.',
    image: IMG_DECKCHAIRS,
    alt: 'Leseni Martini ležalniki ob pomolu za druženje pri Baru Ranci',
  },
  {
    title: 'KOKTAJLI & VEČERI',
    subtitle: 'Ko se dan prevesi v noč.',
    description: 'Večerni ambient, sončni zahodi in nepozabni trenutki ob jezeru.',
    image: IMG_COCKTAIL,
    alt: 'Koktejli ob sončnem zahodu v Baru Ranca',
  },
];

export default function Moments() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="trenutki"
      ref={sectionRef}
      className="relative bg-background-100 py-16 md:py-24 lg:py-32"
    >
      <div className="w-full px-5 md:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-label text-xs tracking-extra-wide text-accent-500 font-medium uppercase mb-3">
              IZBERI SVOJ TRENUTEK
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-foreground-950">
              Trije razlogi za obisk
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {MOMENTS.map((moment, index) => (
              <div
                key={moment.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative overflow-hidden rounded-lg cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div className={`w-full h-full transition-transform duration-700 ease-out ${hoveredIndex === index ? 'scale-110' : 'scale-100'}`}>
                    <MomentImage src={moment.image} alt={moment.alt} />
                  </div>
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      hoveredIndex === index
                        ? 'bg-gradient-to-t from-black/90 via-black/50 to-black/20'
                        : 'bg-gradient-to-t from-black/85 via-black/30 to-transparent'
                    }`}
                  />
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <p className="font-label text-[9px] tracking-extra-wide text-background-50 font-semibold uppercase mb-1.5">
                    {moment.title}
                  </p>
                  <h3 className="font-heading text-lg md:text-xl text-background-50 font-light mb-1.5 drop-shadow-md">
                    {moment.subtitle}
                  </h3>
                  <p
                    className={`font-body text-[11px] md:text-xs text-background-50/85 leading-relaxed transition-all duration-500 drop-shadow-sm ${
                      hoveredIndex === index
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-90 translate-y-0'
                    }`}
                  >
                    {moment.description}
                  </p>
                </div>

                {/* Hover accent line */}
                <div
                  className={`absolute bottom-0 left-0 h-[2px] bg-accent-500 transition-all duration-500 ${
                    hoveredIndex === index ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}