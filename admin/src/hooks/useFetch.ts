import { useEffect, useState } from 'react';
import { addEventSourceListener } from '../events';
import { AppEvent } from '../events/enum';

export type FetchArgs = {
  event?: AppEvent;
  deps?: any[];
};

export function useFetch<T>(
  cb: () => void | Promise<void>,
  { event, deps = [] }: FetchArgs,
) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const refresh = () => {
    setCount((c) => c + 1);
  };

  if (event) {
    addEventSourceListener(event, async () => {
      setLoading(true);
      const response = await cb();
      setData(response as T);
      setLoading(false);
    });
  }

  useEffect(() => {
    const fn = async () => {
      setLoading(true);
      const response = await cb();
      setData(response as T);
      setLoading(false);
    };
    fn();
  }, [count, ...deps]);

  return { data, loading, refresh };
}
