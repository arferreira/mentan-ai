import { useFirestore } from 'reactfire';
import { useCallback } from 'react';
import { addDoc, collection } from 'firebase/firestore';

import { Product } from '../types/product-model';

function useCreateProduct() {
  const firestore = useFirestore();
  const productsCollection = collection(firestore, `/products`);

  return useCallback(
    (product: Product) => {
      return addDoc(productsCollection, product);
    },
    [productsCollection]
  );
}

export default useCreateProduct;
