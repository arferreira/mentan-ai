import Tile from '~/core/ui/Tile';
import ProductsPageContainer from './ProductsPageContainer';
import { ProductsTitle } from './ProductsTitle';
import ProductsContentContainer from './ProductsContentContainer';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, useState } from 'react';

import { MembershipRole } from '~/lib/organizations/types/membership-role';
import { useUser } from 'reactfire';
import { useCreateProduct } from '~/lib/products/hooks/use-create-product';

const NICHES = [
  'Business',
  'Finance',
  'Health',
  'Personal Development',
  'Technology',
  'Education',
  'Marketing',
];

interface Product {
  title: string;
  description: string;
  niche: string;
  type: string;
}

export function ProductAdd() {
  const { t } = useTranslation();

  const user = useUser();
  const userId = user.data?.uid;

  const [loading, setLoading] = useState<boolean>(false);

  const [niche, setNiche] = useState('');
  const [generatedTitles, setGeneratedTitles] = useState<{ title: string }[]>(
    []
  );

  // hooks
  const [createProductCallback] = useCreateProduct();

  const handleNiche = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // async call
    setGeneratedTitles([]);
    setLoading(true);
    console.log(niche);
    try {
      const response = await fetch('/api/products/firstLayer', {
        method: 'POST',
        body: JSON.stringify({ prompt: niche }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('data:', data);

      // write products on firestore using the hook function
      const promises = data.products.map((product: Product) =>
        createProductCallback({
          title: product.title,
          description: product.title,
          type: product.title,
          niche: niche,
        })
      );

      await Promise.all(promises);

      console.log(promises);

      setGeneratedTitles(
        data.products.map((product: { title: string }) => ({
          title: product.title,
        }))
      );

      setLoading(false);
    } catch (error) {
      console.error(error);
      setGeneratedTitles([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={'flex flex-col space-y-6 pb-36'}>
      <ProductsPageContainer title={t('common:productTabLabel')}>
        <ProductsTitle />
        <div className="mt-10">
          <Tile>
            <Tile.Body>
              <ProductsContentContainer>
                <div className={'flex flex-col'}>
                  {/* load the form */}
                  <form className="max-w-lg" onSubmit={handleNiche}>
                    <div className="mb-4 ">
                      <label className="mb-2 block" htmlFor="niche">
                        Tell us your niche and let me create your infoproduct!
                      </label>
                      <div className="relative flex border-gray-300">
                        <input
                          type="text"
                          id="niche"
                          value={niche}
                          onChange={(event) => setNiche(event.target.value)}
                          placeholder="What's your topic? Try 'relationship'"
                          className="w-full  p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-600"
                        />
                        <button
                          className="absolute right-0 flex h-full items-center justify-center rounded-r border-blue-500 bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                          type="submit"
                        >
                          {loading ? (
                            <svg
                              className="h-4 w-4 animate-spin text-white"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-4 w-4 fill-current text-white"
                              viewBox="0 0 20 20"
                            >
                              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    {/* Show the created products */}
                    <div className="flex w-full flex-wrap justify-center">
                      {loading ? (
                        <p>Creating infoproducts for you...</p>
                      ) : (
                        <></>
                      )}
                      {generatedTitles &&
                        generatedTitles.map(
                          (title: { title: string }, index: number) => (
                            <div key={index}>
                              <div
                                key={index}
                                className="group relative m-5 inline-block max-w-[400px] rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg border-2 border-gray-200 bg-white p-6 text-center focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:cursor-pointer hover:border-gray-600 sm:rounded-tr-none sm:rounded-bl-none"
                              >
                                <span
                                  className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                                  aria-hidden="true"
                                >
                                  <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"></path>
                                  </svg>
                                </span>
                                <div className="mt-8">
                                  <h2 className="text-black text-lg font-bold">
                                    {title.title}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                    </div>
                  </form>
                </div>
              </ProductsContentContainer>
            </Tile.Body>
          </Tile>
        </div>
      </ProductsPageContainer>
    </div>
  );
}
