import { all, fork, take, call, put } from 'redux-saga/effects';
import axios from 'axios';

function logInAPI(payload) {
  return axios.post('/api/login', payload);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.payload);
    yield put({
      type: 'LOG_IN_SUCCESS',
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      payload: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield take('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
  yield take('LOG_OUT_REQUEST');
}

function* watchAddPost() {
  yield take('ADD_POST_REQUEST');
}

function* rootSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchAddPost)]);
}

export default rootSaga;
