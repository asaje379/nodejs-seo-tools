import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useDatable } from '../hooks/useDatatable';
import { useFetch } from '../hooks/useFetch';
import { ListResponse } from '../api/requests/typings';
import observatoryApi from '../api/requests/observatory.api';
import { AppEvent } from '../events/enum';
import { useMemo } from 'react';
import { Status } from '../components/core/Status';
import { Button, Card } from 'flowbite-react';
import { Datatable } from '../components/core/table/Datatable';
import { TableRow } from '../components/core/table/CustomTable';
import { CreateObservatory } from '../components/forms/CreateObservatory';

export const SecutityAudit = () => {
  const props = useDatable({});
  const navigate = useNavigate();

  const { data, refresh } = useFetch<ListResponse>(
    () =>
      observatoryApi.all({
        page: props.page,
        limit: props.limit,
        search: props.search,
      }),
    {
      event: AppEvent.OBSERVATORY_STATUS_CHANGED,
      deps: [props.page, props.limit, props.search],
    },
  );

  const observatoryTableRows = useMemo(
    () => [
      { label: 'Website URL', id: 'url' },
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
              onClick={() => navigate(`/security-audit/${row.id}`)}
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
          <h5 className="text-xl font-semibold">Start a new analysis</h5>

          <CreateObservatory onSubmit={refresh} />
        </Card>

        <div className="my-8">
          <Datatable
            cols={observatoryTableRows}
            {...props}
            totalCount={data?.count ?? 0}
            rows={(data?.values ?? []) as TableRow[]}
          />
        </div>
      </div>
    </Layout>
  );
};
