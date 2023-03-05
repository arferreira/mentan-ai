import { useFirestore } from 'reactfire';
import { deleteDoc, doc } from 'firebase/firestore';
import { useCallback } from 'react';

function useDeleteProduc(productId: string) {
  const firestore = useFirestore();
  const collection = `products`;
  const product = doc(firestore, collection, productId);

  return useCallback(() => {
    return deleteDoc(product);
  }, [product]);
}

export default useDeleteProduc;
