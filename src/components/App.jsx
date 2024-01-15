import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as API from '../utils/apiPexels';
import { Button, Searchbar, ImageGallery, Loader, Modal } from 'components';

export const App = () => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [images, setImages] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    (async () => {
      if (keyword === '') {
        setImages([]);
        return;
      }

      const { images, total } = await getImages();
      setImages(prev => [...prev, ...images]);
      setTotal(total);
    })();
  }, [keyword, page]);

  const getImages = async () => {
    let response = { images: [], total: 0 };

    try {
      // Show loader
      toggleLoader();
      // Fetch data
      response = await API.getImages(keyword, page);
    } catch (error) {
      // Show error
      toast.error(error.message);
    } finally {
      // Hide loader
      toggleLoader();
    }

    return response;
  };

  const updateKeyword = keyword => {
    setKeyword(keyword);
    setPage(1);
    setTotal(0);
    setImages([]);
  };

  const toggleLoader = () => {
    setShowLoader(prev => !prev);
  };

  const loadMoreClick = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <Searchbar onSubmit={updateKeyword} />

      {images.length > 0 && (
        <ImageGallery
          keyword={keyword}
          images={images}
          toggleLoader={toggleLoader}
        />
      )}

      {images.length < total && (
        <Button type="button" onClick={loadMoreClick}>
          Load more
        </Button>
      )}

      {showLoader && (
        <Modal>
          <Loader />
        </Modal>
      )}

      <ToastContainer autoClose={3000} />
    </>
  );
};
