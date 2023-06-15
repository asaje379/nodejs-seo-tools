import { PropsWithChildren } from 'react';

export const MainContainer = ({ children }: PropsWithChildren) => {
  return <div className="px-6 overflow-auto pb-10">{children}</div>;
};
