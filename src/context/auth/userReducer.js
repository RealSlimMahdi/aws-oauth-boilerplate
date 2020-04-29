const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "SIGNOUT_USER":
      return { ...state, isAuthenticated: false, user: null };
    case "AUTH_ERROR":
      return { ...state, errors: action.payload };
    case "LOADING":
      return { ...state, loading: true };
    case "NOT_LOADING":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default userReducer;
