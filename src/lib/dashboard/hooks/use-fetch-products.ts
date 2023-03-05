import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import {
  collection,
  CollectionReference,
  query,
  where,
} from 'firebase/firestore';
import { Product } from '~/lib/products/types/product-model';

function useFetchProducts(organizationId: string) {
  const firestore = useFirestore();
  const productsCollection = 'products';

  const collectionRef = collection(
    firestore,
    productsCollection
  ) as CollectionReference<WithId<Product>>;

  const path = `organizationId`;
  const operator = '==';
  const constraint = where(path, operator, organizationId);
  const organizationsQuery = query(collectionRef, constraint);

  return useFirestoreCollectionData(organizationsQuery, {
    idField: 'id',
  });
}

export default useFetchProducts;
