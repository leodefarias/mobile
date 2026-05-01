import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  clearStoredUser,
  getStoredTreatment,
  getStoredUser,
  setStoredTreatment,
  setStoredUser,
} from '@/services/authStorage';
import type { StoredUser, Treatment, User } from '@/types/user';

const HARDCODED_USERS: User[] = [
  {
    id: 1,
    username: 'admin',
    password: '123',
    role: 'admin',
    name: 'Administrador',
  },
  {
    id: 2,
    username: 'user',
    password: '123',
    role: 'user',
    name: 'Usuário Comum',
  },
];

interface AuthContextType {
  user: StoredUser | null;
  treatment: Treatment;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  changeTreatment: (next: Treatment) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [treatment, setTreatment] = useState<Treatment>('Sr.');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    Promise.all([getStoredUser(), getStoredTreatment()]).then(
      ([storedUser, storedTreatment]) => {
        if (!active) {
          return;
        }

        setUser(storedUser);

        if (storedTreatment) {
          setTreatment(storedTreatment);
        }

        setLoading(false);
      }
    );

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      const found = HARDCODED_USERS.find(
        (item) => item.username === username && item.password === password
      );

      if (!found) {
        return false;
      }

      const stored: StoredUser = {
        id: found.id,
        username: found.username,
        role: found.role,
        name: found.name,
      };

      await setStoredUser(stored);
      setUser(stored);
      return true;
    },
    []
  );

  const logout = useCallback(async () => {
    await clearStoredUser();
    setUser(null);
  }, []);

  const changeTreatment = useCallback(async (next: Treatment) => {
    await setStoredTreatment(next);
    setTreatment(next);
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({ user, treatment, loading, login, logout, changeTreatment }),
    [user, treatment, loading, login, logout, changeTreatment]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }

  return context;
}
