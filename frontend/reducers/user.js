export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

export const loginAction = (payload) => ({
  type: 'LOG_IN',
  payload,
});

export const logoutAction = () => ({
  type: 'LOG_OUT',
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn: true,
        me: action.payload,
      };
    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};

export default userReducer;
