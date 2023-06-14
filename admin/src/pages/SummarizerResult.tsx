import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useFetch } from '../hooks/useFetch';
import summarizerApi from '../api/requests/summarizer.api';
import { Tabs } from 'flowbite-react';
import { useMemo } from 'react';
import { TaskResult } from '../api/typings';
import { Copy } from '../components/core/Copy';

type SummarizeResult = {
  extractive?: string[];
  abstractive?: string[];
};

export const SummarizerResult = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(() => summarizerApi.one(id ?? ''), {});

  const value = useMemo(
    () =>
      loading || !data
        ? {}
        : (data as TaskResult<SummarizeResult>).task.result.result,
    [data, loading],
  );

  return (
    <Layout>
      <div className="font-semibold">Summarizer Result</div>
      {!loading && value && (
        <div className="mt-6">
          <Tabs.Group>
            <Tabs.Item
              active
              title="Original text">
              <div className="bg-gray-50 p-4">
                <div className="flex justify-end mb-2">
                  <Copy value={(data as { text: string })?.text} />
                </div>
                {(data as { text: string })?.text}
              </div>
            </Tabs.Item>

            <Tabs.Item
              active
              title="Extractive summarize">
              <div className="bg-gray-50 p-4">
                <div className="flex justify-end mb-2">
                  <Copy
                    value={value.extractive ? value.extractive.join(' ') : ''}
                  />
                </div>
                {value.extractive?.map((it: string) => (
                  <div>{it}</div>
                ))}
              </div>
            </Tabs.Item>

            <Tabs.Item
              active
              title="Abstractive summarize">
              <div className="bg-gray-50 p-4">
                <div className="flex justify-end mb-2">
                  <Copy
                    value={value.abstractive ? value.abstractive.join(' ') : ''}
                  />
                </div>
                {value.abstractive?.map((it: string) => (
                  <div>{it}</div>
                ))}
              </div>
            </Tabs.Item>
          </Tabs.Group>
        </div>
      )}
    </Layout>
  );
};
