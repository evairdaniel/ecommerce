import { Toaster } from "@/components/ui/sonner";
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AuthContextType } from "../interfaces/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: any) => {
  const [token, setToken_] = useState<string | null>(localStorage.getItem("token"));

  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);


  const setToken = (newToken: string | null) => {
    if (newToken) {
      const expirationTime = 600000;
      const expirationDate = new Date().getTime() + expirationTime;

      localStorage.setItem("token", newToken);
      localStorage.setItem("tokenExpiration", expirationDate.toString());

      setTokenExpiration(expirationDate);

    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      setTokenExpiration(null);
    }

    setToken_(newToken);
  };

  useEffect(() => {

    const storedTokenExpiration = localStorage.getItem("tokenExpiration");

    if (storedTokenExpiration) {
      const expirationTime = parseInt(storedTokenExpiration, 10);
      const currentTime = new Date().getTime();


      if (currentTime > expirationTime) {
        setToken(null);
      } else {
        setTokenExpiration(expirationTime);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);


  const contextValue = useMemo(() => ({ token, setToken }), [token]);

  return (
    <AuthContext.Provider value={contextValue}>{children}
      <Toaster richColors theme="light" toastOptions={{}} position="top-center" />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


export default AuthProvider;