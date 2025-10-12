import { useCallback } from 'react';
import { useError } from '../contexts/ErrorContext';

export const useErrorHandler = () => {
  const { handleApiError, addError } = useError();

  const handleError = useCallback((error, context = '') => {
    // Log error for debugging
    console.error('Error caught:', error);

    // Handle different types of errors
    if (error.response || error.request) {
      // API error
      return handleApiError(error, context);
    } else if (error instanceof Error) {
      // JavaScript error
      return addError({
        message: error.message,
        type: 'error',
        details: error
      });
    } else if (typeof error === 'string') {
      // String error message
      return addError({
        message: error,
        type: 'error'
      });
    } else {
      // Unknown error type
      return addError({
        message: 'An unexpected error occurred',
        type: 'error',
        details: error
      });
    }
  }, [handleApiError, addError]);

  const handleSuccess = useCallback((message) => {
    return addError({
      message,
      type: 'success'
    });
  }, [addError]);

  const handleWarning = useCallback((message) => {
    return addError({
      message,
      type: 'warning'
    });
  }, [addError]);

  const handleInfo = useCallback((message) => {
    return addError({
      message,
      type: 'info'
    });
  }, [addError]);

  return {
    handleError,
    handleSuccess,
    handleWarning,
    handleInfo,
  };
};
