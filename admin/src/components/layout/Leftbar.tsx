import { Sidebar } from 'flowbite-react';
import { routes } from '../../router/router';
import { NavLink } from 'react-router-dom';
import { Icon } from '../core/Icon';
import viteSvg from '../../assets/imgs/vite.svg';

const navlinkDefaultCss =
  'flex items-center rounded-lg p-2 text-base text-gray-900 hover:bg-gray-100 font-normal dark:text-white dark:hover:bg-gray-700';

export const Leftbar = () => {
  return (
    <Sidebar aria-label="App sidebar">
      <Sidebar.Logo
        href="#"
        img={viteSvg}>
        <p>SEO Tools</p>
      </Sidebar.Logo>
      <Sidebar.Items className="mt-12">
        <Sidebar.ItemGroup>
          {routes.map((route) => (
            <NavLink
              key={route.label}
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? [navlinkDefaultCss, 'bg-gray-200'].join(' ')
                  : navlinkDefaultCss
              }
              to={route.path ?? '/'}>
              <div className="flex items-center gap-3">
                <Icon name={route.icon} />
                <>{route.label}</>
              </div>
            </NavLink>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
