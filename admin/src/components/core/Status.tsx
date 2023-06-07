import { Badge } from 'flowbite-react';

export type TaskStatus = 'IN_PROGRESS' | 'SUCCESS' | 'FAILED';

type Props = {
  value: TaskStatus;
};

const statusColorMapping = {
  IN_PROGRESS: 'purple',
  SUCCESS: 'success',
  FAILED: 'failure',
};

const statusValueMapping = {
  IN_PROGRESS: 'In progress',
  SUCCESS: 'Success',
  FAILED: 'Failed',
};

export const Status = ({ value = 'IN_PROGRESS' }: Props) => {
  if (!value) return null;
  return (
    <div className="w-fit">
      <Badge color={statusColorMapping[value]}>
        {statusValueMapping[value]}
      </Badge>
    </div>
  );
};
