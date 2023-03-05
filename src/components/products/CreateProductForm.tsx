import { useRouter } from 'next/router';
import { FormEventHandler, useCallback } from 'react';

import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';

import { useRequestState } from '~/core/hooks/use-request-state';
import If from '~/core/ui/If';
import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';
import toaster from 'react-hot-toast';
import Heading from '~/core/ui/Heading';

import { create } from 'cypress/types/lodash';
import useCreateProduct from '~/lib/products/hooks/use-create-product';
import { type } from 'os';

const CreateProductForm = () => {
  const createProduct = useCreateProduct();
  const { setLoading, state } = useRequestState();
  const router = useRouter();
  const organization = useCurrentOrganization();
  const organizationId = organization?.id as string;

  const onCreateProduct: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);

      const target = event.currentTarget;
      const data = new FormData(target);
      const niche = data.get('niche') as string;

      //  call openAI
      const response = await fetch('/api/products/firstLayer', {
        method: 'POST',
        body: JSON.stringify({ prompt: niche }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const productGenerated = await response.json();
      console.log('product:', productGenerated.products[0].title);
      const title = productGenerated.products[0].title;
      const dueDate = (data.get('dueDate') as string) || getDefaultDueDate();

      const product = {
        organizationId,
        title,
        dueDate,
        description: title,
        done: false,
        niche: niche,
        type: niche,
        createdAt: getDefaultDueDate(),
      };

      await toaster.promise(createProduct(product), {
        success: `Procut created!`,
        error: `Ops, error!`,
        loading: `Creating Product...`,
      });

      await router.push(`/products`);
    },
    [router, createProduct, organizationId, setLoading]
  );

  return (
    <div className={'flex flex-col space-y-4'}>
      <div>
        <Heading type={2}>Create a new Product</Heading>
      </div>

      <form onSubmit={onCreateProduct}>
        <div className={'flex flex-col space-y-3'}>
          <TextField.Label>
            Niche
            <TextField.Input
              required
              name={'niche'}
              placeholder={'ex. relationship'}
            />
            <TextField.Hint>Hint: whatever you do, ship!</TextField.Hint>
          </TextField.Label>

          <div
            className={
              'flex flex-col space-y-2 md:space-y-0 md:space-x-2' +
              ' md:flex-row'
            }
          >
            <Button loading={state.loading}>
              <If condition={state.loading} fallback={<>Create Product</>}>
                Creating Product...
              </If>
            </Button>

            <Button color={'transparent'} href={'/products'}>
              Go back
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

function getDefaultDueDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(23, 59, 59);

  return date.toDateString();
}

export default CreateProductForm;