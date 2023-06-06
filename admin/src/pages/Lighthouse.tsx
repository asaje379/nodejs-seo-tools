import { Button, Card, TextInput } from 'flowbite-react';
import { Layout } from '../components/layout/Layout';
import { addEventSourceListener } from '../events';
import { AppEvent } from '../events/enum';

export const Lighthouse = () => {
  addEventSourceListener(AppEvent.LIGHTHOUSE_FINISHED, (data) => {
    console.log(data);
  });

  return (
    <Layout>
      <div className="mt-6">
        <Card>
          <h5 className="text-xl font-semibold">Start a new analysis</h5>

          <div className="mt-2 grid grid-cols-[1fr_auto] gap-3">
            <TextInput placeholder="Enter a web page URL" />
            <Button>Analyze</Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
