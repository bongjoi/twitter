import React, { useCallback, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';
import backUrl from '../config/config';

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
  const [text, onChangeText, setText] = useInput('');
  const { imagePaths, addPostDone, addPostLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const imageInput = useRef();

  // 포스트 추가가 완료되면 포스트 내용 초기화
  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, []);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }

    const formData = new FormData();

    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);

    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const onChangeImages = useCallback((e) => {
    const { files } = e.target;
    const imageFormData = new FormData();
    const it = files[Symbol.iterator]();
    while (true) {
      const result = it.next();
      if (result.done) break;
      imageFormData.append('image', result.value);
    }
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch({
        type: REMOVE_IMAGE,
        data: index,
      });
    },
    [],
  );

  return (
    <StyledForm encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
          key={imagePaths.join()}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <StyledButton type="primary" htmlType="submit" loading={addPostLoading}>
          트윗
        </StyledButton>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <ImagePreviewWrapper key={v}>
            <ImagePreview src={`${backUrl}/${v}`} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </ImagePreviewWrapper>
        ))}
      </div>
    </StyledForm>
  );
};

export default PostForm;
