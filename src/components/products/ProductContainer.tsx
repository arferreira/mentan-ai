import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';
import Alert from '~/core/ui/Alert';
import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';

import { Trans, useTranslation } from 'next-i18next';
import useFetchProductById from '~/lib/products/hooks/use-fetch-product';
import ProductShow from './ProductShow';
import router from 'next/router';

const ProductContainer: React.FC<{
  productId: string;
  organizationId: string;
}> = ({ productId, organizationId }) => {
  const id = router.query.id as string;
  const { status, data: product } = useFetchProductById(id, organizationId);
  console.log('product', product);
  const { t } = useTranslation();

  if (status === `loading`) {
    return (
      <PageLoadingIndicator>{t('common:loadingProducts')}</PageLoadingIndicator>
    );
  }

  if (status === `error`) {
    return (
      <Alert type={'error'}>
        Sorry, we encountered an error while fetching your product.
      </Alert>
    );
  }

  return (
    <div className={'flex flex-col space-y-4'}>
      <ProductShow product={product[0]} />
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

export default ProductContainer;
