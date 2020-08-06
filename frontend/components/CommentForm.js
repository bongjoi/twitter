import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { addCommentAction } from '../reducers/post';

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

const CommentForm = ({ post }) => {
  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    setCommentText('');
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    if (commentText) {
      dispatch(addCommentAction({ content: commentText, postId: post.id, userId: id }));
    }
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmitComment}>
      <FormItem>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <CommentButton type="primary" htmlType="submit" loading={addCommentLoading}>
          게시
        </CommentButton>
      </FormItem>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
