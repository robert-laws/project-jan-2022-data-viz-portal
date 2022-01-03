import { useState, useCallback } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export const useDocument = () => {
  const [document, setDocument] = useState(null);
  const [documentError, setDocumentError] = useState(null);
  const [isDocumentLoading, setIsDocumentLoading] = useState(true);

  const db = getFirestore();

  const getDocument = useCallback(
    async (col, docId) => {
      const docRef = doc(db, col, docId);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDocument(docSnap.data());
          setIsDocumentLoading(false);
        } else {
          setDocumentError('No document found');
          setIsDocumentLoading(false);
        }
      } catch (error) {
        setDocumentError(error.message);
        setIsDocumentLoading(false);
      }
    },
    [db]
  );

  // useEffect(() => {
  //   const db = getFirestore();
  //   const docRef = doc(db, col, docId);
  //   const unsubscribe = onSnapshot(
  //     docRef,
  //     (doc) => {
  //       if (doc.data()) {
  //         setDocument({
  //           id: doc.id,
  //           ...doc.data(),
  //         });
  //         setIsDocumentLoading(false);
  //       } else {
  //         setDocumentError('No document found');
  //         setIsDocumentLoading(false);
  //       }
  //     },
  //     (err) => {
  //       setDocumentError(`Database error: ${err.message}`);
  //       setIsDocumentLoading(false);
  //     }
  //   );

  //   return () => unsubscribe();
  // }, [col, docId]);

  return { getDocument, document, documentError, isDocumentLoading };
};
