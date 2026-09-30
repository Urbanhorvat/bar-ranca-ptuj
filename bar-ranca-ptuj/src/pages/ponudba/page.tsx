import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_URL } from '@/config/site';

gsap.registerPlugin(ScrollTrigger);

function SchemaMarkup() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ponudba Bar Ranca Ptuj',
    description: 'Izbrane pijače, ki jih ponujamo v baru Ranca ob Ptujskem jezeru.',
    url: `${SITE_URL}/ponudba`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, item: { '@type': 'Product', name: 'Espresso', description: 'Kava', offers: { '@type': 'Offer', price: '1.90', priceCurrency: 'EUR' } } },
      { '@type': 'ListItem', position: 2, item: { '@type': 'Product', name: 'Cappuccino', description: 'Kava', offers: { '@type': 'Offer', price: '2.40', priceCurrency: 'EUR' } } },
      { '@type': 'ListItem', position: 3, item: { '@type': 'Product', name: 'Ledena kava', description: 'Kava', offers: { '@type': 'Offer', price: '5.90', priceCurrency: 'EUR' } } },
      { '@type': 'ListItem', position: 4, item: { '@type': 'Product', name: 'Coca-Cola 0,25 L', description: 'Brezalkoholno', offers: { '@type': 'Offer', price: '3.40', priceCurrency: 'EUR' } } },
      { '@type': 'ListItem', position: 5, item: { '@type': 'Product', name: 'Heineken 0,33 L', description: 'Pivo', offers: { '@type': 'Offer', price: '3.80', priceCurrency: 'EUR' } } },
      { '@type': 'ListItem', position: 6, item: { '@type': 'Product', name: 'Union 0,33 L', description: 'Pivo', offers: { '@type': 'Offer', price: '3.20', priceCurrency: 'EUR' } } },
      { '@type': 'ListItem', position: 7, item: { '@type': 'Product', name: 'Haložan Pullus', description: 'Vino', offers: { '@type': 'Offer', price: '1.80', priceCurrency: 'EUR' } } },
      { '@type': 'ListItem', position: 8, item: { '@type': 'Product', name: 'Martini Prosecco', description: 'Penina', offers: { '@type': 'Offer', price: '4.00', priceCurrency: 'EUR' } } },
      { '@type': 'ListItem', position: 9, item: { '@type': 'Product', name: 'Mojito', description: 'Cocktail', offers: { '@type': 'Offer', price: '8.50', priceCurrency: 'EUR' } } },
      { '@type': 'ListItem', position: 10, item: { '@type': 'Product', name: 'Piña Colada', description: 'Cocktail', offers: { '@type': 'Offer', price: '7.90', priceCurrency: 'EUR' } } },
      { '@type': 'ListItem', position: 11, item: { '@type': 'Product', name: 'Martini Fiero Spritz', description: 'Spritz', offers: { '@type': 'Offer', price: '7.00', priceCurrency: 'EUR' } } },
      { '@type': 'ListItem', position: 12, item: { '@type': 'Product', name: 'Sex on the Beach', description: 'Cocktail', offers: { '@type': 'Offer', price: '7.90', priceCurrency: 'EUR' } } },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function NavbarPonudba() {
  const navigate = useNavigate();

  const goHome = (hash?: string) => {
    if (hash) {
      navigate(`/${hash}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background-50/95 backdrop-blur-md border-b border-background-200/70">
      <div className="w-full px-5 md:px-10 lg:px-14">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => goHome()}
            className="font-heading text-lg md:text-xl text-foreground-950 tracking-wide cursor-pointer"
          >
            RANCA PTUJ
          </button>
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => goHome('#ponudba')}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-label font-medium tracking-extra-wide text-foreground-600 hover:text-accent-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              PONUDBA
            </button>
            <button
              onClick={() => goHome('#galerija')}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-label font-medium tracking-extra-wide text-foreground-600 hover:text-accent-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              GALERIJA
            </button>
            <button
              onClick={() => goHome('#kontakt')}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-label font-medium tracking-extra-wide text-foreground-600 hover:text-accent-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              KONTAKT
            </button>
            <button
              onClick={() => goHome('#ponudba')}
              className="inline-flex items-center gap-2 px-4 md:px-5 py-2 bg-primary-500 hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5 text-foreground-950 text-xs font-label font-semibold tracking-extra-wide transition-all duration-300 whitespace-nowrap cursor-pointer rounded-sm"
            >
              <i className="ri-arrow-left-line text-sm" />
              NAZAJ
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function FooterPonudba() {
  return (
    <footer className="bg-background-100 border-t border-background-200/70 py-10 md:py-14">
      <div className="w-full px-5 md:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-label text-xs text-foreground-500 mb-3">
            RANCA PTUJ — BAR OB PTUJSKEM JEZERU
          </p>
          <p className="font-body text-xs text-foreground-400">
            K Jezeru 18a, 2250 Ptuj
          </p>
        </div>
      </div>
    </footer>
  );
}

const FEATURED_DRINKS = [
  { name: 'Espresso', price: '1,90 €', category: 'KAVA' },
  { name: 'Cappuccino', price: '2,40 €', category: 'KAVA' },
  { name: 'Ledena kava', price: '5,90 €', category: 'KAVA' },
  { name: 'Coca-Cola 0,25 L', price: '3,40 €', category: 'BREZALKOHOLNO' },
  { name: 'Heineken 0,33 L', price: '3,80 €', category: 'PIVO' },
  { name: 'Union 0,33 L', price: '3,20 €', category: 'PIVO' },
  { name: 'Haložan Pullus', price: '1,80 €/dcl', category: 'VINO' },
  { name: 'Martini Prosecco', price: '4,00 €/dcl', category: 'PENINA' },
  { name: 'Mojito', price: '8,50 €', category: 'COCKTAIL' },
  { name: 'Piña Colada', price: '7,90 €', category: 'COCKTAIL' },
  { name: 'Martini Fiero Spritz', price: '7,00 €', category: 'SPRITZ' },
  { name: 'Sex on the Beach', price: '7,90 €', category: 'COCKTAIL' },
];

export default function PonudbaPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll('.drink-card');
      if (items) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-background-50">
      <SchemaMarkup />
      <NavbarPonudba />

      {/* Hero */}
      <section className="relative pt-16 md:pt-20 pb-10 md:pb-16 bg-background-50">
        <div className="w-full px-5 md:px-10 lg:px-14">
          <div className="max-w-5xl mx-auto text-center pt-10 md:pt-16">
            <p className="font-label text-xs tracking-extra-wide text-accent-500 font-medium uppercase mb-3">
              BAR RANCA PTUJ
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-foreground-950 mb-4">
              Ponudba
            </h1>
            <p className="font-body text-sm md:text-base text-foreground-600 max-w-lg mx-auto">
              12 izbranih pijač, ki jih ponujamo v baru Ranca ob Ptujskem jezeru.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Drinks Grid */}
      <section className="relative pb-16 md:pb-24">
        <div className="w-full px-5 md:px-10 lg:px-14">
          <div
            ref={gridRef}
            className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {FEATURED_DRINKS.map((drink) => (
              <div
                key={drink.name}
                className="drink-card group bg-background-100 hover:bg-background-200/80 border border-background-200/70 rounded-lg p-5 md:p-6 transition-all duration-300 hover:border-accent-300/40 hover:shadow-md hover:-translate-y-0.5 cursor-default">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-label text-[10px] tracking-extra-wide text-accent-500 font-medium uppercase mb-1.5">
                      {drink.category}
                    </p>
                    <h3 className="font-body text-base md:text-lg font-medium text-foreground-900">
                      {drink.name}
                    </h3>
                  </div>
                  <span className="font-body text-sm md:text-base text-accent-600 font-semibold whitespace-nowrap flex-shrink-0">
                    {drink.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="max-w-4xl mx-auto text-center mt-10 md:mt-14">
            <p className="font-body text-xs md:text-sm text-foreground-500 mb-2">
              Ponudba se lahko razlikuje glede na sezono. Za točno ponudbo povprašaj osebje na lokaciji.
            </p>
            <p className="font-body text-xs text-foreground-400">
              Cene so v evrih (&euro;) in vključujejo DDV.
            </p>
          </div>
        </div>
      </section>

      <FooterPonudba />
    </div>
  );
}