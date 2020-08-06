export const initialState = {
  isLoggedIn: false,
  isLoggingIn: false,
  isLoggingOut: false,
  me: null,
  signUpData: {},
  loginData: {},
};

export const loginRequestAction = (payload) => ({
  type: 'LOG_IN_REQUEST',
  payload,
});

export const logoutRequestAction = () => ({
  type: 'LOG_OUT_REQUEST',
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN_REQUEST':
      return {
        ...state,
        isLoggingIn: true,
      };
    case 'LOG_IN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        me: { ...action.payload, nickname: 'bongjoi' },
        isLoggingIn: false,
      };
    case 'LOG_IN_FAILURE':
      return {
        ...state,
        isLoggingIn: false,
      };
    case 'LOG_OUT_REQUEST':
      return {
        ...state,
        isLoggingOut: true,
      };
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        isLoggedIn: false,
        me: null,
        isLoggingOut: false,
      };
    case 'LOG_OUT_FAILURE':
      return {
        ...state,
        isLoggingOut: false,
      };
    default:
      return state;
  }
};

export default userReducer;
