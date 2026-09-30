import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GOOGLE_MAPS_URL, GOOGLE_MAPS_EMBED } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { icon: 'ri-facebook-fill', href: 'https://www.facebook.com/bar.ranca.ptuj/', label: 'Facebook' },
  { icon: 'ri-instagram-line', href: 'https://www.instagram.com/bar_ranca_ptuj/?hl=en', label: 'Instagram' },
];

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = contentRef.current?.querySelectorAll('.location-animate');
      if (items) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="kontakt"
      ref={sectionRef}
      className="relative bg-background-950 py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      <div className="w-full px-5 md:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <p className="font-label text-xs tracking-extra-wide text-primary-500 font-medium uppercase mb-3">
              KONTAKT
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-white mb-2">
              Najdeš nas ob jezeru.
            </h2>
            <p className="font-body text-sm md:text-base text-white/50 mt-2">
              Pridi, ustavi se in uživaj v trenutku.
            </p>
          </div>

          <div
            ref={contentRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
          >
            {/* Contact info */}
            <div className="location-animate flex flex-col justify-center">
              <div className="space-y-6 md:space-y-8">
                <div>
                  <p className="font-label text-[10px] md:text-xs tracking-extra-wide text-primary-500 font-medium uppercase mb-2">
                    Naslov
                  </p>
                  <p className="font-heading text-xl md:text-2xl text-white font-light">
                    K Jezeru 18a, 2250 Ptuj
                  </p>
                  <p className="font-body text-sm text-white/50 mt-1">
                    Slovenija
                  </p>
                </div>

                <div>
                  <p id="delovni-cas" className="font-label text-[10px] md:text-xs tracking-extra-wide text-primary-500 font-medium uppercase mb-2 scroll-mt-28">
                    Delovni čas
                  </p>
                  <div className="font-body text-sm md:text-base text-white/80 space-y-1.5">
                    <div className="flex justify-between max-w-[280px]">
                      <span className="text-white/60">Ponedeljek – Četrtek</span>
                      <span className="text-white/90">8:00 – 22:00</span>
                    </div>
                    <div className="flex justify-between max-w-[280px]">
                      <span className="text-white/60">Petek – Sobota</span>
                      <span className="text-white/90">8:00 – 23:00</span>
                    </div>
                    <div className="flex justify-between max-w-[280px]">
                      <span className="text-white/60">Nedelja</span>
                      <span className="text-white/90">8:00 – 21:30</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-label text-[10px] md:text-xs tracking-extra-wide text-primary-500 font-medium uppercase mb-2">
                    Kontakt
                  </p>
                  <div className="space-y-2">
                    <a
                      href="tel:+38640274691"
                      className="flex items-center gap-2 font-body text-sm md:text-base text-white/80 hover:text-accent-400 transition-colors duration-300"
                    >
                      <i className="ri-phone-line text-primary-500" />
                      <span>040 274 691</span>
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent-500/20 text-white/60 hover:text-accent-400 transition-all duration-300"
                    >
                      <i className={`${social.icon} text-lg`} />
                    </a>
                  ))}
                </div>

                <div className="pt-4">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3 bg-primary-500 hover:bg-primary-600 text-foreground-950 text-xs font-label font-semibold tracking-extra-wide transition-all duration-300 whitespace-nowrap cursor-pointer rounded-sm"
                  >
                    <i className="ri-map-pin-line" />
                    ODPRTI NAVIGACIJO
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="location-animate relative rounded-lg overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full min-h-[280px]">
              <iframe
                src={GOOGLE_MAPS_EMBED}
                title="Lokacija Bara Ranca Ptuj"
                className="absolute inset-0 w-full h-full border-0 grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}