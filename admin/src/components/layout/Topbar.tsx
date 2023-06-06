import { Button } from 'flowbite-react';
import { usePageLabel } from '../../hooks/usePageLabel';

export const Topbar = () => {
  const pageLabel = usePageLabel();

  return (
    <div className="flex justify-between items-center px-6 py-4">
      <div className="text-2xl font-semibold">{pageLabel}</div>
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
