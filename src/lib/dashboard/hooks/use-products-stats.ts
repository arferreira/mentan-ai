import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { collection, query, where } from 'firebase/firestore';

export function useProductStats(organizationId: string) {
  const firestore = useFirestore();
  const productsCollection = 'products';

  const queryRef = query(
    collection(firestore, productsCollection),
    where('organizationId', '==', organizationId)
  );

  const { data: products } = useFirestoreCollectionData(queryRef, {
    idField: 'id',
  });

  const stats = products?.reduce((acc, product) => {
    const date = new Date(product.createdAt);

    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const label = `${month} ${year}`;

    acc[label] = acc[label] || 0;
    acc[label] += product.done; // get the products done

    return acc;
  }, {});

  const data = stats
    ? Object.entries(stats).map(([name, value]) => ({ name, value }))
    : [];

  return { data };
}
