import {
  getFirestore,
  doc,
  collection,
  writeBatch,
  DocumentReference,
} from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

import { UserData } from '~/core/session/types/user-data';
import { MembershipRole } from '~/lib/organizations/types/membership-role';
import {
  PRODUCTS_COLLECTION,
  USERS_COLLECTION,
} from '~/lib/firestore-collections';

export interface ProductData {
  title: string;
  description: string;
  type: string;
  niche: string;
}

interface CreateProductParams {
  userId: string;
  productData: ProductData;
}

export async function createProduct({
  userId,
  productData,
}: CreateProductParams): Promise<string> {
  const firestore = getFirestore();
  const batch = writeBatch(firestore);

  try {
    const products = collection(firestore, PRODUCTS_COLLECTION);

    const userDoc = doc(
      firestore,
      USERS_COLLECTION,
      userId
    ) as DocumentReference<UserData>;

    const productDoc = doc(products);

    const productMembers = {
      [userId]: {
        role: MembershipRole.Owner,
        user: userDoc,
      },
    };

    const product = {
      ...productData,
      members: productMembers,
    };
    console.log('Creating product:', product);
    batch.set(productDoc, product);

    await batch.commit();

    return productDoc.id;
  } catch (e) {
    console.log('Error creating');
    throw (e as FirebaseError).message;
  }
}
