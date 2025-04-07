import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  login: () => Promise.reject("AuthContext not initialized"),
  signup: () => Promise.reject("AuthContext not initialized"),
  logout: () => Promise.reject("AuthContext not initialized")
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Sign in with email and password
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => userCredential.user);
  };

  // Create new user with email and password
  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => userCredential.user);
  };

  // Sign out
  const logout = () => {
    return signOut(auth);
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);