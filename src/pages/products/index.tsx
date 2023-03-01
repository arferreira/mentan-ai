import { useCallback, useContext } from 'react';
import { GetServerSidePropsContext } from 'next';
import { Trans } from 'next-i18next';
import { UserInfo } from 'firebase/auth';
import { useUser } from 'reactfire';

import FirebaseStorageProvider from '~/core/firebase/components/FirebaseStorageProvider';

import { withAppProps } from '~/lib/props/with-app-props';
import { UserSessionContext } from '~/core/contexts/user-session';

import Head from 'next/head';

import ProductsPageContainer from '~/components/products/ProductsPageContainer';
import ProductsContentContainer from '~/components/products/ProductsContentContainer';

const Product = () => {
  const { userSession, setUserSession } = useContext(UserSessionContext);
  const { data: user } = useUser();

  //   const onUpdate = useCallback(
  //     (data: ProfileData) => {
  //       const authData = userSession?.auth;

  //       if (authData) {
  //         setUserSession({
  //           auth: {
  //             ...authData,
  //             ...data,
  //           },
  //           data: userSession.data,
  //         });
  //       }
  //     },
  //     [setUserSession, userSession]
  //   );

  if (!user) {
    return null;
  }

  return (
    <ProductsPageContainer title={'Products'}>
      <Head>
        <title key={'title'}>My products</title>
      </Head>

      <ProductsContentContainer></ProductsContentContainer>
    </ProductsPageContainer>
  );
};

export default Product;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
