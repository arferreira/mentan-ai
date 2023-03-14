import React from 'react';

import { Tooltip, TooltipTrigger, TooltipContent } from '~/core/ui/Tooltip';

import IconButton from '~/core/ui/IconButton';

import {
  ArrowUpRightIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

interface ChapterListProps {
  chapter: string;
  index: number;
}

const ChapterList = ({ chapter, index }: ChapterListProps) => {
  const chapterTitle = chapter.replace(/^[0-9]+\. /, '');

  return (
    <div
      className={
        'mt-4 rounded border p-4 transition-colors dark:border-black-400'
      }
      key={index}
    >
      <div key={index} className={'flex items-center space-x-4'}>
        <div key={index} className={'flex flex-1 flex-col space-y-0.5'}>
          <li key={index}>{chapterTitle.replace(/^[0-9]+ - [0-9]+\. /, '')}</li>
        </div>
        <div className={'flex justify-end'}>
          {!chapter && (
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton>
                  <ArrowTopRightOnSquareIcon className={'h-5 text-blue-500'} />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent>Generate Introduction</TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
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
