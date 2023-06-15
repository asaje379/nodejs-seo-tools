import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import keywordApi from '../api/requests/keyword.api';
import { Layout } from '../components/layout/Layout';
import { useMemo } from 'react';
import { TaskResult } from '../api/typings';
import { Copy } from '../components/core/Copy';

export const KeywordFinderResult = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(() => keywordApi.one(id ?? ''), {});

  const value = useMemo(
    () =>
      loading || !data ? [] : (data as TaskResult<string[]>).task.result.result,
    [data, loading],
  );

  return (
    <Layout>
      <div className="font-semibold mb-4">Keyword Finder Result</div>
      <div className="bg-gray-50 p-4">
        <div className="flex justify-end mb-2">
          <Copy value={value.join(',')} />
        </div>
        <div>
          {value.map((it, id) => (
            <div key={id}>{it}</div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
