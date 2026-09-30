import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuickInfo from './components/QuickInfo';
import Welcome from './components/Welcome';
import Moments from './components/Moments';
import Menu from './components/Menu';
import Cinematic from './components/Cinematic';
import Gallery from './components/Gallery';
import Experience from './components/Experience';
import Location from './components/Location';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import MobileStickyMenu from './components/MobileStickyMenu';
import BackToTop from './components/BackToTop';
import { SITE_URL } from '@/config/site';

gsap.registerPlugin(ScrollTrigger);

function SchemaMarkup() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    name: 'Bar Ranca Ptuj',
    description: 'Sproščen bar ob Ptujskem jezeru s ponudbo kave, pijač in edinstvenim razgledom.',
    url: SITE_URL,
    image: 'https://static.readdy.ai/image/610b801a81a299b5cf2b47908013d228/02ea56fb5bde32a87c58a33cb8276a9e.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'K Jezeru',
      addressLocality: 'Ptuj',
      postalCode: '2250',
      addressCountry: 'SI',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 46.4197,
      longitude: 15.8697,
    },
    servesCuisine: ['Pijača', 'Kava', 'Koktajli'],
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday', 'Saturday'],
        opens: '08:00',
        closes: '23:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '08:00',
        closes: '21:30',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function Home() {
  useEffect(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <SchemaMarkup />
      <main className="relative">
        <Navbar />
        <Hero />
        <QuickInfo />
        <Welcome />
        <Moments />
        <Menu />
        <Cinematic />
        <Gallery />
        <Experience />
        <Location />
        <FinalCTA />
        <Footer />
        <MobileStickyMenu />
        <BackToTop />
      </main>
    </>
  );
}