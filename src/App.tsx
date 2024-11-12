import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useLanguageStore } from './store/languageStore';
import ErrorBoundary from './components/common/ErrorBoundary';
import NotificationCenter from './components/common/NotificationCenter';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AssetList from './components/assets/AssetList';
import WorkOrderList from './components/work-orders/WorkOrderList';
import InventoryList from './components/inventory/InventoryList';
import ReportList from './components/reports/ReportList';
import SecurityDashboard from './components/security/SecurityDashboard';
import EnvironmentalDashboard from './components/environmental/EnvironmentalDashboard';
import LocalContentDashboard from './components/local-content/LocalContentDashboard';
import ShipmentDashboard from './components/shipments/ShipmentDashboard';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // TODO: Implement actual auth check
  const isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { language } = useLanguageStore();
  const isRTL = language === 'ar';
  
  return (
    <div className={`flex min-h-screen bg-gray-100 ${isRTL ? 'rtl' : 'ltr'}`}>
      <Sidebar />
      <main className={`flex-1 ${isRTL ? 'mr-64' : 'ml-64'} p-8`}>
        {children}
      </main>
      <NotificationCenter />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/assets"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AssetList />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/work-orders"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <WorkOrderList />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InventoryList />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipments"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ShipmentDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/local-content"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <LocalContentDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ReportList />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/security"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SecurityDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/environmental"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <EnvironmentalDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}