import { GOOGLE_MAPS_URL } from '../constants';

export default function MobileStickyMenu() {
  const scrollToMenu = () => {
    const target = document.querySelector('#ponudba');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="glass-nav border-t border-white/10">
        <div className="flex items-center justify-center gap-2 px-4 py-3">
          <button
            onClick={scrollToMenu}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 text-foreground-950 text-xs font-label font-semibold tracking-wide rounded-sm cursor-pointer"
          >
            <i className="ri-goblet-line" />
            PONUDBA
          </button>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-white/30 text-white text-xs font-label font-medium tracking-wide rounded-sm"
          >
            <i className="ri-map-pin-line" />
            NAVIGACIJA
          </a>
        </div>
      </div>
    </div>
  );
}