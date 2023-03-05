import { Product } from '~/lib/products/types/product-model';
import ProductListItem from './ProductListItem';

const ProductsList: React.FC<{
  products: WithId<Product>[];
}> = ({ products }) => {
  return (
    <div className={'flex flex-col space-y-4'}>
      {products.map((product) => {
        return <ProductListItem product={product} key={product.id} />;
      })}
    </div>
  );
};

export default ProductsList;
