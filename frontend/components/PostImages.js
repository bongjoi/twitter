import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';

const ShowMoreImages = styled.div`
  display: inline-block;
  width: 50%;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
`;

const HalfWidthImage = styled.img`
  display: inline-block;
  width: 50%;
`;

const PostImages = ({ images }) => {
  const [showImageZoom, setShowImageZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImageZoom(true);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <HalfWidthImage
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <HalfWidthImage
          role="presentation"
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
      </>
    );
  }
  return (
    <div>
      <HalfWidthImage
        role="presentation"
        src={images[0].src}
        alt={images[0].src}
        onClick={onZoom}
      />
      <ShowMoreImages role="presentation" onClick={onZoom}>
        <PlusOutlined />
        <br />
        {images.length - 1}
        개의 사진 더 보기
      </ShowMoreImages>
    </div>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
