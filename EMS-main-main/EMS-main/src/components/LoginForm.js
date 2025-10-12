import React, { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import { MailIcon, GoogleIcon, AppleIcon } from './Icons';
import Input from './ui/Input';
import PasswordInput from './ui/PasswordInput';
import Button from './ui/Button';
import TabSwitcher from './ui/TabSwitcher';
import { validateForm } from '../utils/validation';
import { loginUser, registerUser, logoutUser } from '../services/authService';
import Modal from './ui/Modal';
import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from '../hooks/useErrorHandler';

function LoginForm({ onSuccess, adminOnly = false }) {
  const navigate = useNavigate();
  const { handleError, handleSuccess } = useErrorHandler();
  const [activeTab, setActiveTab] = useState('signIn');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, title: '', message: '' });
  // Always set role to CUSTOMER for user login/signup
  const [role] = useState(adminOnly ? 'ADMIN' : 'CUSTOMER');

  const validate = useCallback(
    (values) => validateForm(values, activeTab),
    [activeTab]
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: async (values, { setErrors, resetForm, setSubmitting }) => {
      setLoading(true);
      setSubmitting(true);

      try {
        let response;
        if (activeTab === 'signIn' || adminOnly) {
          response = await loginUser(values.email, values.password, role);
        } else {
          response = await registerUser(values.name, values.email, values.password, role);
        }

        // Success handling
        setModal({
          open: true,
          title: `${activeTab === 'signIn' || adminOnly ? 'Sign In Successful' : 'Registration Successful'}`,
          message: `${activeTab === 'signIn' || adminOnly ? 'You have signed in' : 'You have registered'} successfully as ${role}.`,
        });
        resetForm();

        // Show success toast
        handleSuccess(`${activeTab === 'signIn' || adminOnly ? 'Signed in' : 'Registered'} successfully!`);

        // Persist role and user data for routing
        if (activeTab === 'signIn' || adminOnly) {
          try {
            const payload = response.data || {};
            // Support different casing/structures from backend
            const roleFromServer = (payload.Role || payload.role || payload.RoleName || '').toString();
            const roleToStore = roleFromServer ? roleFromServer.toUpperCase() : role.toUpperCase();

            // If adminOnly is required but server did not return ADMIN, show error and don't redirect
            if (adminOnly && roleToStore !== 'ADMIN') {
              handleError('Account is not an admin.', 'Access Denied');
              setLoading(false);
              setSubmitting(false);
              return;
            }

            localStorage.setItem('role', roleToStore);
            if (payload) localStorage.setItem('user', JSON.stringify(payload));
          } catch (e) {
            // ignore storage errors
          }

          const handledByParent = typeof onSuccess === 'function';
          if (handledByParent) {
            onSuccess(response);
          }

          // Redirect based on stored role
          const storedRole = (localStorage.getItem('role') || role).toString().toUpperCase();
          if (storedRole === 'ADMIN' || storedRole === 'EVENT_MANAGER') {
            navigate('/admin', { replace: true });
          } else {
            navigate('/userprofile', { replace: true });
          }
        }
        // No auto-login after signup
      } catch (error) {
        handleError(error, 'Authentication failed');
        setErrors({ password: 'Authentication failed' });
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  const handleTabChange = (newTab) => setActiveTab(newTab);

  const handleSignOut = async () => {
    try {
      await logoutUser();
      // clear stored role/user
      try {
        localStorage.removeItem('role');
        localStorage.removeItem('user');
      } catch (e) {}
      setModal({
        open: true,
        title: 'Signed Out',
        message: 'Signed out successfully.',
      });
      handleSuccess('Signed out successfully');
      // navigate to home after sign out
      navigate('/');
    } catch (error) {
      handleError(error, 'Sign out failed');
      setModal({ open: true, title: 'Network Error', message: 'Network error during sign out.' });
    }
  };

  return (
    <div className="auth-card">
      <Modal
        isOpen={modal.open}
        title={modal.title}
        onClose={() => setModal({ ...modal, open: false })}
        hideHeader
      >
        <div style={{ padding: '1rem', textAlign: 'center' }}>{modal.message}</div>
      </Modal>
      {/* Only show tab switcher if not adminOnly */}
      {!adminOnly && (
        <TabSwitcher activeTab={activeTab} onTabChange={handleTabChange} disabled={loading} />
      )}

      <div className="form-container">
        <h3>{adminOnly ? 'Admin Login' : activeTab === 'signIn' ? 'Sign in to your account' : 'Create a new account'}</h3>
        <p className="form-intro">
          {adminOnly
            ? 'Enter your admin credentials to access the admin dashboard.'
            : activeTab === 'signIn'
            ? 'Enter your email and password to access your account'
            : 'Get started by creating your account'}
        </p>

        {/* No role selector for user login/signup */}

        <form onSubmit={formik.handleSubmit} noValidate>
          {/* Name field only for signUp and not adminOnly */}
          {!adminOnly && activeTab === 'signUp' && (
            <Input
              id="name"
              name="name"
              label="Name"
              placeholder="John Doe"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.name}
              touched={formik.touched.name}
              disabled={loading}
              required
            />
          )}

          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="john@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
            icon={<MailIcon />}
            disabled={loading}
            required
          />

          <PasswordInput
            id="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
            disabled={loading}
            required
          />

          {/* Confirm password only for signUp and not adminOnly */}
          {!adminOnly && activeTab === 'signUp' && (
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.confirmPassword}
              touched={formik.touched.confirmPassword}
              disabled={loading}
              required
            />
          )}

          {/* Forgot password only for signIn and not adminOnly */}
          {!adminOnly && activeTab === 'signIn' && (
            <div className="form-options">
              <button
                type="button"
                className="forgot-password"
                onClick={() => setModal({ open: true, title: 'Coming Soon', message: 'Forgot password functionality not implemented yet.' })}
                disabled={loading}
              >
                Forgot password?
              </button>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="full"
            loading={loading}
            disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}
          >
            {adminOnly ? 'Sign In' : activeTab === 'signIn' ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>

        {/* Sign out demo button only for user login, not adminOnly */}
        {!adminOnly && (
          <div style={{ marginTop: 10 }}>
            <Button type="button" variant="ghost" onClick={handleSignOut} disabled={loading}>
              Sign Out (demo)
            </Button>
          </div>
        )}

        {/* Social logins only for user login, not adminOnly */}
        {!adminOnly && (
          <>
            <div className="separator">
              <span>OR CONTINUE WITH</span>
            </div>
            <div className="social-logins">
              <button className="btn-social" type="button" disabled={loading}>
                <GoogleIcon />
                <span>Google</span>
              </button>
              <button className="btn-social" type="button" disabled={loading}>
                <AppleIcon />
                <span>Apple</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
