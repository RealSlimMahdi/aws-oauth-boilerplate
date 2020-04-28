const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, loading: false, isAuthenticated: true, user: action.payload };
    case "SIGNOUT_USER":
      return { ...state, user: null, loading: false };
    case "AUTH_ERROR":
      return { ...state, user: null, errors: action.payload };
    case "LOADING":
      return { ...state, loading: true };
    case "NOT_LOADING":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default userReducer;
