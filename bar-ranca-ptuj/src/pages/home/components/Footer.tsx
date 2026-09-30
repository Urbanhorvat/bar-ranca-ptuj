import { NAV_LINKS, GOOGLE_MAPS_URL, IMG_LOGO } from '../constants';

export default function Footer() {
  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-background-900 py-12 md:py-16">
      <div className="w-full px-5 md:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-10 md:mb-14">
            {/* Brand */}
            <div>
              <img
                src={IMG_LOGO}
                alt="Ranca Ptuj"
                className="h-10 md:h-12 w-auto mb-3"
              />
              <p className="font-heading text-base md:text-lg italic text-white/50 mb-4">
                Bar plaža zabava.
              </p>
              <p className="font-body text-sm text-white/40 leading-relaxed">
                K Jezeru 18a<br />
                2250 Ptuj<br />
                Slovenija
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p className="font-label text-xs tracking-extra-wide text-accent-500 font-medium uppercase mb-4">
                Navigacija
              </p>
              <ul className="space-y-2.5">
                {NAV_LINKS.filter((l) => !['DOŽIVETJE'].includes(l.label)).map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="font-body text-sm text-white/50 hover:text-accent-400 transition-colors duration-300 cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & CTA */}
            <div>
              <p className="font-label text-xs tracking-extra-wide text-accent-500 font-medium uppercase mb-4">
                Sledi nam
              </p>
              <div className="flex gap-3 mb-6">
                <a
                  href="https://www.facebook.com/bar.ranca.ptuj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent-500/20 text-white/50 hover:text-accent-400 transition-all duration-300"
                >
                  <i className="ri-facebook-fill" />
                </a>
                <a
                  href="https://www.instagram.com/bar_ranca_ptuj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent-500/20 text-white/50 hover:text-accent-400 transition-all duration-300"
                >
                  <i className="ri-instagram-line" />
                </a>
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 hover:border-accent-400 text-white/70 hover:text-accent-400 text-xs font-label font-medium tracking-wide transition-all duration-300 whitespace-nowrap rounded-sm"
              >
                <i className="ri-map-pin-line" />
                NAVODILA ZA POT
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-body text-xs text-white/30">
              &copy; 2026 Ranca Ptuj. Vse pravice pridržane.
            </p>
            <p className="font-body text-xs text-white/30">
              JEZERO. DRUŽENJE. DOŽIVETJE.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}