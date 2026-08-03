/**
 * API.JS - Backend Communication Layer
 * All API calls to the NestJS backend
 */

//  CONFIGURATION 

// we'll change to actual backend URL when it's ready
const API_BASE_URL = window.API_BASE_URL || 'http://localhost:5000/api';



// 1. AUTH TOKEN MANAGEMENT

function getToken() {
  return localStorage.getItem('token');
}

function setToken(token) {
  localStorage.setItem('token', token);
}

function getRole() {
  return localStorage.getItem('role');
}

function setRole(role) {
  localStorage.setItem('role', role);
}

function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('user');
  window.location.href = '/login.html';
}


// 2. API REQUEST WRAPPER

/**
 * Make an authenticated API request
 * @param {string} endpoint - API endpoint (e.g., '/auth/login')
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE) 
 * @param {Object|FormData} data - Request body data 
 * @param {boolean} isFormData - Whether data is FormData (for file uploads) 
 * @returns {Promise} - Response data 
 */
async function apiRequest(endpoint, method = 'GET', data = null, isFormData = false) {
  const token = getToken();
  
  const options = {
    method,
    headers: {}
  };
  
  // Add auth token if available
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Handle body data
  if (isFormData) {
    options.body = data;
  } else if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    let responseData;
    
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }
    
    if (!response.ok) {
      const errorMessage = responseData?.message || responseData || 'Request failed';
      throw new Error(errorMessage);
    }
    
    return responseData;
    
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}



// 3. AUTH ENDPOINTS

const AuthAPI = {
  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} - { token, user }
   */
  login: (email, password) => {
    return apiRequest('/auth/login', 'POST', { email, password });
  },
  
  /**
   * Register new user
   * @param {Object} userData - { name, email, phone, password }
   * @returns {Promise} - { user }
   */
  register: (userData) => {
    return apiRequest('/auth/register', 'POST', userData);
  },
  
  /**
   * Request password reset (send OTP)
   * @param {string} email - User email
   * @returns {Promise} - { message }
   */
  forgotPassword: (email) => {
    return apiRequest('/auth/forgot-password', 'POST', { email });
  },
  
  /**
   * Reset password with OTP
   * @param {string} otp - One-time password
   * @param {string} newPassword - New password
   * @returns {Promise} - { message }
   */
  resetPassword: (otp, newPassword) => {
    return apiRequest('/auth/reset-password', 'POST', { otp, newPassword });
  }
};



// 4. ADMIN ENDPOINTS

const AdminAPI = {
  //  Dashboard Stats 
  getStats: () => {
    return apiRequest('/admin/stats');
  },
  
  //  Applications 
  getApplications: (status = null) => {
    const query = status ? `?status=${status}` : '';
    return apiRequest(`/admin/applications${query}`);
  },
  
  getApplication: (id) => {
    return apiRequest(`/admin/applications/${id}`);
  },
  
  approveApplication: (id, reason = '') => {
    return apiRequest(`/admin/applications/${id}/approve`, 'POST', { reason });
  },
  
  rejectApplication: (id, reason) => {
    return apiRequest(`/admin/applications/${id}/reject`, 'POST', { reason });
  },
  
  requestResubmission: (id, reason) => {
    return apiRequest(`/admin/applications/${id}/resubmit`, 'POST', { reason });
  },
  
  //  Users 
  getUsers: () => {
    return apiRequest('/admin/users');
  },
  
  createUser: (userData) => {
    return apiRequest('/admin/users', 'POST', userData);
  },
  
  updateUser: (id, userData) => {
    return apiRequest(`/admin/users/${id}`, 'PUT', userData);
  },
  
  deleteUser: (id) => {
    return apiRequest(`/admin/users/${id}`, 'DELETE');
  },
  
  //  Account Types
  getAccountTypes: () => {
    return apiRequest('/admin/account-types');
  },
  
  createAccountType: (data) => {
    return apiRequest('/admin/account-types', 'POST', data);
  },
  
  updateAccountType: (id, data) => {
    return apiRequest(`/admin/account-types/${id}`, 'PUT', data);
  },
  
  deleteAccountType: (id) => {
    return apiRequest(`/admin/account-types/${id}`, 'DELETE');
  },
  
  //  Reports 
  getReports: () => { 
    return apiRequest('/admin/reports'); 
  }
};



// 5. CUSTOMER ENDPOINTS

const CustomerAPI = {
  //  Profile 
  getProfile: () => {
    return apiRequest('/customers/me');
  },
  
  updateProfile: (data) => {
    return apiRequest('/customers/me', 'PUT', data);
  },
  
  // Applications
  submitApplication: (data) => { 
    return apiRequest('/applications', 'POST', data); 
  },
  
  getApplicationStatus: () => {
    return apiRequest('/applications/me');
  },
  
  //  Documents 
  uploadDocument: (formData) => {
    return apiRequest('/documents/upload', 'POST', formData, true);
  },
  
  getDocuments: () => {
    return apiRequest('/documents/me');
  }
};



// 6. EXPOSE TO WINDOW


// Make everything globally accessible
window.API_BASE_URL = API_BASE_URL;
window.getToken = getToken;
window.setToken = setToken;
window.getRole = getRole;
window.setRole = setRole;
window.getCurrentUser = getCurrentUser;
window.setCurrentUser = setCurrentUser;
window.logout = logout;
window.apiRequest = apiRequest;
window.AuthAPI = AuthAPI;
window.AdminAPI = AdminAPI;
window.CustomerAPI = CustomerAPI;


// 7. AUTO-CONFIG: Set API URL from .env (optional)

// If you have a global config, you can set it here
// window.API_BASE_URL = 'https://your-backend-url.com/api';