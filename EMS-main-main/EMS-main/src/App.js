import React from 'react';
import LoginForm from './components/LoginForm';
import './styles/global.css';
import './styles/LoginForm.css';
import './styles/admin.css'
import './styles/ErrorBoundary.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import FilterBar from './components/events/user/FilterBar';
import EventsPage from './components/events/user/EventsPage';
import EventDetails from './components/events/user/EventDetails';
import EventForm from './components/events/admin/EventForm';
import Navbar from './components/navbar';
import { CalendarIcon } from './components/Icons';
import Home from './components/home/HomePage';
import Footer from './components/home/Footer';
import { AdminLayout } from './components/dashboard/AdminLayout';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { AdminEvents } from './components/dashboard/AdminEvents';
import { AdminSettings } from './components/dashboard/AdminSettings';
import { AdminTasks } from './components/dashboard/AdminTasks';
import { AdminReports } from './components/dashboard/AdminPlaceholder';
import UserProfileView from './components/Users/UserProfileView';
import ErrorBoundary from './components/ErrorBoundary';
import { ErrorProvider } from './contexts/ErrorContext';
import ErrorToast from './components/ErrorToast';

function App() {
  return (
    <ErrorProvider>
      <ErrorBoundary>
        <Router>
          <AppContent />
        </Router>
        <ErrorToast />
      </ErrorBoundary>
    </ErrorProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = () => {
    return location.pathname.startsWith('/admin') && !location.pathname.includes('/login');
  };

  return (
    <>
     
      {!isAdminRoute() && <Navbar />}
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/EventsPage" element={<EventsPage />} />
            <Route path="/event/:id" element={<EventDetails />} />
            {/* <Route path="/admin" element={<LoginForm />} /> */}
            {/* <Route path="/addevent" element={<EventForm />} /> */}
            <Route path="/admin/login" element={<LoginForm adminOnly={true} />} />

            
            <Route
              path="/admin"
              element={
                (localStorage.getItem('role') && localStorage.getItem('role').toUpperCase() === 'ADMIN') ? (
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route
              path="/admin/events"
              element={
                (localStorage.getItem('role') && localStorage.getItem('role').toUpperCase() === 'ADMIN') ? (
                  <AdminLayout>
                    <AdminEvents />
                  </AdminLayout>
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route
              path="/admin/tasks"
              element={
                (localStorage.getItem('role') && localStorage.getItem('role').toUpperCase() === 'ADMIN') ? (
                  <AdminLayout>
                    <AdminTasks />
                  </AdminLayout>
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route
              path="/admin/settings"
              element={
                (localStorage.getItem('role') && localStorage.getItem('role').toUpperCase() === 'ADMIN') ? (
                  <AdminLayout>
                    <AdminSettings />
                  </AdminLayout>
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route
              path="/admin/reports"
              element={
                (localStorage.getItem('role') && localStorage.getItem('role').toUpperCase() === 'ADMIN') ? (
                  <AdminLayout>
                    <AdminReports />
                  </AdminLayout>
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route path="/userprofile" element={<UserProfileView />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {!isAdminRoute() && <Footer />}
    </>
  );
}

export default App;
