import { all, fork, put, call, delay, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// ADD POST
function addPostAPI(payload) {
  return axios.post('/api/post', payload);
}
function* addPost(action) {
  try {
    // const result = call(addPostAPI, action.payload)
    yield delay(1000);
    yield put({
      type: 'ADD_POST_SUCCESS',
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      payload: err.response.data,
    });
  }
}
function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
