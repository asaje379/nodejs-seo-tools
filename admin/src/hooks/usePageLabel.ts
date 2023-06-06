import { useLocation } from 'react-router-dom';
import { getRouteByPath } from '../router/router';

export function usePageLabel() {
  const { pathname } = useLocation();
  const route = getRouteByPath(pathname);
  return route?.label ?? '';
}
