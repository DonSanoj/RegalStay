import { useState } from 'react'
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
import AdminLogin from './pages/auth/AdminLogin'

function App() {

  return (
    <>
      <Routes>

        <Route
          path='*'
          element={
            <NotFound />
          }
        />

        <Route
          path='/'
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        {/* Auth Pages */}
        <Route
          path='/auth/login'
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />
        <Route
          path='/auth/signup'
          element={
            <MainLayout>
              <Signup />
            </MainLayout>
          }
        />

        <Route
          path='/secure-auth/admin-login'
          element={
            <AdminLogin />
          }
        />

        {/* Dashboard Routes */}
        <Route
          path='/customer'
          element={
            <CustomerDashboard />
          }
        />

        <Route
          path='/housekeeper'
          element={
            <HousekeeperDashboard />
          }
        />

        <Route
          path='/receptionist'
          element={
            <ReceptionistDashboard />
          }
        />

        <Route
          path='/manager'
          element={
            <ManagerDashboard />
          }
        />

        <Route
          path='/admin'
          element={
            <AdminDashboard />
          }
        />

      </Routes>
    </>
  )
}

export default App
