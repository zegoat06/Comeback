/**
 * API.JS - Backend Communication Layer
 * All API calls to the NestJS backend
 */

//  CONFIGURATION 
// FIX: Read from window.CONFIG.API_BASE or fallback to localhost
const API_BASE_URL = window.CONFIG?.API_BASE || 'http://localhost:3000/api';

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

async function apiRequest(endpoint, method = 'GET', data = null, isFormData = false) {
  const token = getToken();
  
  const options = {
    method,
    headers: {}
  };
  
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }
  
  if (isFormData) {
    options.body = data;
  } else if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
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
  login: (email, password) => {
    return apiRequest('/auth/login', 'POST', { email, password });
  },
  
  register: (userData) => {
    return apiRequest('/auth/register', 'POST', userData);
  },
  
  forgotPassword: (email) => {
    return apiRequest('/auth/forgot-password', 'POST', { email });
  },
  
  resetPassword: (otp, newPassword) => {
    return apiRequest('/auth/reset-password', 'POST', { otp, newPassword });
  }
};

// 4. ADMIN ENDPOINTS

const AdminAPI = {
  getStats: () => {
    return apiRequest('/admin/stats');
  },
  
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
  
  getReports: () => { 
    return apiRequest('/admin/reports'); 
  }
};

// 5. CUSTOMER ENDPOINTS

const CustomerAPI = {
  getProfile: () => {
    return apiRequest('/customers/me');
  },
  
  updateProfile: (data) => {
    return apiRequest('/customers/me', 'PUT', data);
  },
  
  submitApplication: (data) => { 
    return apiRequest('/applications', 'POST', data); 
  },
  
  getApplicationStatus: () => {
    return apiRequest('/applications/me');
  },
  
  getMyApplications: function() {
    return this.getApplicationStatus();
  },
  
  uploadDocument: (formData) => {
    return apiRequest('/documents/upload', 'POST', formData, true);
  },
  
  getDocuments: () => {
    return apiRequest('/documents/me');
  }
};

// 6. EXPOSE TO WINDOW

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
