import { GetServerSidePropsContext } from 'next';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';
import { OrganizationContext } from '~/lib/contexts/organization';
import Alert from '../../core/ui/Alert';
import { useSigninCheck } from 'reactfire';
import ProductsContainer from '~/components/products/ProductsContainer';

const Tasks = () => {
  const signInCheck = useSigninCheck();

  if (!signInCheck.data?.signedIn) {
    return null;
  }

  return (
    <RouteShell title={'Products'}>
      <OrganizationContext.Consumer>
        {(context) => {
          const organizationId = context.organization?.id;

          if (!organizationId) {
            return <Alert type={`warn`}>No organization selected</Alert>;
          }

          return <ProductsContainer organizationId={organizationId} />;
        }}
      </OrganizationContext.Consumer>
    </RouteShell>
  );
};

export default Tasks;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
