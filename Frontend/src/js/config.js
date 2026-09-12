/* ========================================
   SWIFTb - Configuration
   ======================================== */

// Environment detection
const isProduction = window.location.hostname !== 'localhost' && 
                     window.location.hostname !== '127.0.0.1';

// API Base URL - Auto-detect environment
const API_BASE = isProduction 
  ? 'https://swiftb-backend.onrender.com/api'  // Production backend
  : 'http://localhost:3000/api';               // Local development

// Frontend URL
const FRONTEND_URL = isProduction
  ? 'https://bsc-inf-41-25.github.io/Project_Front-end/'
  : 'http://localhost:8080';

// Export configuration
window.CONFIG = {
  API_BASE,
  FRONTEND_URL,
  isProduction,
};
