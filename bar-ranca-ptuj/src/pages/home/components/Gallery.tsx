import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY_IMAGES } from '../constants';
import { useImageLoad } from '@/hooks/useImageLoad';

gsap.registerPlugin(ScrollTrigger);

function GalleryImage({ src, alt, title }: { src: string; alt: string; title: string }) {
  const { loaded } = useImageLoad(src);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {/* Skeleton placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-background-200/80 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        title={title}
        loading="lazy"
        className={`w-full h-full object-cover transition-all duration-700 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
      />
    </div>
  );
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lbLoaded, setLbLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll('.gallery-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
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

  useEffect(() => {
    if (lightboxIndex !== null) {
      setLbLoaded(false);
      const img = new Image();
      img.src = GALLERY_IMAGES[lightboxIndex].src;
      img.onload = () => setLbLoaded(true);
    }
  }, [lightboxIndex]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setLbLoaded(false);
    document.body.style.overflow = '';
  }, []);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length);
  }, [lightboxIndex]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, [lightboxIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  const getItemClass = (index: number) => {
    const classes = [
      'col-span-2 row-span-2',
      'col-span-1 row-span-1',
      'col-span-1 row-span-1',
      'col-span-1 row-span-1',
      'col-span-1 md:col-span-2 row-span-1',
    ];
    return classes[index] || 'col-span-1 row-span-1';
  };

  return (
    <>
      <section
        id="galerija"
        ref={sectionRef}
        className="relative bg-background-100 py-16 md:py-24 lg:py-32"
      >
        <div className="w-full px-5 md:px-10 lg:px-14">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <p className="font-label text-xs tracking-extra-wide text-accent-500 font-medium uppercase mb-3">
                GALERIJA
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-foreground-950 mb-3">
                Ujeti trenutki
              </h2>
              <p className="font-body text-sm md:text-base text-foreground-600">
                Ranca skozi objektiv.
              </p>
            </div>

            <div
              ref={gridRef}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[210px] lg:auto-rows-[230px]"
            >
              {GALLERY_IMAGES.map((img, index) => (
                <div
                  key={index}
                  className={`gallery-item group relative overflow-hidden rounded-lg cursor-pointer ${getItemClass(index)}`}
                  onClick={() => openLightbox(index)}
                >
                  <div className="w-full h-full transition-transform duration-500 group-hover:scale-105 group-hover:shadow-xl">
                    <GalleryImage src={img.src} alt={img.alt} title={img.title} />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-400 flex items-end">
                    <div className="p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400 translate-y-2 group-hover:translate-y-0">
                      <p className="font-label text-[10px] md:text-xs text-white/80 tracking-wide">
                        {img.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 md:top-8 md:right-8 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Zapri"
          >
            <i className="ri-close-line text-2xl md:text-3xl" />
          </button>

          {/* Navigation arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 md:left-8 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
            aria-label="Prejšnja slika"
          >
            <i className="ri-arrow-left-line text-xl md:text-2xl" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-3 md:right-8 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
            aria-label="Naslednja slika"
          >
            <i className="ri-arrow-right-line text-xl md:text-2xl" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {!lbLoaded && (
              <div className="w-[80vw] h-[60vh] md:w-[70vw] md:h-[70vh] bg-white/10 animate-pulse rounded-sm" />
            )}
            <img
              src={GALLERY_IMAGES[lightboxIndex].src}
              alt={GALLERY_IMAGES[lightboxIndex].alt}
              className={`max-w-full max-h-[85vh] object-contain rounded-sm transition-opacity duration-500 ${lbLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            <p className="absolute bottom-0 left-0 right-0 text-center py-3 font-label text-xs text-white/60 tracking-wide">
              {lightboxIndex + 1} / {GALLERY_IMAGES.length} — {GALLERY_IMAGES[lightboxIndex].title}
            </p>
          </div>
        </div>
      )}
    </>
  );
}