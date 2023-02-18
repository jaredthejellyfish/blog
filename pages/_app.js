import "@/styles/globals.scss";

import Navbar from "@/components/Navbar";
import ApplicationContainer from "@/components/ApplicationContainer";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

import { AuthProvider } from "@/context/UserContext";

import React from "react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <ApplicationContainer>
            <Component {...pageProps} />
          </ApplicationContainer>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
