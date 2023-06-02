import axios from 'axios';
import { FormEvent, useState } from 'react';
import { addEventSourceListener } from './events';

function App() {
  const [result, setResult] = useState('');

  const [info, setInfo] = useState<{ url: string; images: string[] }>({
    url: '',
    images: [],
  });

  addEventSourceListener('SOUP_EXTRACTION_FINISHED', (data) => {
    setResult(JSON.stringify(data, null, 2));
  });

  const toggleValue = (value: string, checked: boolean) => {
    if (checked) {
      if (!info.images.includes(value)) {
        setInfo({ ...info, images: [...info.images, value] });
      }
    } else {
      if (info.images.includes(value)) {
        setInfo({ ...info, images: info.images.filter((it) => it !== value) });
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(info);
    const res = await axios.post('http://localhost:3000/run-extractor', {
      url: info.url,
      options: info.images,
    });
    console.log(res.data);
  };

  return (
    <div className="w-[80%] m-auto mt-4">
      <h2 className="font-bold text-2xl mb-6">Extract URL data</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="url">Website URL</label>
          <input
            type="text"
            id="url"
            value={info.url}
            onChange={(e) => setInfo({ ...info, url: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="options">Options</label>
          <div className="flex items-center gap-10 text-sm mt-2">
            <div className="flex items-center gap-2">
              <label htmlFor="">HEADERS</label>
              <input
                className="mt-0"
                type="checkbox"
                onChange={(e) => toggleValue('HEADERS', e.target.checked)}
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="">IMAGES</label>
              <input
                className="mt-0"
                type="checkbox"
                onChange={(e) => toggleValue('IMAGES', e.target.checked)}
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="">LINKS</label>
              <input
                className="mt-0"
                type="checkbox"
                onChange={(e) => toggleValue('LINKS', e.target.checked)}
              />
            </div>
          </div>
        </div>

        <button className="mt-6 py-1 px-4 border border-gray-500 rounded">
          Extract
        </button>
      </form>

      <hr className="mt-6" />

      <div className="bg-gray-100 p-2 px-4">
        <div className="text-xl font-bold">Result</div>

        <div className="mt-4 mx-2">{result}</div>
      </div>
    </div>
  );
}

export default App;
