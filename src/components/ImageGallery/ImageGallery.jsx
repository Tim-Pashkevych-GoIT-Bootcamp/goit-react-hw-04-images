import { useState } from 'react';
import css from './ImageGallery.module.css';
import { Image, ImageGalleryList, Modal } from 'components';

export const ImageGallery = ({ images }) => {
  const [selectedImageId, setSelectedImageId] = useState(0);

  const showModal = selectedImageId => {
    setSelectedImageId(selectedImageId);
  };

  const hideModal = () => {
    setSelectedImageId(0);
  };

  const selectedImage = images.find(image => image.id === selectedImageId);

  return (
    <div className={css.galleryContainer}>
      <ImageGalleryList images={images} showModal={showModal} />

      {!!selectedImageId && (
        <Modal onClose={hideModal}>
          <Image
            showLoader="true"
            src={selectedImage.src.original}
            alt={selectedImage.alt}
          />
        </Modal>
      )}
    </div>
  );
};
