import React from 'react';
import { useError } from '../contexts/ErrorContext';
import './ErrorToast.css';

const ErrorToast = () => {
  const { errors, removeError } = useError();

  if (errors.length === 0) return null;

  return (
    <div className="error-toast-container">
      {errors.map((error) => (
        <div
          key={error.id}
          className={`error-toast error-toast-${error.type}`}
          onClick={() => removeError(error.id)}
        >
          <div className="error-toast-content">
            <div className="error-toast-icon">
              {error.type === 'error' && '⚠️'}
              {error.type === 'warning' && '⚠️'}
              {error.type === 'info' && 'ℹ️'}
              {error.type === 'success' && '✅'}
            </div>
            <div className="error-toast-message">
              {error.message}
            </div>
            <button
              className="error-toast-close"
              onClick={(e) => {
                e.stopPropagation();
                removeError(error.id);
              }}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ErrorToast;
