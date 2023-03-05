import { useCallback } from 'react';
import { useFirestore } from 'reactfire';
import { doc, updateDoc } from 'firebase/firestore';

import { Product } from '../types/product-model';

function useUpdateProduct(productId: string) {
  const firestore = useFirestore();
  const productsCollection = 'products';

  const docRef = doc(firestore, productsCollection, productId);

  return useCallback(
    (product: Partial<Product>) => {
      return updateDoc(docRef, product);
    },
    [docRef]
  );
}

export default useUpdateProduct;
