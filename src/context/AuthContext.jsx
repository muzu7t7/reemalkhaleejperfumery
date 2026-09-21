import { createContext, useCallback, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem('rk.user'));
  } catch {
    return null;
  }
};

/*
 * Demo-only auth: there is no backend, so a "session" is just a name and email
 * kept in this browser. Passwords are never read or stored.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);

  const login = useCallback(({ name, email }) => {
    const next = { name, email };
    setUser(next);
    try {
      localStorage.setItem('rk.user', JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem('rk.user');
    } catch {
      /* ignore */
    }
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
