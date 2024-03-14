import React, { useState, useEffect } from "react";
import axios from "axios";

// Initializing Context
const AuthContext = React.createContext();

const API_URL = "https://project-3-backend-h5nr.onrender.com"

function AuthProviderWrapper(props) {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* Save the Login's JWT Token in our Browser' Storage */
  const saveToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  /* Function that authenticates the user --> verifies if the token is a valid one. */
  const authenticateUser = () => {
    setIsLoading(true);
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUser(response.data);
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch(()=>{
          setUser(null);
          setIsLoggedIn(false);
          setIsLoading(false);
        })
    }
    else {
        setUser(null);
        setIsLoggedIn(false);
        setIsLoading(false);
    }
  };

  const removeToken = () =>{
    localStorage.removeItem("authToken");
  }

  const logOut = () =>{
    removeToken();
    authenticateUser();
    setIsLoggedIn(false);
  }

   useEffect(() => {
     authenticateUser();
   }, []);

    

  return(
    <AuthContext.Provider value={{isLoggedIn, isLoading, user, saveToken, authenticateUser, logOut}}>
        {props.children}
    </AuthContext.Provider>
  )
}


export {AuthProviderWrapper, AuthContext};