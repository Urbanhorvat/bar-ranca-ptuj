import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const INFO_ITEMS = [
  {
    icon: 'ri-map-pin-line',
    label: 'LOKACIJA',
    value: 'K Jezeru, 2250 Ptuj',
  },
  {
    icon: 'ri-sun-line',
    label: 'AMBIENT',
    value: 'Ob Ptujskem jezeru',
  },
  {
    icon: 'ri-goblet-line',
    label: 'DOŽIVETJE',
    value: 'Pijača • Druženje • Sprostitev',
  },
  {
    icon: 'ri-time-line',
    label: 'DELOVNI ČAS',
    value: 'Klikni za več',
  },
];

export default function QuickInfo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.quick-info-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToDelovniCas = useCallback(() => {
    const target = document.querySelector('#delovni-cas');
    if (target) {
      const nav = document.querySelector('nav');
      const offset = nav ? nav.offsetHeight + 24 : 80;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 bg-background-950 -mt-1"
    >
      <div className="w-full px-5 md:px-10 lg:px-14 py-8 md:py-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {INFO_ITEMS.map((item) => {
              const isDelovniCas = item.label === 'DELOVNI ČAS';
              return (
                <div
                  key={item.label}
                  onClick={isDelovniCas ? scrollToDelovniCas : undefined}
                  className={`quick-info-item group flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg hover:bg-white/[0.03] transition-all duration-400 ${
                    isDelovniCas ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-accent-500/10 group-hover:bg-accent-500/20 flex-shrink-0 transition-colors duration-300">
                    <i className={`${item.icon} text-accent-500 text-base md:text-lg`} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-label text-[10px] md:text-xs tracking-extra-wide text-accent-500 font-medium mb-0.5 md:mb-1">
                      {item.label}
                    </p>
                    <p className="font-body text-xs md:text-sm text-foreground-50/80 truncate group-hover:text-foreground-50 transition-colors duration-300">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}