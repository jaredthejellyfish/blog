import pb from "@/lib/pocketbase";
import React, { createContext, useContext, useEffect, useState } from "react";

const userInitialState = {
  avatarURL: null,
  bio: null,
  created: null,
  email: null,
  id: null,
  username: null,
  verified: null,
};

const AuthContext = createContext();

const usePocketbaseAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(userInitialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const record = await pb.collection("users").getOne(pb.authStore.model.id);
      return record;
    };

    const checkAuth = async () => {
      if (typeof pb !== "undefined" && typeof pb.authStore !== "undefined") {
        const isValid = pb.authStore.isValid;
        setIsAuth(isValid);

        if (isValid) {
          getProfile().then((record) => {
            setUser({
              avatarURL: pb.getFileUrl(record, record.avatar),
              bio: record.bio,
              created: record.created,
              email: record.email,
              id: record.id,
              username: record.username,
              verified: record.verified,
            });
            setError(false);
          }).catch((e) => {
            setError(true);
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

  return { isAuth, user, isLoading, isError };
};

const AuthProvider = ({ children }) => {
  const { isAuth, user, isLoading, isError } = usePocketbaseAuth();

  return (
    <AuthContext.Provider value={{ isAuth, user, isLoading, isError }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
