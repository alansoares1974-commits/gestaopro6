import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SoundAlertProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              
              
              <Route path="/" element={<Layout><Dashboard /></Layout>} />
                          
              <Route path="/sales" element={<Layout><Sales /></Layout>} />
              <Route path="/reports" element={<Layout><Reports /></Layout>} />
              <Route path="/customers" element={<Layout><Customers /></Layout>} />
              <Route path="/materials" element={<Layout><Materials /></Layout>} />
              <Route path="/services" element={<Layout><Services /></Layout>} />
              <Route path="/expenses" element={<Layout><Expenses /></Layout>} />
              <Route path="/production" element={<Layout><Production /></Layout>} />
              <Route path="/production-display" element={<ProductionDisplay />} />
              <Route path="/monitor-display" element={<MonitorDisplay />} />
              <Route path="/products-to-restock" element={<ProductsToRestock />} />
              <Route path="/marketplace-orders" element={<Layout><MarketplaceOrders /></Layout>} />
              <Route path="/suppliers" element={<Layout><Suppliers /></Layout>} />
              <Route path="/employees" element={<Layout><Employees /></Layout>} />
              <Route path="/invoices" element={<Layout><Invoices /></Layout>} />
                     
              <Route path="/settings" element={<Layout><Settings /></Layout>} />
           
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SoundAlertProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
