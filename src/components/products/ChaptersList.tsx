import React, { MouseEventHandler, useState } from 'react';
import axios from 'axios';

import { Tooltip, TooltipTrigger, TooltipContent } from '~/core/ui/Tooltip';
import IconButton from '~/core/ui/IconButton';

import {
  ArrowUpRightIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

import toaster from 'react-hot-toast';

interface ChapterListProps {
  chapter: string;
  index: number;
}

const ChapterList = ({ chapter, index }: ChapterListProps) => {
  const chapterTitle = chapter.replace(/^[0-9]+\. /, '');
  const [generatedContent, setGeneratedContent] = useState('');

  const generateContent: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    try {
      const response = await toaster.promise(
        axios.post('/api/products/fourthLayer', {
          chapterTitle: chapterTitle,
          ebookTitle: 'ebookTitle',
          ebookNiche: 'niche',
        }),
        {
          success: `Great news! Your content was successfully created.`,
          loading: `Hold on, I'm generating the content for your chapter...`,
          error: `Oops! Something went wrong while generating the content to your infoproduct. Please try again later.`,
        }
      );
      console.log(`Success! Message: ${response.data.content}`);
      setGeneratedContent(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={
        'mt-4 rounded border p-4 transition-colors dark:border-black-400'
      }
      key={index}
    >
      <div className={'flex items-center space-x-4'} key={index}>
        <div className={'flex flex-1 flex-col space-y-0.5'}>
          <li>{chapterTitle.replace(/^[0-9]+ - [0-9]+\. /, '')}</li>
          {/* show generated content if exists */}
          {generatedContent && <p>{generatedContent}</p>}
        </div>
        <div className={'flex justify-end'}>
          {!chapter && (
            <Tooltip>
              <TooltipTrigger onClick={generateContent} asChild>
                <IconButton>
                  <ArrowTopRightOnSquareIcon className={'h-5 text-blue-500'} />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent>Generate Introduction</TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger onClick={generateContent} asChild>
              <IconButton>
                <ArrowUpRightIcon className={'h-5 text-indigo-900'} />
              </IconButton>
            </TooltipTrigger>
            <TooltipContent>
              Ready to captivate your audience with a irresistible narrative?
              Click to generate informative and engaging content for this
              chapter 🚀
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ChapterList;
