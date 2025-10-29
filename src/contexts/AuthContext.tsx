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

const DEFAULT_USERS = []; // Remove a inicialização de usuários no frontend, pois o backend cuida disso

export function AuthProvider({ children }: { children: ReactNode }) {
  // Inicializa o usuário como o FAKE_USER para ignorar o login
  const [user, setUser] = useState<User | null>(FAKE_USER);

  // Remove o useEffect de inicialização para evitar conflitos com o login forçado
  useEffect(() => {
    // Força o usuário a ser o FAKE_USER e armazena no localStorage
    setUser(FAKE_USER);
    localStorage.setItem('current_user', JSON.stringify(FAKE_USER));
  }, []);

// A função de login é mantida, mas não será mais usada.
  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulação de sucesso para evitar erros no código que chama login
    return true;
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