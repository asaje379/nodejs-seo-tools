import { Button, Card } from 'flowbite-react';
import { Layout } from '../components/layout/Layout';
import { CreateExtractor } from '../components/forms/CreateExtractor';
import { Datatable } from '../components/core/table/Datatable';
import { useDatable } from '../hooks/useDatatable';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { ListResponse } from '../api/requests/typings';
import extractorApi from '../api/requests/extractor.api';
import { AppEvent } from '../events/enum';
import { useMemo } from 'react';
import { TableRow } from '../components/core/table/CustomTable';
import { Status } from '../components/core/Status';

export const HTMLExtractor = () => {
  const props = useDatable({});
  const navigate = useNavigate();

  const { data, refresh } = useFetch<ListResponse>(
    () =>
      extractorApi.all({
        page: props.page,
        limit: props.limit,
        search: props.search,
      }),
    {
      event: AppEvent.EXTRACTION_STATUS_CHANGED,
      deps: [props.page, props.limit, props.search],
    },
  );

  const extractorTableRows = useMemo(
    () => [
      { label: 'Website URL', id: 'url' },
      {
        label: 'Options',
        id: 'kinds',
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
              onClick={() => navigate(`/html-extractor/${row.id}`)}
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
          <h5 className="text-xl font-semibold">Start a new extraction</h5>

          <CreateExtractor onSubmit={refresh} />
        </Card>

        <div className="my-8">
          <Datatable
            cols={extractorTableRows}
            {...props}
            totalCount={data?.count ?? 0}
            rows={(data?.values ?? []) as TableRow[]}
          />
        </div>
      </div>
    </Layout>
  );
};
