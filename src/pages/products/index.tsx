import { useCallback, useContext, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { Trans, useTranslation } from 'next-i18next';
import { UserInfo } from 'firebase/auth';
import { useUser } from 'reactfire';

import FirebaseStorageProvider from '~/core/firebase/components/FirebaseStorageProvider';

import { withAppProps } from '~/lib/props/with-app-props';
import { UserSessionContext } from '~/core/contexts/user-session';

import Head from 'next/head';

import ProductsPageContainer from '~/components/products/ProductsPageContainer';
import ProductsContentContainer from '~/components/products/ProductsContentContainer';
import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';
import Tile from '~/core/ui/Tile';
import { useUserSession } from '~/core/hooks/use-user-session';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Ebook {
  id: number;
  title: string;
  description: string;
}

interface ProductsTableProps {
  ebooks: Ebook[];
}

const Product = () => {
  const { userSession, setUserSession } = useContext(UserSessionContext);
  const { data: user } = useUser();

  const [hasProducts, setHasProducts] = useState(true);
  const { t } = useTranslation();

  const ebooks = {
    ebooks: [
      {
        id: 1,
        title: "The Hitchhiker's Guide to the Galaxy",
        description:
          'The misadventures of a hapless space traveler and his alien friend.',
      },
      {
        id: 2,
        title: '1984',
        description: 'A dystopian novel about a totalitarian society.',
      },
      {
        id: 3,
        title: 'Pride and Prejudice',
        description:
          'A classic novel about love and social class in early 19th century England.',
      },
      {
        id: 4,
        title: 'Pride and Prejudice 2',
        description:
          'A classic novel about love and social class in early 19th century England.',
      },
    ],
  };

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
  // setHasProducts(false);
  if (!user) {
    return null;
  }

  return (
    <div className={'flex flex-col space-y-6 pb-36'}>
      <ProductsPageContainer title={t('common:productTabLabel')}>
        <ProductsTitle />
        <div className="mt-10">
          <Tile>
            <Tile.Body>
              <ProductsContentContainer>
                <div className={'flex flex-col'}>
                  {hasProducts ? (
                    <div className={'mb-8 flex'}>
                      {/* load this ebooks here */}
                      <ProductsTable ebooks={ebooks.ebooks}></ProductsTable>
                    </div>
                  ) : (
                    <>
                      <div className={'mb-8 text-center'}>
                        <Heading type={4}>
                          {t('common:withoutProducts')}
                        </Heading>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="align-center">
                          <Button>{t('common:createProductButton')}</Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </ProductsContentContainer>
            </Tile.Body>
          </Tile>
        </div>
      </ProductsPageContainer>
    </div>
  );
};

export default Product;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}

function ProductsTitle() {
  const { t } = useTranslation();
  return (
    <div>
      <Heading type={4}>{t('common:productTabLabel')}</Heading>

      <p className={'text-gray-500 dark:text-gray-400'}>
        <span>{t('common:productsHeadLine')}</span>
      </p>
    </div>
  );
}

function ProductsTable({ ebooks }: ProductsTableProps) {
  return (
    <table className={'Table'}>
      <thead>
        <tr>
          <th style={{ width: '25%' }}>Title</th>
          <th>Niche</th>
          <th>Potential Profit</th>
          <th>Created at</th>
          <th>Status</th>
          <th style={{ width: '15%' }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {ebooks.map((ebook: Ebook) => (
          <tr key={ebook.id}>
            <td className="text-bold">{ebook.title}</td>
            <td>Investing</td>
            <td>$100.2</td>
            <td>
              {new Date('2023-02-25 19:47:32').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </td>

            <td>
              <Tile.Badge trend={'up'}>Running</Tile.Badge>
            </td>
            <td>
              <button
                className="mr-4 text-gray-500 hover:text-gray-600 focus:outline-none"
                aria-label="View"
                title="View"
              >
                <FontAwesomeIcon icon={faEye} />
              </button>
              <button
                className="text-indigo-500 hover:text-indigo-600 focus:outline-none"
                aria-label="Edit"
                title="Edit"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
