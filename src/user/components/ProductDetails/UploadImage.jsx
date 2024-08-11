import React, { useState } from 'react';

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(file);
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" onChange={handleFileChange} />
      
      {previewImage && (
        <div>
          <h2>Preview:</h2>
          <img src={previewImage} alt="Preview" className=' w-[20rem] h-[20rem] ' />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
