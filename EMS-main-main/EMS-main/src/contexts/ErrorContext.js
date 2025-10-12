import React, { createContext, useContext, useState, useCallback } from 'react';

const ErrorContext = createContext();

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);

  const addError = useCallback((error) => {
    const errorId = Date.now() + Math.random();
    const errorObj = {
      id: errorId,
      message: error.message || 'An unexpected error occurred',
      type: error.type || 'error',
      details: error.details || null,
      timestamp: new Date().toISOString(),
    };

    setErrors(prev => [...prev, errorObj]);

    // Auto-remove error after 5 seconds
    setTimeout(() => {
      removeError(errorId);
    }, 5000);

    return errorId;
  }, []);

  const removeError = useCallback((errorId) => {
    setErrors(prev => prev.filter(error => error.id !== errorId));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const handleApiError = useCallback((error, context = '') => {
    let message = 'Something went wrong';
    let type = 'error';

    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data;
      
      if (status === 401) {
        message = 'Please log in to continue';
        type = 'warning';
      } else if (status === 403) {
        message = 'You do not have permission to perform this action';
        type = 'warning';
      } else if (status === 404) {
        message = 'The requested resource was not found';
        type = 'info';
      } else if (status >= 500) {
        message = 'Server error. Please try again later';
        type = 'error';
      } else if (data && data.error) {
        message = data.error;
      } else if (data && data.message) {
        message = data.message;
      }
    } else if (error.request) {
      // Network error
      message = 'Network error. Please check your connection';
      type = 'error';
    } else {
      // Other error
      message = error.message || 'An unexpected error occurred';
    }

    if (context) {
      message = `${context}: ${message}`;
    }

    return addError({ message, type, details: error });
  }, [addError]);

  const value = {
    errors,
    addError,
    removeError,
    clearAllErrors,
    handleApiError,
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
};
