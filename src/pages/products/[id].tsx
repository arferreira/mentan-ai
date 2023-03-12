import { GetServerSidePropsContext } from 'next';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';
import { OrganizationContext } from '~/lib/contexts/organization';
import Alert from '../../core/ui/Alert';
import { useSigninCheck } from 'reactfire';
import ProductContainer from '~/components/products/ProductContainer';
import { Trans, useTranslation } from 'next-i18next';

const Products = ({ productId }: { productId: string }) => {
  const signInCheck = useSigninCheck();

  const { t } = useTranslation();

  if (!signInCheck.data?.signedIn) {
    return null;
  }

  return (
    <RouteShell title={'Products'}>
      <OrganizationContext.Consumer>
        {(context) => {
          const organizationId = context.organization?.id;

          if (!organizationId) {
            return <Alert type={`warn`}>{t('common:noOrganization')}</Alert>;
          }

          return (
            <ProductContainer
              productId={productId}
              organizationId={organizationId}
            />
          );
        }}
      </OrganizationContext.Consumer>
    </RouteShell>
  );
};

export default Products;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
