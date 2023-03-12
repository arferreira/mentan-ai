import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import {
  collection,
  CollectionReference,
  query,
  where,
} from 'firebase/firestore';
import { Product } from '../types/product-model';

type ObservableStatus<T> = {
  status: 'loading' | 'success' | 'error';
  data?: T;
  error?: any;
};

function useFetchProductById(productId: string, organizationId: string) {
  const firestore = useFirestore();
  const productsCollection = 'products';

  const collectionRef = collection(
    firestore,
    productsCollection
  ) as CollectionReference<WithId<Product>>;

  const pathProductId = 'id';
  const operatorProductId = '==';
  const constraintProductId = where(
    pathProductId,
    operatorProductId,
    productId
  );

  const pathOrganizationId = 'organizationId';
  const operatorOrganizationId = '==';
  const constraintOrganizationId = where(
    pathOrganizationId,
    operatorOrganizationId,
    organizationId
  );

  const productsQuery = query(
    collectionRef,
    constraintProductId,
    constraintOrganizationId
  );

  return useFirestoreCollectionData(productsQuery, {
    idField: 'id',
  });
}

export default useFetchProductById;
