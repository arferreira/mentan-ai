import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';
import Alert from '~/core/ui/Alert';
import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';

import ProductsList from './ProductsList';
import useFetchProducts from '~/lib/products/hooks/use-fetch-products';

const ProductsContainer: React.FC<{
  organizationId: string;
}> = ({ organizationId }) => {
  const { status, data: products } = useFetchProducts(organizationId);

  if (status === `loading`) {
    return <PageLoadingIndicator>Loading Tasks...</PageLoadingIndicator>;
  }

  if (status === `error`) {
    return (
      <Alert type={'error'}>
        Sorry, we encountered an error while fetching your tasks.
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
        <CreateTaskButton>New Product</CreateTaskButton>
      </div>
    </div>
  );
};

function ProductsEmptyState() {
  return (
    <div
      className={
        'flex flex-col items-center justify-center space-y-4' + ' h-full p-24'
      }
    >
      <div>
        <Heading type={5}>No products found</Heading>
      </div>

      <CreateTaskButton>Create your first Product</CreateTaskButton>
    </div>
  );
}

function CreateTaskButton(props: React.PropsWithChildren) {
  return <Button href={'/products/new'}>{props.children}</Button>;
}

export default ProductsContainer;
