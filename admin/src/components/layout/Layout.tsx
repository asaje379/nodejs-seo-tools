import { PropsWithChildren, ReactNode } from 'react';
import { Topbar } from './Topbar';
import { Leftbar } from './Leftbar';
import { MainContainer } from './MainContainer';

export type LayoutProps = {
  sidebar?: ReactNode;
  topbar?: ReactNode;
};

export const Layout = ({
  children,
  sidebar = <Leftbar />,
  topbar = <Topbar />,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <div className="grid lg:grid-cols-[230px_1fr] h-screen">
      {sidebar}
      <div className="grid grid-rows-[auto_1fr] min-w-0 min-h-0">
        {topbar}
        <MainContainer>{children}</MainContainer>
      </div>
    </div>
  );
};
