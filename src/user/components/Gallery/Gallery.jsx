import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGalleryPhotos } from '../../redux/Gallery/Action';

const Gallery = () => {
  const dispatch = useDispatch();
  const { gallery } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getGalleryPhotos());
  }, [dispatch]);

  const flattenedImages = gallery.galleryPhotos ? gallery.galleryPhotos.flatMap((photo) => photo.image) : [];
  const rows = flattenedImages.length ? Math.ceil(flattenedImages.length / 3) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-4">
          {flattenedImages.slice(rowIndex * 3, (rowIndex + 1) * 3).map((imageUrl, columnIndex) => (
            <div key={`${rowIndex}-${columnIndex}`}>
              <img className="h-auto max-w-full rounded-lg" src={imageUrl} alt={`Image ${rowIndex * 3 + columnIndex + 1}`} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Gallery;

