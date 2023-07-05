import { useParams } from 'react-router-dom';
import extractorApi, {
  LinkItem,
  SoupExtractionResult,
} from '../api/requests/extractor.api';
import { Layout } from '../components/layout/Layout';
import { useFetch } from '../hooks/useFetch';
import { useMemo } from 'react';
import { TaskResult } from '../api/typings';
import { Card, Table, Tabs } from 'flowbite-react';

export const HTMLExtractorResult = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(() => extractorApi.one(id ?? ''), {});

  const value = useMemo<SoupExtractionResult | undefined>(
    () =>
      loading || !data
        ? undefined
        : ((data as TaskResult<SoupExtractionResult>).task.result
            .result as SoupExtractionResult),
    [data, loading],
  );


  return (
    <Layout>
      <div className="font-semibold">HTML Extraction Result</div>
      {!loading && value && (
        <div className="mt-6">
          <Tabs.Group>
            <Tabs.Item title="HEADERS">
              <Table>
                <Table.Head>
                  <Table.HeadCell>Tag</Table.HeadCell>
                  <Table.HeadCell>Count</Table.HeadCell>
                  <Table.HeadCell>Values</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {value.headers
                    ? Object.entries(value.headers).map((it, i) => (
                        <Table.Row key={'h_' + i}>
                          <Table.Cell>{it[0]}</Table.Cell>
                          <Table.Cell>{it[1].count}</Table.Cell>
                          <Table.Cell>
                            {it[1].values.map((_it) => (
                              <div>{_it}</div>
                            ))}
                          </Table.Cell>
                        </Table.Row>
                      ))
                    : null}
                </Table.Body>
              </Table>
            </Tabs.Item>

            <Tabs.Item title="IMAGES">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <div className="font-semibold text-gray-500 text">
                    Total images
                  </div>
                  <div className="font-semibold text-3xl">
                    {value.images?.summary.total}
                  </div>
                </Card>

                <Card>
                  <div className="font-semibold text-gray-500 text">
                    Duplicates
                  </div>
                  <div className="font-semibold text-3xl">
                    {value.images?.summary.duplicates}
                  </div>
                </Card>

                <Card>
                  <div className="font-semibold text-gray-500 text">
                    Missing Alternative text
                  </div>
                  <div className="font-semibold text-3xl">
                    {value.images?.summary.missingAlt}
                  </div>
                </Card>

                <Card>
                  <div className="font-semibold text-gray-500 text">
                    Missing Descriptive text
                  </div>
                  <div className="font-semibold text-3xl">
                    {value.images?.summary.missingTitle}
                  </div>
                </Card>
              </div>

              <div className="mt-6 grid grid-cols-4">
                {value.images?.images.map((img, id) => (
                  <div
                    key={'img_' + id}
                    className="border border-gray-100 m-1 flex items-center justify-center p-4">
                    <img
                      src={img}
                      alt="TEXT_ALT"
                      className="max-w-[100%]"
                    />
                  </div>
                ))}
              </div>
            </Tabs.Item>
            <Tabs.Item title="LINKS">
              <Tabs.Group>
                {value.links
                  ? Object.entries(value.links).map((ent, i) => (
                      <Tabs.Item
                        title={'Status code ' + ent[0]}
                        key={'li_' + i}>
                        <div>
                          {ent[1].map((it: LinkItem) => (
                            <div
                              key={it.key}
                              className="flex items-center gap-4 my-2">
                              <div className="rounded-full w-[5px] h-[5px] bg-gray-700"></div>
                              <div className="max-w-[300px] truncate">
                                <a
                                  href={it.href}
                                  target="_blank"
                                  className="underline text-primary">
                                  {it.html}
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Tabs.Item>
                    ))
                  : null}
              </Tabs.Group>
            </Tabs.Item>
          </Tabs.Group>
        </div>
      )}
    </Layout>
  );
};
