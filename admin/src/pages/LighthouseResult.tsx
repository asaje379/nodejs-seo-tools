import { useParams } from 'react-router-dom';
import lighthouseApi from '../api/requests/lighthouse.api';
import { Layout } from '../components/layout/Layout';
import { useFetch } from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import { TaskResult } from '../api/typings';
import { Card, Table, Tabs } from 'flowbite-react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export const LighthouseResult = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(() => lighthouseApi.one(id ?? ''), {});
  const [passed, setPassed] = useState<any[]>([]);
  const [notPassed, setNotPassed] = useState<any[]>([]);
  const [notApplicable, setNotApplicable] = useState<any[]>([]);
  const [informatives, setInformatives] = useState<any[]>([]);

  useEffect(() => {
    if (loading || !data) {
      return;
    }
    const _value = (data as TaskResult<any>).task.result.result;

    const value = Object.values(_value as unknown as Record<string, any>).sort(
      (a, b) => (a.id < b.id ? -1 : 1),
    );
    setPassed(value.filter((it: any) => it.score === 1));
    setNotPassed(
      value.filter(
        (it: any) =>
          it.score !== 1 &&
          !['notApplicable', 'informative'].includes(it.scoreDisplayMode),
      ),
    );
    setNotApplicable(
      value.filter((it: any) => it.scoreDisplayMode === 'notApplicable'),
    );

    setInformatives(
      value.filter((it: any) => it.scoreDisplayMode === 'informative'),
    );
  }, [data, loading]);


  return (
    <Layout>
      <div className="font-semibold">LighthouseResult</div>
      {!loading && (
        <div className="mt-6">
          <Tabs.Group>
            <Tabs.Item title="Not passed">
              <div className="px-8">
                {notPassed.map((it, idx) => (
                  <Card
                    className="my-4"
                    key={'_np_' + idx}>
                    <div className="font-semibold">{it.title}</div>
                    <div className="text-gray-500">
                      <ReactMarkdown>{it.description}</ReactMarkdown>
                    </div>

                    <div className="overflow-auto">
                      {it.details?.items && (
                        <Table>
                          {it.details?.headings && (
                            <Table.Head>
                              {it.details?.headings?.map(
                                (_it: any, _id: number) => (
                                  <Table.HeadCell key={'cl_' + _id}>
                                    {_it.label}
                                  </Table.HeadCell>
                                ),
                              )}
                            </Table.Head>
                          )}

                          {it.details?.items &&
                            it.details?.items?.map((row: any, rid: number) => (
                              <Table.Row key={'rid_' + rid}>
                                {it.details?.headings?.map(
                                  (_it: any, _id: number) => (
                                    <Table.Cell key={'cel_' + _id}>
                                      {JSON.stringify(row[_it.key])}
                                    </Table.Cell>
                                  ),
                                )}
                              </Table.Row>
                            ))}
                        </Table>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </Tabs.Item>

            <Tabs.Item title="Passed">
              <Table>
                <Table.Head>
                  <Table.HeadCell>ID</Table.HeadCell>
                  <Table.HeadCell>Title</Table.HeadCell>
                  <Table.HeadCell>Description</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {passed.map((it, i) => (
                    <Table.Row key={'np_' + i}>
                      <Table.Cell>{it.id}</Table.Cell>
                      <Table.Cell>{it.title}</Table.Cell>
                      <Table.Cell>
                        <ReactMarkdown>{it.description}</ReactMarkdown>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Tabs.Item>

            <Tabs.Item title="Not applicable">
              <Table>
                <Table.Head>
                  <Table.HeadCell>ID</Table.HeadCell>
                  <Table.HeadCell>Title</Table.HeadCell>
                  <Table.HeadCell>Description</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {notApplicable.map((it, i) => (
                    <Table.Row key={'np_' + i}>
                      <Table.Cell>{it.id}</Table.Cell>
                      <Table.Cell>{it.title}</Table.Cell>
                      <Table.Cell>
                        <ReactMarkdown>{it.description}</ReactMarkdown>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Tabs.Item>

            <Tabs.Item title="Informative">
              <Table>
                <Table.Head>
                  <Table.HeadCell>ID</Table.HeadCell>
                  <Table.HeadCell>Title</Table.HeadCell>
                  <Table.HeadCell>Description</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {informatives.map((it, i) => (
                    <Table.Row key={'np_' + i}>
                      <Table.Cell>{it.id}</Table.Cell>
                      <Table.Cell>{it.title}</Table.Cell>
                      <Table.Cell>
                        <ReactMarkdown>{it.description}</ReactMarkdown>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Tabs.Item>
          </Tabs.Group>
        </div>
      )}
    </Layout>
  );
};
