  import React, { createContext, useContext, useReducer } from "react";
  const url = `${process.env.REACT_APP_API_URL}/login` || "http://localhost:3001/login";

  const AuthContext = createContext();

  const initialState = {
    user: null,
    error: null,
    loading: false,
  };

  const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        console.log(action.type);
        return { ...state, user: action.payload, error: null, loading: false };
      case "LOGOUT":
        return { ...state, user: null, error: null, loading: false };
      case "ERROR":
        return { ...state, error: action.payload, loading: false };
      case "LOADING":
        return { ...state, loading: true };
      default:
        return state;
    }
  };

  const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async (user_id, user_passkey) => {
      dispatch({ type: "LOADING" });

      try {
        const response = await fetch(`${url}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id, user_passkey }),
        });

        console.log("Made it this far!")

        if (response.ok) {
          const data = await response.json();
          console.log("Made it this far2!")
          localStorage.setItem("authToken", data.token);
          console.log("Made it this far!3")
          dispatch({ type: "LOGIN", payload: user_id });
        } else {
          const errorData = await response.json();
          dispatch({ type: "ERROR", payload: errorData.error });
        }
      } catch (error) {
        dispatch({ type: "ERROR", payload: "An error occurred" });
      }
    };

    const logout = () => {
      dispatch({ type: "LOGOUT" });
    };

    return (
      <AuthContext.Provider value={{ state, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

  const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };

  export { AuthProvider, useAuth };
