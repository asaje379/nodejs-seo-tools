import { Button, Card } from 'flowbite-react';
import { Layout } from '../components/layout/Layout';
import { CreateSummarizer } from '../components/forms/CreateSummarizer';
import { useDatable } from '../hooks/useDatatable';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { ListResponse } from '../api/requests/typings';
import summarizeApi from '../api/requests/summarizer.api';
import { AppEvent } from '../events/enum';
import { useMemo } from 'react';
import { Status } from '../components/core/Status';
import { Datatable } from '../components/core/table/Datatable';
import { TableRow } from '../components/core/table/CustomTable';

export const Summarizer = () => {
  const props = useDatable({});
  const navigate = useNavigate();

  const { data, refresh } = useFetch<ListResponse>(
    () =>
      summarizeApi.all({
        page: props.page,
        limit: props.limit,
        search: props.search,
      }),
    {
      event: AppEvent.SUMMARIZER_STATUS_CHANGED,
      deps: [props.page, props.limit, props.search],
    },
  );

  const summarizerTableRows = useMemo(
    () => [
      {
        label: 'Text content',
        render: (row: any) => (
          <div className="max-w-[100px] md:max-w-[400px] truncate">
            {row.text}
          </div>
        ),
      },
      {
        label: 'Status',
        render: (row: any) => <Status value={row.taskStatus} />,
      },
      {
        label: 'Action',
        render: (row) =>
          !row.taskStatus || row.taskStatus === 'IN_PROGRESS' ? (
            <></>
          ) : (
            <Button
              onClick={() => navigate(`/summarize/${row.id}`)}
              size="xs"
              color="light">
              Result
            </Button>
          ),
      },
    ],
    [],
  );

  return (
    <Layout>
      <div className="mt-6">
        <Card>
          <h5 className="text-xl font-semibold">Summarize text</h5>
          <CreateSummarizer onSubmit={refresh} />
        </Card>

        <div className="my-8">
          <Datatable
            cols={summarizerTableRows}
            {...props}
            totalCount={data?.count ?? 0}
            rows={(data?.values ?? []) as TableRow[]}
          />
        </div>
      </div>
    </Layout>
  );
};
