import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DRINK_CATEGORIES, IMG_BEER, IMG_COCKTAIL_MOJITO, IMG_COCKTAIL_SPRITZ, IMG_COCKTAIL_NEGRONI, IMG_TERRACE_LAKE } from '../constants';

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleToggle = (categoryName: string) => {
    setOpenCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll('.menu-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="ponudba"
      ref={sectionRef}
      className="relative bg-background-50 py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background image - subtle, behind everything */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={IMG_TERRACE_LAKE}
          alt=""
          className="w-full h-full object-cover opacity-[0.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-50/80 via-background-50/60 to-background-50/80" />
      </div>

      {/* Background accent images */}
      <div className="absolute top-10 right-0 w-64 h-64 md:w-96 md:h-96 opacity-[0.03] pointer-events-none">
        <img src={IMG_BEER} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-10 left-0 w-64 h-64 md:w-96 md:h-96 opacity-[0.03] pointer-events-none">
        <img src={IMG_COCKTAIL_MOJITO} alt="" className="w-full h-full object-contain" />
      </div>

      {/* Decorative cocktail images — visible accent */}
      <div className="absolute top-1/3 -left-12 md:-left-20 w-48 h-72 md:w-64 md:h-96 opacity-[0.12] pointer-events-none hidden lg:block">
        <img src={IMG_COCKTAIL_SPRITZ} alt="" className="w-full h-full object-contain object-top" />
      </div>
      <div className="absolute bottom-1/4 -right-12 md:-right-20 w-48 h-72 md:w-64 md:h-96 opacity-[0.10] pointer-events-none hidden lg:block">
        <img src={IMG_COCKTAIL_NEGRONI} alt="" className="w-full h-full object-contain object-top" />
      </div>

      <div className="relative w-full px-5 md:px-10 lg:px-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-label text-xs tracking-extra-wide text-accent-500 font-medium uppercase mb-3">
              PONUDBA
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-foreground-950 mb-4">
              Kaj ti danes paše?
            </h2>
            <p className="font-body text-sm md:text-base text-foreground-600 max-w-lg mx-auto">
              Klikni na kategorijo in odkrij, kaj vse ti ponujamo — od jutranje kave do večernega koktejla ob jezeru.
            </p>
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {DRINK_CATEGORIES.map((category) => {
              const isOpen = openCategory === category.name;
              // @ts-expect-error - drinks may be added later per category
              const drinks = category.drinks as { name: string; price?: string }[] | undefined;
              const hasDrinks = drinks && drinks.length > 0;

              return (
                <div
                  key={category.name}
                  onClick={() => handleToggle(category.name)}
                  className={`menu-item group relative bg-background-100 hover:bg-background-200/80 border border-background-200/70 rounded-lg p-6 md:p-8 transition-all duration-400 cursor-pointer ${
                    isOpen ? 'border-accent-400/60 bg-background-100' : 'hover:border-accent-300/40'
                  }`}
                >
                  {/* Header - always visible */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-400 group-hover:scale-110 ${
                      isOpen ? 'bg-accent-500/15 scale-110' : 'bg-accent-500/8'
                    }`}>
                      <i className={`${category.icon} text-accent-600 text-lg md:text-xl transition-transform duration-400 ${
                        isOpen ? 'scale-110' : ''
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-label text-xs md:text-sm font-semibold tracking-wide text-foreground-900 transition-colors duration-300 group-hover:text-accent-700">
                        {category.name}
                      </h3>
                    </div>
                    <div className={`w-6 h-6 flex items-center justify-center flex-shrink-0 transition-transform duration-400 ${
                      isOpen ? 'rotate-180' : ''
                    }`}>
                      <i className="ri-arrow-down-s-line text-foreground-400 text-base" />
                    </div>
                  </div>

                  {/* Expandable content */}
                  <div
                    className="overflow-hidden transition-all duration-400 ease-in-out"
                    style={{
                      maxHeight: isOpen ? '4000px' : '0px',
                      opacity: isOpen ? 1 : 0,
                      marginTop: isOpen ? '16px' : '0px',
                    }}
                  >
                    <div className="pl-[68px] md:pl-[72px] space-y-2.5">
                      {hasDrinks ? (
                        <>
                          {drinks!.map((drink) => (
                            <div
                              key={drink.name}
                              className="flex items-center justify-between"
                            >
                              <span className="font-body text-xs md:text-sm text-foreground-700">
                                {drink.name}
                              </span>
                              {drink.price && (
                                <span className="font-body text-xs md:text-sm text-accent-600 font-medium whitespace-nowrap ml-4">
                                  {drink.price}
                                </span>
                              )}
                            </div>
                          ))}
                          {/* @ts-expect-error - notes may be added to categories */}
                          {category.notes && (category.notes as { name: string; price: string }[]).length > 0 && (
                            <>
                              <div className="border-t border-background-200/70 my-1 pt-2.5" />
                              {(category.notes as { name: string; price: string }[]).map((note) => (
                                <div
                                  key={note.name}
                                  className="flex items-center justify-between"
                                >
                                  <span className="font-body text-[10px] md:text-xs text-foreground-500 italic">
                                    {note.name}
                                  </span>
                                  <span className="font-body text-[10px] md:text-xs text-foreground-400 whitespace-nowrap ml-4">
                                    {note.price}
                                  </span>
                                </div>
                              ))}
                            </>
                          )}
                        </>
                      ) : (
                        <p className="font-body text-[10px] md:text-xs text-foreground-500">
                          Vprašaj osebje za ponudbo
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-accent-500 transition-transform duration-400 origin-left rounded-b-lg ${
                    isOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10 md:mt-14 space-y-6">
            <p className="font-body text-xs md:text-sm text-foreground-500">
              Ponudba se lahko razlikuje glede na sezono. Za točno ponudbo povprašaj osebje na lokaciji.
            </p>
            <button
              onClick={() => navigate('/ponudba')}
              className="inline-flex items-center gap-2 px-7 py-3 bg-primary-500 hover:bg-primary-600 text-foreground-950 text-xs font-label font-semibold tracking-extra-wide transition-all duration-300 whitespace-nowrap cursor-pointer rounded-sm"
            >
              CELOTNA PONUDBA
              <i className="ri-arrow-right-line text-sm" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}