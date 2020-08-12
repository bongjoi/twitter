import React, { useCallback, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { addPostAction } from '../reducers/post';
import useInput from '../hooks/useInput';

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
    dispatch(addPostAction(text));
  }, [text]);

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
        <StyledButton type="primary" htmlType="submit" loading={addPostLoading}>
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