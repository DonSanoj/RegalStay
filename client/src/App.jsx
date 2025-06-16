import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ReceptionistDashboard from './pages/Receptionist/ReceptionistDashboard'
import HomePage from './pages/HomePage'
import CustomerDashboard from './pages/Customer/CustomerDashboard'
import HousekeeperDashboard from './pages/Housekeeping/HousekeeperDashboard'
import ManagerDashboard from './pages/Manager/ManagerDashboard'
import AdminDashboard from './pages/Admin/AdminDashboard'
import NotFound from './pages/NotFound'
import MainLayout from './components/layout/MainLayout'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import StaffLogin from './pages/auth/StaffLogin'
import { useAuthStore } from './store/authStore'
import { AuthenticatedUser } from './components/AuthenticatedUser'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLogin from './pages/auth/AdminLogin'
import AdminProtectedRoute from './components/AdminProtectedRoute'

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error('Initial auth check failed:', error);
      }
    };

    initializeAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full inline-block mb-4"></div>
          <p className='text-white'>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path='/'
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />

      {/* Auth Pages - Only accessible when not authenticated */}
      <Route
        path='/auth/login'
        element={
          <AuthenticatedUser>
            <MainLayout>
              <Login />
            </MainLayout>
          </AuthenticatedUser>
        }
      />
      <Route
        path='/auth/signup'
        element={
          <AuthenticatedUser>
            <MainLayout>
              <Signup />
            </MainLayout>
          </AuthenticatedUser>
        }
      />

      {/* Staff Login - Separate authentication for staff */}
      <Route
        path='/secure-auth/staff-login'
        element={
          <StaffLogin />
        }
      />

      <Route
        path='/secure-auth/admin-login'
        element={
          <AdminLogin />
        }
      />

      {/* Protected Customer Routes with Dynamic URL */}
      <Route
        path='/customer/:customerId/:email'
        element={
          <ProtectedRoute requiredRole="CUSTOMER">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Staff Routes */}
      <Route
        path='/housekeeper'
        element={
          <ProtectedRoute requiredRole="HOUSEKEEPER">
            <HousekeeperDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path='/receptionist'
        element={
          <ProtectedRoute requiredRole="RECEPTIONIST">
            <ReceptionistDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path='/manager'
        element={
          <ProtectedRoute requiredRole="MANAGER">
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Admin Routes with Dynamic URL */}
      <Route
        path='/admin/:adminId/:email'
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
