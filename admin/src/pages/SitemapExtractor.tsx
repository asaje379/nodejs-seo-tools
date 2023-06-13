import { Button, Card } from 'flowbite-react';
import { Layout } from '../components/layout/Layout';
import { AppEvent } from '../events/enum';
import { Datatable } from '../components/core/table/Datatable';
import { useDatable } from '../hooks/useDatatable';
import { useFetch } from '../hooks/useFetch';
import { ListResponse } from '../api/requests/typings';
import { Status } from '../components/core/Status';
import { TableRow } from '../components/core/table/CustomTable';
import sitemapApi from '../api/requests/sitemap.api';
import { CreateSitemap } from '../components/forms/CreateSitemap';

const sitemapTableRows = [
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


export const SitemapExtractor = () => {
  const props = useDatable({});

  const { data, loading, refresh } = useFetch<ListResponse>(
    () =>
      sitemapApi.all({
        page: props.page,
        limit: props.limit,
        search: props.search,
      }),
    {
      event: AppEvent.SITEMAP_STATUS_CHANGED,
      deps: [props.page, props.limit, props.search],
    },
  );

  return (
    <Layout>
      <div className="mt-6">
        <Card>
          <h5 className="text-xl font-semibold">Start a new analysis</h5>
          <CreateSitemap onSubmit={refresh} />
        </Card>

        {!loading && (
          <div className="my-8">
            <Datatable
              cols={sitemapTableRows}
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
