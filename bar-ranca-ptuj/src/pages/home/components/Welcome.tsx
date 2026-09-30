import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMG_COFFEE } from '../constants';

gsap.registerPlugin(ScrollTrigger);

export default function Welcome() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal from left
      gsap.fromTo(
        imageRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Text reveal from right with stagger
      const textEls = textRef.current?.querySelectorAll('.welcome-animate');
      if (textEls) {
        gsap.fromTo(
          textEls,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
            },
          }
        );
      }

      // Parallax on image
      gsap.to(imageRef.current?.querySelector('img'), {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToMore = () => {
    const target = document.querySelector('#dozivetje');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="o-nas"
      ref={sectionRef}
      className="relative bg-background-50 py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      <div className="w-full px-5 md:px-10 lg:px-14">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 xl:gap-24 max-w-7xl mx-auto">
          {/* Image side */}
          <div
            ref={imageRef}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative overflow-hidden rounded-lg aspect-[4/5] lg:aspect-[3/4]">
              <img
                src={IMG_COFFEE}
                alt="Skodelica kave v Baru Ranca Ptuj"
                className="w-full h-full object-cover object-top scale-110"
              />
            </div>
            {/* Decorative accent shape */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 md:w-48 md:h-48 bg-accent-500/10 rounded-lg -z-10" />
          </div>

          {/* Text side */}
          <div ref={textRef} className="w-full lg:w-1/2">
            <p className="welcome-animate font-label text-xs tracking-extra-wide text-accent-500 font-medium uppercase mb-3 md:mb-4">
              OB PTUJSKEM JEZERU
            </p>

            <h2 className="welcome-animate font-heading text-3xl sm:text-4xl md:text-5xl font-light text-foreground-950 leading-tight mb-6 md:mb-8">
              Kjer se dobra družba sreča z razgledom.
            </h2>

            <p className="welcome-animate font-body text-sm md:text-base text-foreground-700 leading-relaxed mb-6 md:mb-8">
              Ranca je prostor za trenutke, ko se ti nikamor ne mudi. Uživaj v dobri pijači, sproščenem ambientu in edinstveni lokaciji tik ob Ptujskem jezeru. Pridi na kavo, pijačo s prijatelji ali preprosto uživat v razgledu.
            </p>

            <p className="welcome-animate font-body text-sm md:text-base text-foreground-600 leading-relaxed mb-8 md:mb-10">
              Naša terasa ponuja najlepši pogled na jezero, naša notranjost pa prijetno zavetje za sproščeno druženje ob dobri pijači. Vsak obisk je priložnost, da ustvariš nov spomin.
            </p>

            <button
              onClick={scrollToMore}
              className="welcome-animate inline-flex items-center gap-2 px-6 py-2.5 border border-foreground-300 hover:border-accent-500 text-foreground-800 hover:text-accent-700 text-xs font-label font-medium tracking-extra-wide transition-all duration-300 whitespace-nowrap cursor-pointer rounded-sm"
            >
              ODKRIJ VEČ
              <i className="ri-arrow-right-line text-sm" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}