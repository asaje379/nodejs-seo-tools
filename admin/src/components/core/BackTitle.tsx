import { PropsWithChildren } from 'react';
import { Back } from './Back';

export const BackTitle = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center gap-3">
      <Back />
      <div className="font-semibold">{children}</div>
    </div>
  );
};
