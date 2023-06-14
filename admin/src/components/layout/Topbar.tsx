import { Button } from 'flowbite-react';
import { usePageLabel } from '../../hooks/usePageLabel';
import { BackTitle } from '../core/BackTitle';

export const Topbar = () => {
  const info = usePageLabel();

  return (
    <div className="flex justify-between items-center px-6 py-4">
      <div className="text-2xl font-semibold">
        {info.exclude ? <BackTitle>{info.label}</BackTitle> : info.label}
      </div>
      <div className="flex items-center gap-6">
        <div>Welcome John!</div>
        <Button
          size="sm"
          color="light">
          Logout
        </Button>
      </div>
    </div>
  );
};
