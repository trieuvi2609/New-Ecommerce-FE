import { UserShowData } from "@/types/interface";
import { createContext, useState, useContext } from "react";

interface AuthContextType {
  user: UserShowData | null;
  loginUser: (userData: UserShowData) => void;
  logoutUser: () => void;
}

const initialAuthContext: AuthContextType = {
  user: null,
  loginUser: () => {},
  logoutUser: () => {},
};

const AppContext = createContext<AuthContextType>(
  initialAuthContext
);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserShowData | null>(null);
  const loginUser = (userData: UserShowData) => {
    // Your login logic here
    setUser(userData);
  };

  const logoutUser = () => {
    // Your logout logic here
    setUser(null);
  };
  return (
    <AppContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
