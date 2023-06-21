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
import { CreateInternalLink } from '../components/forms/CreateInternalLink';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const InternalLinkExtractor = () => {
  const props = useDatable({});
  const navigate = useNavigate();

  const { data, refresh } = useFetch<ListResponse>(
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

  const internalLinkTableRows = useMemo(
    () => [
      { label: 'Website URL', id: 'url' },
      { label: 'Depth', id: 'depth' },
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
              onClick={() => navigate(`/internal-link/${row.id}`)}
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
          <CreateInternalLink onSubmit={refresh} />
        </Card>

        <div className="my-8">
          <Datatable
            cols={internalLinkTableRows}
            {...props}
            totalCount={data?.count ?? 0}
            rows={(data?.values ?? []) as TableRow[]}
          />
        </div>
      </div>
    </Layout>
  );
};
