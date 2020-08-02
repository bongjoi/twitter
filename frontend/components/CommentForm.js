import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useInput';

const FormItem = styled(Form.Item)`
  position: relative;
  margin: 0;
`;

const CommentButton = styled(Button)`
  position: absolute;
  bottom: -40px;
  right: 0;
  z-index: 1;
`;

const CommentForm = ({ postId }) => {
  const [commentText, onChangeCommentText] = useInput('');
  const id = useSelector((state) => state.user.me?.id);

  const onSubmitComment = useCallback(() => {
    console.log(postId, commentText);
  }, [commentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <FormItem>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <CommentButton type="primary" htmlType="submit">
          게시
        </CommentButton>
      </FormItem>
    </Form>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default CommentForm;
