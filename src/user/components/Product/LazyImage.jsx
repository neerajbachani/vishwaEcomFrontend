// LazyImage.js
import React from 'react';
import { Skeleton } from '@mui/material';

const LazyImage = ({ src, alt }) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <>
      {!loaded && <Skeleton variant="rectangular" sx={{ height: '100%', width: '100%' }} />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{ display: loaded ? 'block' : 'none' }}
        className='h-full w-full object-cover absolute top-0 right-0'
      />
    </>
  );
};

export default LazyImage;
