import { useFirestore } from 'reactfire';
import { useCallback } from 'react';
import { addDoc, collection } from 'firebase/firestore';

import { Chapter } from '../types/chapter-model';

function useCreateChapter() {
  const firestore = useFirestore();
  const chaptersCollections = collection(firestore, `/chapters`);

  return useCallback(
    (chapter: Chapter) => {
      return addDoc(chaptersCollections, chapter);
    },
    [chaptersCollections]
  );
}

export default useCreateChapter;
