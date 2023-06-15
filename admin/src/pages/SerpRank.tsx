import { Button, Card } from 'flowbite-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListResponse } from '../api/requests/typings';
import { Status } from '../components/core/Status';
import { Layout } from '../components/layout/Layout';
import { AppEvent } from '../events/enum';
import { useDatable } from '../hooks/useDatatable';
import SerpApi from '../api/requests/serp.api';
import { useFetch } from '../hooks/useFetch';
import { TableRow } from '../components/core/table/CustomTable';
import { Datatable } from '../components/core/table/Datatable';
import { CreateSerp } from '../components/forms/CreateSerp';

export const SerpRank = () => {
  const props = useDatable({});
  const navigate = useNavigate();

  const { data, loading, refresh } = useFetch<ListResponse>(
    () =>
     SerpApi.all({
        page: props.page,
        limit: props.limit,
        search: props.search,
      }),
    {
      event: AppEvent.SERP_STATUS_CHANGED,
      deps: [props.page, props.limit, props.search],
    },
  );

  const serpTableRows = useMemo(
    () => [
    { label: 'Website URL', id: 'url' },
    {
      label: 'Statut',
      render: (row: any) => <Status value={row?.taskStatus} />,
    },
    {
      label: 'Action',
      render: (row: any) =>
        !row.taskStatus || row.taskStatus === 'IN_PROGRESS' ? (
          <></>
        ) : (
          <Button
            onClick={() => navigate(`/serp/${row.id}`)}
            size="xs"
            color="light">
            Result
          </Button>
        ),
    },
   ],[]
  );
  return (
    <Layout>
      <div className="mt-6">
        <Card>
          <h5 className="text-xl font-semibold">Start a new analysis</h5>
          <CreateSerp onSubmit={refresh} />
        </Card>

          <div className="my-8">
            <Datatable
              cols={serpTableRows}
              {...props}
              totalCount={data?.count ?? 0}
              rows={(data?.values ?? []) as TableRow[]}
            />
          </div>
      </div>
    </Layout>
  );
};
