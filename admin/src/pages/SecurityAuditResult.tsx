import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import observatoryApi from '../api/requests/observatory.api';
import { useEffect, useState } from 'react';
import { TaskResult } from '../api/typings';
import { Layout } from '../components/layout/Layout';
import { Card, Table, Tabs } from 'flowbite-react';

type ObservatoryItem = {
  name: string;
  pass: boolean;
  result: 'cookies-not-found';
  expectation: 'cookies-secure-with-httponly-sessions';
  score_description: 'No cookies detected';
};

type ObservatoryResult = {
  grade?: string;
  score?: string;
  cookies: ObservatoryItem;
  contribute: ObservatoryItem;
  redirection: ObservatoryItem;
  'referrer-policy': ObservatoryItem;
  'x-frame-options': ObservatoryItem;
  'x-xss-protection': ObservatoryItem;
  'public-key-pinning': ObservatoryItem;
  'subresource-integrity': ObservatoryItem;
  'x-content-type-options': ObservatoryItem;
  'content-security-policy': ObservatoryItem;
  'strict-transport-security': ObservatoryItem;
  'cross-origin-resource-sharing': ObservatoryItem;
};

export const SecurityAuditResult = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(() => observatoryApi.one(id ?? ''), {});
  const [grade, setGrade] = useState('');
  const [score, setScore] = useState('');
  const [passed, setPassed] = useState<ObservatoryItem[]>([]);
  const [notPassed, setNotPassed] = useState<ObservatoryItem[]>([]);

  useEffect(() => {
    if (loading || !data) {
      return;
    }
    const _value = (data as TaskResult<ObservatoryResult>).task.result.result;
    const grade = _value.grade;
    const score = _value.score;
    setGrade(grade ?? '');
    setScore(score ?? '');
    delete _value.grade;
    delete _value.score;
    const value = Object.values(
      _value as unknown as Record<string, ObservatoryItem>,
    );
    setPassed(value.filter((it: ObservatoryItem) => it.pass));
    setNotPassed(value.filter((it: ObservatoryItem) => !it.pass));
  }, [data, loading]);

  return (
    <Layout>
      <div className="font-semibold">Security Audit Result</div>

      <div className="mt-8 grid grid-cols-2 gap-8">
        <Card>
          <div className="font-semibold text-gray-500 text">Score</div>
          <div className="font-semibold text-3xl">{score}</div>
        </Card>

        <Card>
          <div className="font-semibold text-gray-500 text">Grade</div>
          <div className="font-semibold text-3xl">{grade}</div>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs.Group>
          <Tabs.Item title="Tests not passed">
            <Table>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Expectation</Table.HeadCell>
                <Table.HeadCell>Result</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {notPassed.map((it, i) => (
                  <Table.Row key={'np_' + i}>
                    <Table.Cell>{it.name.toUpperCase()}</Table.Cell>
                    <Table.Cell>{it.score_description}</Table.Cell>
                    <Table.Cell>{it.expectation}</Table.Cell>
                    <Table.Cell>{it.result}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Tabs.Item>

          <Tabs.Item title="Passed tests">
            <Table>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Expectation</Table.HeadCell>
                <Table.HeadCell>Result</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {passed.map((it, i) => (
                  <Table.Row key={'np_' + i}>
                    <Table.Cell>{it.name.toUpperCase()}</Table.Cell>
                    <Table.Cell>{it.score_description}</Table.Cell>
                    <Table.Cell>{it.expectation}</Table.Cell>
                    <Table.Cell>{it.result}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </Layout>
  );
};
