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
