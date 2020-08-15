import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const FormWrapper = styled(Form)`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #d9d9d9;
`;

const NicknameEditForm = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <FormWrapper>
      <Input.Search
        addonBefore="닉네임"
        enterButton="수정"
        value={nickname}
        onChange={onChangeNickname}
        onSearch={onSubmit}
      />
    </FormWrapper>
  );
};

export default NicknameEditForm;
