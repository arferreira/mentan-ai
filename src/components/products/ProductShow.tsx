import { useRouter } from 'next/router';
import RouteShell from '~/components/RouteShell';
import Alert from '../../core/ui/Alert';
import { Product } from '~/lib/products/types/product-model';
import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';
import { Tooltip, TooltipTrigger, TooltipContent } from '~/core/ui/Tooltip';

import IconButton from '~/core/ui/IconButton';

import {
  ArrowUpRightIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

import axios from 'axios';
import { MouseEventHandler, useCallback, useEffect, useState } from 'react';

import toaster from 'react-hot-toast';
import useCreateChapters from '~/lib/products/hooks/use-create-chapters';
import useFetchChapters from '~/lib/products/hooks/use-fetch-chapter';
import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';

const generateChapters = async (data: {
  title: any;
  niche: any;
  organizationId: any;
}) => {
  const url = '/api/products/thirdLayer';
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(url, data, config);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
};

const Show = ({ product }: { product?: Product }) => {
  const createChapters = useCreateChapters();
  const organization = useCurrentOrganization();
  const [chapters, setChapters] = useState<any>([]);
  const router = useRouter();
  console.log('chapters', chapters);
  const onGenerateChapters: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.stopPropagation();
      try {
        const response = await toaster.promise(
          generateChapters({
            title: product?.title,
            niche: product?.niche,
            organizationId: product?.organizationId,
          }),
          {
            success: `Great news! Your chapters was successfully created.`,
            loading: `Hold on, I'm generating the chapter for your infoproduct...`,
            error: `Oops! Something went wrong while generating the chapters to your infoproduct. Please try again later.`,
          }
        );
        console.log(`Success! Message: ${response.data.chapters}`);
        const chapters = response.data.chapters
          .split('\n')
          .map((chapter: string) => chapter.trim());

        setChapters(chapters);

        // save chapters to firestore using a saveChapters function
        // iterate over chapters and save each chapter
        await Promise.all(
          chapters.map((chapter: string) =>
            createChapters({
              title: chapter,
              organizationId: product?.organizationId,
              productId: product?.id,
              done: false,
              createdAt: '',
            })
          )
        )
          .then((results) => console.log(results))
          .catch((error) => console.error(error));
      } catch (error) {
        console.error(error);
      }
    },
    [product]
  );

  return (
    <div className="">
      <article className="prose prose-slate">
        <div>
          <Heading type={3}>{product?.title.replace(/\"/g, '')}</Heading>
        </div>
        <div className="mt-10  flex-col font-heading text-gray-500 dark:text-gray-400 md:w-full">
          <p className="text-ellipsis">{product?.introduction}</p>
        </div>
        {/* Render additional product information here */}
        {chapters.length > 0 && (
          <div className="mt-10">
            <Heading type={4}>Summary</Heading>
            <ul>
              {chapters.map((chapter: string, index: number) => (
                <div
                  className={
                    'mt-4 rounded border p-4 transition-colors dark:border-black-400'
                  }
                  key={index}
                >
                  <div key={index} className={'flex items-center space-x-4'}>
                    <div
                      key={index}
                      className={'flex flex-1 flex-col space-y-0.5'}
                    >
                      <li key={index}>{chapter}</li>
                    </div>
                    <div className={'flex justify-end'}>
                      {!chapter && (
                        <Tooltip>
                          <TooltipTrigger asChild>
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
                        <TooltipTrigger asChild>
                          <IconButton>
                            <ArrowUpRightIcon
                              className={'h-5 text-indigo-900'}
                            />
                          </IconButton>
                        </TooltipTrigger>
                        <TooltipContent>
                          Ready to captivate your audience with a irresistible
                          narrative? Click to generate informative and engaging
                          content for this chapter 🚀
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        )}
      </article>

      {chapters.length == 0 && (
        <div className="flex flex-col items-center justify-center">
          <Alert type="info" className="mt-20">
            <p className="text-center text-sm">
              You can generate chapters for this product by clicking the button
              below.
            </p>
          </Alert>
          <Button className="mt-10" onClick={onGenerateChapters}>
            Let&apos;s spice it up with some chapters! Click me to generate the
            perfect flow for your infoproduct.
          </Button>
        </div>
      )}
    </div>
  );
};

export default Show;
