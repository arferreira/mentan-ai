import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';
import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';

const DashboardProducts = dynamic(
  () => import('~/components/dashboard/Dashboard'),
  {
    ssr: false,
  }
);

const Dashboard = () => {
  const organization = useCurrentOrganization();
  return (
    <RouteShell title={'Dashboard'}>
      <DashboardProducts organizationId={organization?.id ?? ''} />
    </RouteShell>
  );
};

export default Dashboard;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
