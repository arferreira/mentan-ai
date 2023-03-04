import { useCallback } from 'react';
import { useUser } from 'reactfire';
import { useRequestState } from '~/core/hooks/use-request-state';
import { ProductData, createProduct } from '../utils/create-product';

export function useCreateProduct() {
  const user = useUser();
  const userId = user.data?.uid as string;

  const { state, setError, setData, setLoading } =
    useRequestState<ProductData>();

  const createProductCallback = useCallback(
    async (productData: ProductData) => {
      try {
        setLoading(true);

        const productId = await createProduct({
          userId,
          productData,
        });

        setData(productData);
        console.log(productId);

        return productId;
      } catch (e) {
        setError((e as Error).message);

        throw e;
      } finally {
        setLoading(false);
      }
    },
    [userId, setData, setError, setLoading]
  );

  return [createProductCallback, state] as [
    typeof createProductCallback,
    typeof state
  ];
}
