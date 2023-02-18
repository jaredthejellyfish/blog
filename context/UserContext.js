import pb from "@/lib/pocketbase";

const userInitialState = {
  email: "",
  id: "",
  username: "",
  verified: false,
  avatar_url: ""
};

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const usePocketbaseAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(userInitialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (typeof pb !== "undefined" && typeof pb.authStore !== "undefined") {
        const isValid = pb.authStore.isValid;
        setIsAuth(isValid);

        if (isValid) {
            setUser({
              id: pb.authStore.model.id,
              email: pb.authStore.model.email,
              username: pb.authStore.model.username,
              verified: pb.authStore.model.verified,
            });
            setIsLoading(false);

        }
      }
    };

    checkAuth();

    const removeListener = pb.authStore.onChange((token, model) => {
      checkAuth();
    });

    return () => removeListener();
  }, []);

  return { isAuth, user };
};

const AuthProvider = ({ children }) => {
  const { isAuth, user, isLoading } = usePocketbaseAuth();

  return (
    <AuthContext.Provider value={{ isAuth, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
