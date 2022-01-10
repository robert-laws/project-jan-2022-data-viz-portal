import { useState } from 'react';
import PlaceholderImage from '../assets/images/yt-placeholder-dark.png';

export const Placeholder = ({ placeholderText, children }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {show ? (
        children
      ) : (
        <div className='video-placeholder' onClick={() => setShow(true)}>
          <p>{placeholderText}</p>
          <img src={PlaceholderImage} alt='video placeholder' />
        </div>
      )}
    </>
  );
};
