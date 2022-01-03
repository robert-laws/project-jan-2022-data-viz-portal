import { useState, useEffect, useRef } from 'react';
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

const db = getFirestore();
let q = '';

export const useCollection = (col, _myQuery = null, _myOrder = null) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [isCollectionLoading, setIsCollectionLoading] = useState(true);

  const myQuery = useRef(_myQuery).current;
  const myOrder = useRef(_myOrder).current;

  const colRef = collection(db, col);
  if (myQuery && myOrder) {
    q = query(colRef, where(...myQuery), orderBy(...myOrder));
  } else if (myQuery) {
    q = query(colRef, where(...myQuery));
  } else if (myOrder) {
    q = query(colRef, orderBy(...myOrder));
  } else {
    q = colRef;
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        let allDocs = [];
        if (snapshot.empty) {
          setError('No results to load');
          setIsCollectionLoading(false);
        } else {
          setError(null);
          snapshot.docs.forEach((doc) => {
            allDocs.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setDocuments(allDocs);
          setIsCollectionLoading(false);
        }
      },
      (err) => {
        setError('Could not load the document data');
        setIsCollectionLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [col]);

  return { documents, error, isCollectionLoading };
};
