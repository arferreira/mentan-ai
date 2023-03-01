import { useFirestore, useFirestoreDocData } from 'reactfire';
import { doc, DocumentReference } from 'firebase/firestore';
import { Organization } from '~/lib/organizations/types/organization';
import { PRODUCTS_COLLECTION } from '~/lib/firestore-collections';

type Response = WithId<Organization>;

/**
 * @name useFetchProduct
 * @description Returns a stream with the selected products's data
 * @param productId
 */
export function useFetchProduct(organizationId: string) {
  const firestore = useFirestore();

  const ref = doc(
    firestore,
    PRODUCTS_COLLECTION,
    organizationId
  ) as DocumentReference<Response>;

  return useFirestoreDocData(ref, { idField: 'id' });
}
