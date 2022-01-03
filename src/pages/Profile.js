// import { useEffect } from 'react';
// import { useDocument } from '../hooks/useDocument';
import { useCheckUser } from '../hooks/useCheckUser';

export const Profile = () => {
  const { profile, isProfileLoading, profileError } = useCheckUser();

  return (
    <div>
      {isProfileLoading && !profileError ? (
        <p>Loading...</p>
      ) : (
        <p>
          {profile.firstName} {profile.lastName}
        </p>
      )}
      {profileError && <p>{profileError}</p>}
    </div>
  );
};
