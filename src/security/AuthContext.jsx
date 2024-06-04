import { createContext, useContext, useState } from "react";
import {
  executeBasicAuthenticationService,
  executeJwtAuthenticationService,
} from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

//1:Create a context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//2:Put some state in the context

//3:Share the created context with other components

export default function AuthProvider({ children }) {
  /* put some state in the context */

  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);

  const [token, setToken] = useState(null);

  /* function login(username, password) {
    if (username === "soumiksen2003" && password === "dummy") {
      setAuthenticated(true);
      console.log(username);
      setUsername(username);
      return true;
    } else {
      setAuthenticated(false);
      setUsername(null);
      return false;
    }
  } */

  /* async function login(username, password) {
    //btoa -> function to do base 64 encoding
    const baToken = "Basic " + window.btoa(username + ":" + password);

    try {
      const response = await executeBasicAuthenticationService(baToken);

      if (response.status == 200) {
        setAuthenticated(true);
        console.log(username);
        setUsername(username);
        setToken(baToken);

        apiClient.interceptors.request.use((config) => {
          console.log("Intercepting and adding a token");
          config.headers.Authorization = baToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  } */

  async function login(username, password) {
    //btoa -> function to do base 64 encoding
    //const baToken = "Basic " + window.btoa(username + ":" + password);

    try {
      const response = await executeJwtAuthenticationService(
        username,
        password
      );

      if (response.status == 200) {
        const jwtToken = "Bearer " + response.data.token;
        setAuthenticated(true);
        console.log(username);
        setUsername(username);
        setToken(jwtToken);

        apiClient.interceptors.request.use((config) => {
          console.log("Intercepting and adding a token");
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setUsername(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
