import { Button, Card } from 'flowbite-react';
import { Layout } from '../components/layout/Layout';
import { AppEvent } from '../events/enum';
import { Datatable } from '../components/core/table/Datatable';
import { useDatable } from '../hooks/useDatatable';
import { useFetch } from '../hooks/useFetch';
import { ListResponse } from '../api/requests/typings';
import { Status } from '../components/core/Status';
import { TableRow } from '../components/core/table/CustomTable';
import internalLinkApi from '../api/requests/internallink.api';
import { CreateSitemap } from '../components/forms/CreateSitemap';
import { CreateInternalLink } from '../components/forms/CreateInternalLink';

const internalLinkTableRows = [
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


export const InternalLinkExtractor = () => {
  const props = useDatable({});

  const { data, loading, refresh } = useFetch<ListResponse>(
    () =>
     internalLinkApi.all({
        page: props.page,
        limit: props.limit,
        search: props.search,
      }),
    {
      event: AppEvent.INTERNAL_LINK_STATUS_CHANGED,
      deps: [props.page, props.limit, props.search],
    },
  );

  return (
    <Layout>
      <div className="mt-6">
        <Card>
          <h5 className="text-xl font-semibold">Start a new analysis</h5>
          <CreateInternalLink onSubmit={refresh} />
        </Card>

        {!loading && (
          <div className="my-8">
            <Datatable
              cols={internalLinkTableRows}
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
