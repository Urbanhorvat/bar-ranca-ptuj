import { SITE_URL } from './site';

export const OG_IMAGE =
  'https://static.readdy.ai/image/610b801a81a299b5cf2b47908013d228/02ea56fb5bde32a87c58a33cb8276a9e.png';

export interface RouteSeo {
  title: string;
  description: string;
  keywords: string;
  path: string;
}

export const routesSeo: RouteSeo[] = [
  {
    title: 'Bar Ranca Ptuj | Pijača, druženje in razgled ob Ptujskem jezeru',
    description:
      'Obiščite Bar Ranca Ptuj ob Ptujskem jezeru. Uživajte v sproščenem ambientu, dobri pijači, druženju in edinstvenem razgledu ob jezeru.',
    keywords:
      'Bar Ranca Ptuj, Ranca Ptuj, bar ob Ptujskem jezeru, pijača Ptuj, bar Ptuj, lokal ob jezeru Ptuj',
    path: '/',
  },
  {
    title: 'Ponudba | Bar Ranca Ptuj',
    description:
      'Odkrijte ponudbo pijač v baru Ranca Ptuj ob Ptujskem jezeru — kava, pivo, vino, penina in koktajli po ugodnih cenah.',
    keywords:
      'ponudba Bar Ranca Ptuj, pijače Ptuj, kava Ptuj, koktajli Ptuj, bar ob Ptujskem jezeru',
    path: '/ponudba',
  },
];

export function getRouteSeo(pathname: string): RouteSeo | undefined {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  return routesSeo.find((seo) => seo.path === normalized);
}

export function buildCanonical(path: string): string {
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}