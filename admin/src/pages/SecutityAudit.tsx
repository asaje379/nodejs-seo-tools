import Tree from 'react-d3-tree';

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      attributes: {
        department: 'Production',
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            department: 'Fabrication',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Foreman',
          attributes: {
            department: 'Assembly',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
      ],
    },
  ],
};

const onHandlerFunction = (data: any) => {
  console.log(data);
}

export const SecutityAudit = () => {
  return (
    <div id="treeWrapper" style={{ width: '100%', height: '100vh' }}>
      <Tree onLinkClick={() => onHandlerFunction('test')} data={orgChart} />
    </div>
  );
}