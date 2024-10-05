import { useContext, useState, useEffect, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoding] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = (userInfo) => {
    // console.log("userInfoSession", userInfo);
    setLoding(true);
    try {
      userInfo && setUser(true);
    } catch (error) {
      console.log("error", error);
    }
    setLoding(false);
  };

  const logoutUser = () => {
    const logout = localStorage.removeItem("loginToken");

    logout ? setUser(true) : setUser(false);
  };
  const registerUser = (userInfo) => {};

  const checkUserStatus = () => {
    const isLogin = localStorage.getItem("loginToken");
    try {
      isLogin ? setUser(true) : setUser(false);
    } catch (error) {
      console.log("error", error);
    }
    setLoding(false);
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    checkUserStatus,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
