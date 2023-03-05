import { Line, ResponsiveContainer, LineChart, XAxis } from 'recharts';
import { useMemo } from 'react';

import Tile from '~/core/ui/Tile';
import Heading from '~/core/ui/Heading';
import { useUserSession } from '~/core/hooks/use-user-session';
import useFetchProducts from '~/lib/dashboard/hooks/use-fetch-products';
import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';
import { useProductStats } from '~/lib/dashboard/hooks/use-products-stats';

const DashboardProducts: React.FC<{
  organizationId: string;
}> = ({ organizationId }) => {
  const mrr = useMemo(() => generateDemoData(), []);
  const visitors = useMemo(() => generateDemoData(), []);
  const returningVisitors = useMemo(() => generateDemoData(), []);
  const churn = useMemo(() => generateDemoData(), []);
  const netRevenue = useMemo(() => generateDemoData(), []);
  const fees = useMemo(() => generateDemoData(), []);
  const newCustomers = useMemo(() => generateDemoData(), []);
  const tickets = useMemo(() => generateDemoData(), []);
  const activeUsers = useMemo(() => generateDemoData(), []);
  const { data } = useProductStats(organizationId);

  return (
    <div className={'flex flex-col space-y-6 pb-36'}>
      <UserGreetings />

      <div>
        <Tile>
          <Tile.Heading>Infoproducts Created</Tile.Heading>

          <Tile.Body>
            <div className={'flex justify-between'}>
              <Tile.Figure>{data.length}</Tile.Figure>
              <Tile.Trend trend={'up'}>10%</Tile.Trend>
            </div>

            <Chart data={data} />
          </Tile.Body>
        </Tile>
      </div>

      <div>
        <Tile>
          <Tile.Heading>Last Infoproducts</Tile.Heading>

          <Tile.Body>
            <ProductsTable></ProductsTable>
          </Tile.Body>
        </Tile>
      </div>
    </div>
  );
};

function UserGreetings() {
  const user = useUserSession();
  const userDisplayName = user?.auth?.displayName ?? user?.auth?.email ?? '';

  return (
    <div>
      <Heading type={4}>Welcome Back, {userDisplayName}</Heading>

      <p className={'text-gray-500 dark:text-gray-400'}>
        <span>Here&apos;s what is happening in your infoproducts</span>
      </p>
    </div>
  );
}

function generateDemoData() {
  const today = new Date();
  const formatter = new Intl.DateTimeFormat('en-us', {
    month: 'long',
    year: '2-digit',
  });

  const data: { value: string; name: string }[] = [];

  for (let n = 8; n > 0; n -= 1) {
    const date = new Date(today.getFullYear(), today.getMonth() - n, 1);

    data.push({
      name: formatter.format(date) as string,
      value: (Math.random() * 1000).toFixed(1),
    });
  }

  return [data, data[data.length - 1].value] as [typeof data, string];
}

function Chart(
  props: React.PropsWithChildren<{ data: { value: string; name: string }[] }>
) {
  return (
    <div className={'h-36'}>
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <LineChart width={400} height={100} data={props.data}>
          <Line
            className={'text-primary-500'}
            type="monotone"
            dataKey="value"
            stroke="currentColor"
            strokeWidth={2.5}
            dot={false}
          />

          <XAxis
            style={{ fontSize: 9 }}
            axisLine={false}
            tickSize={0}
            dataKey="name"
            height={15}
            dy={10}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function ProductsTable() {
  const organization = useCurrentOrganization();
  const { data: products, status } = useFetchProducts(organization?.id ?? '');

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <table className={'Table'}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Niche</th>
          <th>Created at</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.title}</td>
            <td>{product.niche}</td>
            <td>{product.createdAt.toLocaleString()}</td>
            <td>
              <Tile.Badge trend={product.done ? 'up' : 'down'}>
                {product.done ? 'created' : 'only generated'}
              </Tile.Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DashboardProducts;
