import { all, fork, put, call, delay, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// LOGIN
function logInAPI(payload) {
  return axios.post('/api/login', payload);
}
function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.payload);
    yield delay(1000);
    yield put({
      type: 'LOG_IN_SUCCESS',
      payload: action.payload,
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      payload: err.response.data,
    });
  }
}
function* watchLogIn() {
  yield takeLatest('LOG_IN_REQUEST', logIn);
}

// LOGOUT
function logOutAPI() {
  return axios.post('/api/login');
}
function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: 'LOG_OUT_SUCCESS',
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      payload: err.response.data,
    });
  }
}
function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
