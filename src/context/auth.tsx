import React, { createContext, useContext } from "react";

import type { FC, ReactNode } from "react";

interface Auth {
  token: string;
}

const AuthContext = createContext({} as Auth);

export const useAuthContext = () => useContext(AuthContext);

interface Props {
  children?: ReactNode;
}

const AuthProvider: FC<Props> = ({ children }: Props) => {
  const value = {
    token: process.env.AUTH_TOKEN,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
