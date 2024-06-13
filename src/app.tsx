import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import type { FC } from "react";

import AuthProvider from "@context/auth";
import router from "@app/router";

import "normalize.css";
import "./theme";

const App: FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
