/* ========================================
   SWIFTb - API Integration
   ======================================== */

// Simple API base — auto-detect environment
const SWIFTB_API_BASE =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : 'https://swiftb-backend.onrender.com/api';

console.log('API BASE URL:', SWIFTB_API_BASE);

class ApiClient {
  constructor() {
    this.baseURL = SWIFTB_API_BASE;
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

    const fullUrl = `${this.baseURL}${endpoint}`;
    console.log('API CALL:', fullUrl);

    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        if (
          !window.location.pathname.includes('loginPage') &&
          !window.location.pathname.includes('registerPage')
        ) {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('role');
          sessionStorage.removeItem('user');
          window.location.href = '../auth/loginPage.html';        }
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
  // AUTH
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
  // CUSTOMER
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

  async createApplication(data) {
    return this.request('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMyApplications() {
    return this.request('/applications/my');
  }

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
  // ACCOUNT TYPES (public / shared)
  // ========================================
  async getAccountTypes() {
    return this.request('/account-types');
  }

  // ========================================
  // ADMIN — APPLICATIONS
  // ========================================
  async getAllApplications() {
    return this.request('/applications');
  }

  async getApplicationById(id) {
    return this.request(`/applications/${id}`);
  }

  async approveApplication(id) {
    return this.request(`/applications/${id}/approve`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }

  async rejectApplication(id, rejectionReason) {
    return this.request(`/applications/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ rejectionReason }),
    });
  }

  async requestResubmission(id, remarks) {
    return this.request(`/applications/${id}/resubmission`, {
      method: 'POST',
      body: JSON.stringify({ remarks }),
    });
  }

  // ========================================
  // ADMIN — USERS
  // ========================================
  async getAllUsers() {
    return this.request('/users');
  }

  async getUserById(id) {
    return this.request(`/users/${id}`);
  }

  async updateUser(id, data) {
    return this.request(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }
}

const api = new ApiClient();
window.api = api;

console.log('API client ready. baseURL =', api.baseURL);