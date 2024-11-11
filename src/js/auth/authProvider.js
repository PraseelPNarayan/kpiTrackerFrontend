import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [user, setToken_] = useState(localStorage.getItem("token"));

let userParsed = JSON.parse(user)



  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
 
    if (user) {
      let token = userParsed.token
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',user);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [user]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      userParsed,
      setToken,
    }),
    [userParsed]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;