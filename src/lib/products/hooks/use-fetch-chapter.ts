import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import {
  collection,
  CollectionReference,
  query,
  where,
} from 'firebase/firestore';

function useFetchChapters(productId: any) {
  console.log('useFetchChapters', productId);
  const firestore = useFirestore();
  const chaptersCollection = 'chapters';

  const collectionRef = collection(
    firestore,
    chaptersCollection
  ) as CollectionReference<{}>;

  const path = 'productId';
  const operator = '==';
  const constraint = where(path, operator, productId);
  const chaptersQuery = query(collectionRef, constraint);

  const data = useFirestoreCollectionData(chaptersQuery, {
    idField: 'id',
  });
  console.log('useFetchChapters data', data);
  return data;
}

export default useFetchChapters;
