import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';
import Alert from '~/core/ui/Alert';
import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';

import ProductsList from './ProductsList';
import useFetchProducts from '~/lib/products/hooks/use-fetch-products';

import { Trans, useTranslation } from 'next-i18next';

const ProductsContainer: React.FC<{
  organizationId: string;
}> = ({ organizationId }) => {
  const { status, data: products } = useFetchProducts(organizationId);
  const { t } = useTranslation();

  if (status === `loading`) {
    return (
      <PageLoadingIndicator>{t('common:loadingProducts')}</PageLoadingIndicator>
    );
  }

  if (status === `error`) {
    return (
      <Alert type={'error'}>
        Sorry, we encountered an error while fetching your products.
      </Alert>
    );
  }

  if (products.length === 0) {
    return <ProductsEmptyState />;
  }

  return (
    <div className={'flex flex-col space-y-4'}>
      <ProductsList products={products} />

      <div>
        <CreateTaskButton>{t('common:buttonNewProduct')}</CreateTaskButton>
      </div>
    </div>
  );
};

function ProductsEmptyState() {
  const { t } = useTranslation();
  return (
    <div
      className={
        'flex flex-col items-center justify-center space-y-4' + ' h-full p-24'
      }
    >
      <div>
        <Heading type={5}>{t('common:noProductsFound')}</Heading>
      </div>

      <CreateTaskButton>{t('common:buttonFirstProduct')}</CreateTaskButton>
    </div>
  );
}

function CreateTaskButton(props: React.PropsWithChildren) {
  return <Button href={'/products/new'}>{props.children}</Button>;
}

export default ProductsContainer;
