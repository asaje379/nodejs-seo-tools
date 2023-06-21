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
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

export const SitemapExtractor = () => {
  const props = useDatable({});
  const navigate = useNavigate();

  const { data, refresh } = useFetch<ListResponse>(
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

  const sitemapTableRows = useMemo(
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
              onClick={() => navigate(`/site-map/${row.id}`)}
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
          <CreateSitemap onSubmit={refresh} />
        </Card>

        <div className="my-8">
          <Datatable
            cols={sitemapTableRows}
            {...props}
            totalCount={data?.count ?? 0}
            rows={(data?.values ?? []) as TableRow[]}
          />
        </div>
      </div>
    </Layout>
  );
};
