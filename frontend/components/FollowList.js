import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user';

const ListWrapper = styled(List)`
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin: 10px 0;
`;

const ListItem = styled(List.Item)`
  margin-top: 20px;
`;

const FollowList = ({ header, data }) => {
  const dispatch = useDispatch();

  const onCancel = useCallback(
    (id) => () => {
      if (header === '팔로잉') {
        dispatch({
          type: UNFOLLOW_REQUEST,
          data: id,
        });
      } else {
        dispatch({
          type: REMOVE_FOLLOWER_REQUEST,
          data: id,
        });
      }
    },
    [],
  );

  return (
    <ListWrapper
      header={<div>{header}</div>}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      loadMore={
        <ButtonWrapper>
          <Button>더 보기</Button>
        </ButtonWrapper>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <ListItem>
          <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </ListItem>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
