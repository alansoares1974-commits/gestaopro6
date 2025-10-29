import { createContext, useState, useEffect, ReactNode, useContext } from "react";

export type Permission = 
  | 'dashboard' 
  | 'products' 
  | 'sales' 
  | 'reports' 
  | 'customers' 
  | 'materials' 
  | 'services' 
  | 'expenses' 
  | 'production' 
  | 'marketplace-orders' 
  | 'suppliers' 
  | 'employees' 
  | 'invoices' 
  | 'assets';

interface User {
  username: string;
  role: 'admin' | 'user';
  permissions?: Permission[];
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: Permission) => boolean;
  changePassword: (username: string, newPassword: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FAKE_USER: User = {
  username: 'admin',
  role: 'admin',
  permissions: []
};


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('current_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Se o usuário estiver logado, garante que o localStorage esteja atualizado
    if (user) {
      localStorage.setItem('current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('current_user');
    }
  }, [user]);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Lógica de autenticação local: admin/suporte@1
    if (username === 'admin' && password === 'suporte@1') {
      const authenticatedUser: User = { username: 'admin', role: 'admin', permissions: [] };
      setUser(authenticatedUser);
      // O useEffect cuidará de salvar no localStorage
      return true;
    }
    return false;
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.permissions?.includes(permission) || false;
  };

  const changePassword = (username: string, newPassword: string): boolean => {
    const users = JSON.parse(localStorage.getItem('app_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.username === username);
    
    if (userIndex === -1) return false;
    
    users[userIndex].password = newPassword;
    localStorage.setItem('app_users', JSON.stringify(users));
    
    // Se for o usuário atual, atualizar a sessão
    if (user?.username === username) {
      const userData = { ...user };
      localStorage.setItem('current_user', JSON.stringify(userData));
    }
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('current_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, hasPermission, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}