import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SoundAlertProvider } from "./contexts/SoundAlertContext";


import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import Customers from "./pages/Customers";
import Materials from "./pages/Materials";
import Services from "./pages/Services";
import Expenses from "./pages/Expenses";
import Production from "./pages/Production";
import ProductionDisplay from "./pages/ProductionDisplay";
import MonitorDisplay from "./pages/MonitorDisplay";
import ProductsToRestock from "./pages/ProductsToRestock";
import MarketplaceOrders from "./pages/MarketplaceOrders";
import Suppliers from "./pages/Suppliers";
import Employees from "./pages/Employees";
import Invoices from "./pages/Invoices";
import Assets from "./pages/Assets";
import UserManagement from "./pages/UserManagement";

import CashManagement from "./pages/CashManagement";


import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
    <Route path="/products" element={<PrivateRoute><Layout><Products /></Layout></PrivateRoute>} />
    <Route path="/sales" element={<PrivateRoute><Layout><Sales /></Layout></PrivateRoute>} />
    <Route path="/reports" element={<PrivateRoute><Layout><Reports /></Layout></PrivateRoute>} />
    <Route path="/customers" element={<PrivateRoute><Layout><Customers /></Layout></PrivateRoute>} />
    <Route path="/materials" element={<PrivateRoute><Layout><Materials /></Layout></PrivateRoute>} />
    <Route path="/services" element={<PrivateRoute><Layout><Services /></Layout></PrivateRoute>} />
    <Route path="/expenses" element={<PrivateRoute><Layout><Expenses /></Layout></PrivateRoute>} />
    <Route path="/production" element={<PrivateRoute><Layout><Production /></Layout></PrivateRoute>} />
    <Route path="/production-display" element={<PrivateRoute><ProductionDisplay /></PrivateRoute>} />
    <Route path="/monitor-display" element={<PrivateRoute><MonitorDisplay /></PrivateRoute>} />
    <Route path="/products-to-restock" element={<PrivateRoute><ProductsToRestock /></PrivateRoute>} />
    <Route path="/marketplace-orders" element={<PrivateRoute><Layout><MarketplaceOrders /></Layout></PrivateRoute>} />
    <Route path="/suppliers" element={<PrivateRoute><Layout><Suppliers /></Layout></PrivateRoute>} />
    <Route path="/employees" element={<PrivateRoute><Layout><Employees /></Layout></PrivateRoute>} />
    <Route path="/invoices" element={<PrivateRoute><Layout><Invoices /></Layout></PrivateRoute>} />
    <Route path="/assets" element={<PrivateRoute><Layout><Assets /></Layout></PrivateRoute>} />
    <Route path="/cash-management" element={<PrivateRoute><Layout><CashManagement /></Layout></PrivateRoute>} />
    <Route path="/settings" element={<PrivateRoute><Layout><Settings /></Layout></PrivateRoute>} />
    <Route path="/user-management" element={<PrivateRoute><Layout><UserManagement /></Layout></PrivateRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SoundAlertProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <AppRoutes />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SoundAlertProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
