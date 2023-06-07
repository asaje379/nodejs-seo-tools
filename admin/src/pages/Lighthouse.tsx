import { Button, Card } from 'flowbite-react';
import { Layout } from '../components/layout/Layout';
import { AppEvent } from '../events/enum';
import { Datatable } from '../components/core/table/Datatable';
import { useDatable } from '../hooks/useDatatable';
import { useFetch } from '../hooks/useFetch';
import lighthouseApi from '../api/requests/lighthouse.api';
import { ListResponse } from '../api/requests/typings';
import { Status } from '../components/core/Status';
import { CreateLighthouse } from '../components/forms/CreateLighthouse';
import { TableRow } from '../components/core/table/CustomTable';

const lighthouseTableRows = [
  { label: 'Website URL', id: 'url' },
  {
    label: 'Statut',
    render: (row: any) => <Status value={row.task?.status} />,
  },
  {
    label: 'Action',
    render: () => (
      <Button
        size="xs"
        color="light">
        Result
      </Button>
    ),
  },
];

export const Lighthouse = () => {
  const props = useDatable({});

  const { data, loading, refresh } = useFetch<ListResponse>(
    () =>
      lighthouseApi.all({
        page: props.page,
        limit: props.limit,
        search: props.search,
      }),
    {
      event: AppEvent.LIGHTHOUSE_STATUS_CHANGED,
      deps: [props.page, props.limit, props.search],
    },
  );

  return (
    <Layout>
      <div className="mt-6">
        <Card>
          <h5 className="text-xl font-semibold">Start a new analysis</h5>

          <CreateLighthouse onSubmit={refresh} />
        </Card>

        {!loading && (
          <div className="my-8">
            <Datatable
              cols={lighthouseTableRows}
              {...props}
              totalCount={data?.count}
              rows={(data?.values ?? []) as TableRow[]}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};
