import { Button, Card } from 'flowbite-react';
import { Layout } from '../components/layout/Layout';
import { CreateKeyword } from '../components/forms/CreateKeyword';
import { useDatable } from '../hooks/useDatatable';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { ListResponse } from '../api/requests/typings';
import keywordApi from '../api/requests/keyword.api';
import { AppEvent } from '../events/enum';
import { useMemo } from 'react';
import { Status } from '../components/core/Status';
import { Datatable } from '../components/core/table/Datatable';
import { TableRow } from '../components/core/table/CustomTable';

export const KeywordFinder = () => {
  const props = useDatable({});
  const navigate = useNavigate();

  const { data, refresh } = useFetch<ListResponse>(
    () =>
      keywordApi.all({
        page: props.page,
        limit: props.limit,
        search: props.search,
      }),
    {
      event: AppEvent.KEYWORD_STATUS_CHANGED,
      deps: [props.page, props.limit, props.search],
    },
  );

  const keywordTableRows = useMemo(
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
        label: 'Statut',
        render: (row: any) => <Status value={row.taskStatus} />,
      },
      {
        label: 'Action',
        render: (row) =>
          !row.taskStatus || row.taskStatus === 'IN_PROGRESS' ? (
            <></>
          ) : (
            <Button
              onClick={() => navigate(`/keyword-finder/${row.id}`)}
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
          <h5 className="text-xl font-semibold">Start a new search</h5>

          <CreateKeyword onSubmit={refresh} />
        </Card>

        <div className="my-8">
          <Datatable
            cols={keywordTableRows}
            {...props}
            totalCount={data?.count ?? 0}
            rows={(data?.values ?? []) as TableRow[]}
          />
        </div>
      </div>
    </Layout>
  );
};
