import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import Swal from 'sweetalert2';

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("userdata")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    Swal.fire({
      icon: 'success',
      title: 'Logged out successfully!',
      showConfirmButton: false,
      timer: 2000
    });
  };

  useEffect(() => {
    localStorage.setItem("userdata", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
