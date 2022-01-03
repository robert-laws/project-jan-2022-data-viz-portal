import { useEffect } from 'react';
import { useDocument } from '../hooks/useDocument';
import { useAuthContext } from '../hooks/useAuthContext';

export const Profile = () => {
  const { user } = useAuthContext();
  const { getDocument, document, documentError, isDocumentLoading } =
    useDocument();

  useEffect(() => {
    if (user) {
      getDocument('users', user.uid);
    }
  }, [user, getDocument]);

  return (
    <div>
      {isDocumentLoading ? (
        <p>Loading...</p>
      ) : (
        <p>
          {document.firstName} {document.lastName}
        </p>
      )}
      {documentError && <p>{documentError}</p>}
    </div>
  );
};
