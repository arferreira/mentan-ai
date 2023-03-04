import { useContext } from 'react';

import { withTranslation } from 'next-i18next';
import { GetServerSidePropsContext } from 'next';
import { withAppProps } from '~/lib/props/with-app-props';

import { ProductAdd } from '~/components/products/ProductAdd';

const AddProduct = withTranslation()((props) => {
  return <ProductAdd />;
});

export default AddProduct;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
