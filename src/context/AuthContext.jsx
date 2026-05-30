/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/config';

export const AuthContext = createContext();

const LOCAL_USERS_KEY = 'aether_local_users';
const LOCAL_USER_KEY = 'aether_auth_user';

const getFallbackUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '{}');
  } catch {
    return {};
  }
};

const setFallbackUsers = (users) => {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
};

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_USER_KEY) || 'null');
  } catch {
    return null;
  }
};

const storeUser = (user) => {
  localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
};

const removeStoredUser = () => {
  localStorage.removeItem(LOCAL_USER_KEY);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => (isFirebaseConfigured ? null : getStoredUser()));
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(
        firebaseUser
          ? {
              email: firebaseUser.email,
              uid: firebaseUser.uid,
            }
          : null
      );
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email, password) => {
    setAuthError(null);
    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos.');
    }

    if (isFirebaseConfigured) {
      try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        const currentUser = {
          email: credentials.user.email,
          uid: credentials.user.uid,
        };
        setUser(currentUser);
        return currentUser;
      } catch (error) {
        setAuthError(error.message);
        throw error;
      }
    }

    const users = getFallbackUsers();
    if (users[email]) {
      const error = new Error('El usuario ya existe.');
      setAuthError(error.message);
      throw error;
    }

    users[email] = password;
    setFallbackUsers(users);
    const fallbackUser = { email };
    setUser(fallbackUser);
    storeUser(fallbackUser);
    return fallbackUser;
  };

  const login = async (email, password) => {
    setAuthError(null);
    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos.');
    }

    if (isFirebaseConfigured) {
      try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        const currentUser = {
          email: credentials.user.email,
          uid: credentials.user.uid,
        };
        setUser(currentUser);
        return currentUser;
      } catch (error) {
        setAuthError(error.message);
        throw error;
      }
    }

    const users = getFallbackUsers();
    if (users[email] !== password) {
      const error = new Error('Credenciales incorrectas.');
      setAuthError(error.message);
      throw error;
    }

    const fallbackUser = { email };
    setUser(fallbackUser);
    storeUser(fallbackUser);
    return fallbackUser;
  };

  const logout = async () => {
    setAuthError(null);
    if (isFirebaseConfigured) {
      await signOut(auth);
    } else {
      removeStoredUser();
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        register,
        login,
        logout,
        setAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};