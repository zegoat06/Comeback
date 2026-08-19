<<<<<<< HEAD
/* ========================================
   SWIFTb - API Integration
   ======================================== */

// Load configuration
if (!window.CONFIG) {
  // Fallback config if config.js not loaded
  window.CONFIG = {
    API_BASE: window.location.hostname !== 'localhost' 
      ? 'https://swiftb-backend.onrender.com/api'
      : 'http://localhost:3000/api',
    FRONTEND_URL: window.location.origin,
    isProduction: window.location.hostname !== 'localhost'
  };
}

const API_BASE = window.CONFIG.API_BASE;

class ApiClient {
  constructor() {
    this.baseURL = API_BASE;
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (options.body && options.body instanceof FormData) {
      delete headers['Content-Type'];
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('user');
        if (!window.location.pathname.includes('loginPage') && 
            !window.location.pathname.includes('registerPage')) {
          window.location.href = '/loginPage.html';
        }
        throw new Error('Session expired. Please login again.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // ========================================
  // AUTH ENDPOINTS
  // ========================================

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (data.token) {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('role', data.role || 'customer');
      sessionStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  }

  // ========================================
  // CUSTOMER ENDPOINTS
  // ========================================

  async getProfile() {
    return this.request('/customers/profile');
  }

  async updateProfile(data) {
    return this.request('/customers/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ========================================
  // APPLICATION ENDPOINTS
  // ========================================

  async createApplication(data) {
    return this.request('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMyApplications() {
    return this.request('/applications/my');
  }

  async getApplicationById(id) {
    return this.request(`/applications/${id}`);
  }

  // ========================================
  // DOCUMENT ENDPOINTS
  // ========================================

  async uploadDocument(formData) {
    return this.request('/documents/upload', {
      method: 'POST',
      body: formData,
    });
  }

  async getMyDocuments() {
    return this.request('/documents/customer/me');
  }

  // ========================================
  // ACCOUNT TYPE ENDPOINTS
  // ========================================

  async getAccountTypes() {
    return this.request('/account-types');
  }
}

const api = new ApiClient();
window.api = api;
=======
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
>>>>>>> origin/bsc-inf-41-25
