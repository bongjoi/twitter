import React, { useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { addPost } from '../reducers/post';

const StyledForm = styled(Form)`
  margin: 10px 0 20px;
`;

const StyledButton = styled(Button)`
  float: right;
`;

const ImagePreviewWrapper = styled.div`
  display: inline-block;
`;

const ImagePreview = styled.img`
  width: 200px;
`;

const PostForm = () => {
  const [text, setText] = useState('');
  const { imagePaths } = useSelector(({ post }) => ({
    imagePaths: post.imagePaths,
  }));
  const dispatch = useDispatch();
  const imageInput = useRef();

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, []);

  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText('');
  }, []);

  return (
    <StyledForm encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <StyledButton type="primary" htmlType="submit">
          트윗
        </StyledButton>
      </div>
      <div>
        {imagePaths.map((v) => (
          <ImagePreviewWrapper key={v}>
            <ImagePreview src={v} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </ImagePreviewWrapper>
        ))}
      </div>
    </StyledForm>
  );
};

export default PostForm;
