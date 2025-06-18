import { createContext } from "react";

const AuthContext = createContext();

export const AuthContextProvider = () => {
  let firstName = "John";
  let lastName = "Doe";
  let password = "password123";

  const login = () => {};
  const register = () => {};

  const data = {
    firstName,
    lastName,
    password,
  };

  return (
    <AuthContext.Provider
      value={{
        firstName,
        lastName,
        password,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
