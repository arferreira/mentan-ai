import { GetServerSidePropsContext } from 'next';
import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';
import CreateProductForm from '~/components/products/CreateProductForm';

const NewProductPage = () => {
  return (
    <RouteShell title={'New infoproduct'}>
      <div
        className={'max-w-2xl border border-gray-50 p-8 dark:border-black-400'}
      >
        <CreateProductForm />
      </div>
    </RouteShell>
  );
};

export default NewProductPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
