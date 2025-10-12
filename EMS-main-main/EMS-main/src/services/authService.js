
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/auth';


async function apiCall(endpoint, data = null, method = 'POST') {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    });

    const result = await response.json();
    
    if (!response.ok) {
      // Create error object for consistent handling
      const error = new Error(result.error || result.message || 'Something went wrong');
      error.response = { status: response.status, data: result };
      throw error;
    }
    
    return {
      success: true,
      data: result,
      error: null
    };
  } catch (error) {
    // Re-throw to be handled by error boundary or error handler
    throw error;
  }
}

// Auth functions
export const loginUser = async (email, password, role) => {
  return apiCall('/login', {
    Email: email,
    Password: password,
    Role: role.toUpperCase()
  });
};

export const registerUser = async (name, email, password, role) => {
  return apiCall('/register', {
    FullName: name,
    Email: email,
    Password: password,
    Role: role.toUpperCase()
  });
};

export const logoutUser = async () => {
  return apiCall('/logout', null, 'GET');
};
