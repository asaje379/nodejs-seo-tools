import { Dashboard } from '../pages/Dashboard';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { Lighthouse } from '../pages/Lighthouse';
import { SerpRank } from '../pages/SerpRank';
import { KeywordFinder } from '../pages/KeywordFinder';
import { HTMLExtractor } from '../pages/HTMLExtractor';
import { SitemapExtractor } from '../pages/SitemapExtractor';
import { SecutityAudit } from '../pages/SecutityAudit';
import { LighthouseResult } from '../pages/LighthouseResult';

type ExtendedRouteObject = RouteObject & {
  icon?: string;
  label?: string;
  exclude?: boolean;
};

export const routes: ExtendedRouteObject[] = [
  { path: '/', element: <Dashboard />, label: 'Dashboard', icon: 'dashboard' },
  {
    path: '/lighthouse',
    element: <Lighthouse />,
    icon: 'insights',
    label: 'Lighthouse Insights',
  },
  {
    path: '/lighthouse/:id',
    element: <LighthouseResult />,
    icon: 'insights',
    label: 'Lighthouse Result',
    exclude: true,
  },
  {
    path: '/serp-rank',
    element: <SerpRank />,
    label: 'Serp ranking',
    icon: 'star_rate',
  },
  {
    path: '/keyword-finder',
    element: <KeywordFinder />,
    label: 'Find Keywords',
    icon: 'match_word',
  },
  {
    path: '/html-extractor',
    element: <HTMLExtractor />,
    label: 'HTML extractor',
    icon: 'code_blocks',
  },
  {
    path: '/sitemap-extractor',
    element: <SitemapExtractor />,
    label: 'Sitemap Extractor',
    icon: 'travel_explore',
  },
  {
    path: '/security-audit',
    element: <SecutityAudit />,
    label: 'Security audit',
    icon: 'security',
  },
];

const router = createBrowserRouter(
  routes.map((item) => ({ path: item.path, element: item.element })),
);

export default router;

export function getRouteByPath(path: string) {
  let route = routes.find((route) => route.path === path);
  if (route) return route;
  const [, base] = path.split('/');
  route = routes.find((route) => route.path === `/${base}`);
  return { ...route, exclude: true };
}
