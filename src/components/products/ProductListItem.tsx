import { MouseEventHandler, useCallback, useState } from 'react';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';
import toaster from 'react-hot-toast';

import Heading from '~/core/ui/Heading';

import IconButton from '~/core/ui/IconButton';

import ConfirmDeleteProductModal from '~/components/products/ConfirmDeleteProductModal';

import { Tooltip, TooltipTrigger, TooltipContent } from '~/core/ui/Tooltip';
import { Product } from '~/lib/products/types/product-model';
import useTimeAgo from '~/core/hooks/use-time-ago';
import useDeleteProduct from '~/lib/products/hooks/use-delete-product';
import useUpdateProduct from '~/lib/products/hooks/use-update-product';

const ProductListItem: React.FC<{
  product: WithId<Product>;
}> = ({ product }) => {
  const getTimeAgo = useTimeAgo();
  const deleteProduct = useDeleteProduct(product.id);
  const updateProduct = useUpdateProduct(product.id);

  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = useCallback(() => {
    return toaster.promise(deleteProduct(), {
      success: `Product deleted!`,
      loading: `Deleting product...`,
      error: `Ops, error! We could not delete product`,
    });
  }, [deleteProduct]);

  const onDoneChange = useCallback(
    (done: boolean) => {
      const promise = updateProduct({ done });

      return toaster.promise(promise, {
        success: `Product updated!`,
        loading: `Updating product...`,
        error: `Ops, error! We could not update product`,
      });
    },
    [updateProduct]
  );

  const onDeleteClick: MouseEventHandler = useCallback((e) => {
    e.stopPropagation();
    setIsDeleting(true);
  }, []);

  return (
    <>
      <div
        className={'rounded border p-4 transition-colors dark:border-black-400'}
      >
        <div className={'flex items-center space-x-4'}>
          <div>
            <Tooltip
              content={
                product.type === '' ? `Mark as not done` : `Mark as done`
              }
            >
              <input
                className={'Toggle cursor-pointer'}
                type="checkbox"
                defaultChecked={product.type === ''}
                onChange={(e) => {
                  return onDoneChange(e.currentTarget.checked);
                }}
              />
            </Tooltip>
          </div>

          <div className={'flex flex-1 flex-col space-y-0.5'}>
            <Heading type={5}>
              <Link
                className={'hover:underline'}
                href={`/products/[id]`}
                as={`/products/${product.id}`}
                passHref
              >
                {product.title}
              </Link>
            </Heading>

            <div>
              <p className={'text-xs text-gray-400 dark:text-gray-500'}>
                Due {getTimeAgo(new Date(product.createdAt))}
              </p>
            </div>
          </div>

          <div className={'flex justify-end'}>
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton onClick={onDeleteClick}>
                  <TrashIcon className={'h-5 text-red-500'} />
                </IconButton>
              </TooltipTrigger>

              <TooltipContent>Delete Product</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      <ConfirmDeleteProductModal
        isOpen={isDeleting}
        setIsOpen={setIsDeleting}
        product={product.title}
        onConfirm={onDelete}
      />
    </>
  );
};

export default ProductListItem;
