import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  TrashIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import toaster from 'react-hot-toast';

import axios from 'axios';

import Heading from '~/core/ui/Heading';
import IconButton from '~/core/ui/IconButton';
import ConfirmDeleteProductModal from '~/components/products/ConfirmDeleteProductModal';
import { Tooltip, TooltipTrigger, TooltipContent } from '~/core/ui/Tooltip';
import { Product } from '~/lib/products/types/product-model';
import useTimeAgo from '~/core/hooks/use-time-ago';
import useDeleteProduct from '~/lib/products/hooks/use-delete-product';
import useUpdateProduct from '~/lib/products/hooks/use-update-product';

const ProductListItem: React.FC<{ product: WithId<Product> }> = ({
  product,
}) => {
  const getTimeAgo = useTimeAgo();
  const deleteProduct = useDeleteProduct(product.id);
  const updateProduct = useUpdateProduct(product.id);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const onDelete = useCallback(() => {
    return toaster.promise(deleteProduct(), {
      success: `Product deleted!`,
      loading: `Deleting product...`,
      error: `Ops, error! We could not delete product`,
    });
  }, [deleteProduct]);

  const generateIntro = async () => {
    const url = '/api/products/secondLayer';
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = {
      title: product.title,
      niche: product.niche,
      organizationId: product.organizationId,
      productId: product.id,
    };

    try {
      const response = await axios.post(url, data, config);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Internal server error');
    }
  };

  const onGenerateIntroduction: MouseEventHandler<HTMLButtonElement> =
    useCallback(
      async (e) => {
        e.stopPropagation();
        toaster
          .promise(generateIntro(), {
            success: `Your introduction was generated, click on product!`,
            loading: `Generating introduction...`,
            error: `Ops, error! We could not generate this introduction`,
          })
          .then((response) => {
            console.log(`Success! Message: ${response.data.introduction}`);
            console.log(product);
            product.introduction = response.data.introduction;
            updateProduct(product);
          })
          .catch((error) => console.error(error));
      },
      [product]
    );

  const onDeleteClick: MouseEventHandler = useCallback((e) => {
    e.stopPropagation();
    setIsDeleting(true);
  }, []);

  const onGenerateClick: MouseEventHandler = useCallback((e) => {
    e.stopPropagation();
    setIsGenerating(true);
  }, []);

  return (
    <>
      <div
        className={'rounded border p-4 transition-colors dark:border-black-400'}
      >
        <div className={'flex items-center space-x-4'}>
          <div className={'flex flex-1 flex-col space-y-0.5'}>
            <Heading type={5}>
              {product.introduction ? (
                <Link
                  className={'hover:underline'}
                  href={`/products/[id]`}
                  as={`/products/${product.id}`}
                  passHref
                >
                  {product.title}
                </Link>
              ) : (
                <span>{product.title}</span>
              )}
            </Heading>
            <div>
              {product.introduction && (
                <p className={'text-xs text-gray-600 dark:text-gray-600 '}>
                  <strong>Introduction:</strong>
                  {product.introduction}
                </p>
              )}
            </div>

            <div>
              <p className={'text-xs text-gray-400 dark:text-gray-500'}>
                {/* Created {getTimeAgo(new Date(product.createdAt))} */}
              </p>
            </div>
          </div>

          <div className={'flex justify-end'}>
            {!product.introduction && (
              <Tooltip>
                <TooltipTrigger onClick={onGenerateIntroduction} asChild>
                  <IconButton>
                    <ArrowTopRightOnSquareIcon
                      className={'h-5 text-blue-500'}
                    />
                  </IconButton>
                </TooltipTrigger>
                <TooltipContent>Generate Introduction</TooltipContent>
              </Tooltip>
            )}
            <Tooltip>
              <TooltipTrigger onClick={onDeleteClick} asChild>
                <IconButton>
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
