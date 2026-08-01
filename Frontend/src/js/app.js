/* ========================================
   SWIFTb - Application Logic
   ======================================== */

// ---------- Toast System ----------
function showToast(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toast-container') || (() => {
    const el = document.createElement('div');
    el.id = 'toast-container';
    el.className = 'toast-container';
    document.body.appendChild(el);
    return el;
  })();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ---------- Storage Helpers ----------
function setStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function getStorage(key) {
  try {
    return JSON.parse(sessionStorage.getItem(key));
  } catch {
    return sessionStorage.getItem(key);
  }
}

function removeStorage(key) {
  sessionStorage.removeItem(key);
}

function getUserData() {
  return getStorage('user') || {};
}

function getSelectedBank() {
  return getStorage('selectedBank');
}

// ---------- Wizard State ----------
const wizard = {
  data: null,

  load() {
    this.data = getStorage('wizardDraft') || this.getDefault();
    return this.data;
  },

  getDefault() {
    return {
      step: 1,
      accountType: null,
      accountTypeId: null,
      personalDetails: {
        address: '',
        occupation: '',
        incomeRange: '',
        nextOfKin: '',
        nextOfKinPhone: '',
      },
      nationalId: {
        number: '',
        file: null,
        fileUrl: null,
        uploaded: false,
        documentId: null,
      },
      termsAccepted: false,
      submitted: false,
      applicationId: null,
    };
  },

  save() {
    setStorage('wizardDraft', this.data);
  },

  reset() {
    this.data = this.getDefault();
    this.save();
  },

  setAccountType(id, name) {
    this.data.accountTypeId = id;
    this.data.accountType = name;
    this.save();
  },

  setPersonalDetails(details) {
    this.data.personalDetails = { ...this.data.personalDetails, ...details };
    this.save();
  },

  setNationalId(number, file, fileUrl) {
    this.data.nationalId.number = number;
    if (file) this.data.nationalId.file = file;
    if (fileUrl) this.data.nationalId.fileUrl = fileUrl;
    this.save();
  },

  setNationalIdUploaded(documentId) {
    this.data.nationalId.uploaded = true;
    this.data.nationalId.documentId = documentId;
    this.save();
  },

  setTermsAccepted(accepted) {
    this.data.termsAccepted = accepted;
    this.save();
  },

  setApplicationId(id) {
    this.data.applicationId = id;
    this.save();
  },

  getFullData() {
    const user = getUserData();
    return {
      accountTypeId: this.data.accountTypeId,
      address: this.data.personalDetails.address || user.address || '',
      occupation: this.data.personalDetails.occupation || user.occupation || '',
      incomeRange: this.data.personalDetails.incomeRange || '',
      nextOfKin: this.data.personalDetails.nextOfKin || '',
      nextOfKinPhone: this.data.personalDetails.nextOfKinPhone || '',
      nationalId: this.data.nationalId.number || user.nationalId || '',
      documentId: this.data.nationalId.documentId,
      termsAccepted: this.data.termsAccepted,
    };
  },

  isComplete() {
    const d = this.data;
    const hasAccountType = d.accountTypeId !== null && d.accountTypeId !== undefined;
    const hasAddress = d.personalDetails.address && d.personalDetails.address.trim() !== '';
    const hasOccupation = d.personalDetails.occupation && d.personalDetails.occupation.trim() !== '';
    const hasIdNumber = d.nationalId.number && d.nationalId.number.trim() !== '';
    const hasIdUploaded = d.nationalId.uploaded === true;
    const hasTerms = d.termsAccepted === true;
    
    return hasAccountType && hasAddress && hasOccupation && hasIdNumber && hasIdUploaded && hasTerms;
  }
};

// ---------- Bank Data ----------
const BANKS = [
  { id: 'nbm', name: 'National Bank of Malawi', shortName: 'NBM', icon: 'fa-university', color: '#0A1F44', description: 'Full-service commercial bank', badge: 'Popular' },
  { id: 'fdh', name: 'FDH Bank', shortName: 'FDH', icon: 'fa-building', color: '#003366', description: 'Leading financial services provider', badge: 'Fast' },
  { id: 'standard', name: 'Standard Bank', shortName: 'Standard', icon: 'fa-landmark', color: '#0066b3', description: 'Global banking network' },
  { id: 'ecobank', name: 'Ecobank Malawi', shortName: 'Ecobank', icon: 'fa-globe-africa', color: '#006b3e', description: 'Pan-African banking' },
  { id: 'opportunity', name: 'Opportunity Bank', shortName: 'Opportunity', icon: 'fa-hand-holding-usd', color: '#f57c00', description: 'Microfinance & SME banking', badge: 'SME Focus' },
  { id: 'mybucks', name: 'MyBucks Banking', shortName: 'MyBucks', icon: 'fa-coins', color: '#e65100', description: 'Digital-first banking' },
  { id: 'nbs', name: 'NBS Bank', shortName: 'NBS', icon: 'fa-piggy-bank', color: '#2e7d32', description: 'Community banking' },
  { id: 'first-capital', name: 'First Capital Bank', shortName: 'First Capital', icon: 'fa-chart-line', color: '#b71c1c', description: 'Corporate & personal banking' }
];

// ---------- Format Helpers ----------
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatDateTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// ---------- Demo Login Function ----------
function demoLogin() {
  const user = {
    id: 'demo-' + Date.now(),
    fullName: 'Guest User',
    email: 'guest@example.com',
    phoneNumber: '+265 888 123 456',
    role: 'customer'
  };
  
  sessionStorage.setItem('token', 'demo-token-' + Date.now());
  sessionStorage.setItem('role', 'customer');
  sessionStorage.setItem('user', JSON.stringify(user));
  
  showToast('Continuing as guest...', 'success');
  setTimeout(() => {
    window.location.href = '/pages/customer/dashboard.html';
  }, 800);
}

// ---------- Expose Globally ----------
window.showToast = showToast;
window.setStorage = setStorage;
window.getStorage = getStorage;
window.removeStorage = removeStorage;
window.getUserData = getUserData;
window.getSelectedBank = getSelectedBank;
window.wizard = wizard;
window.BANKS = BANKS;
window.formatDate = formatDate;
window.formatDateTime = formatDateTime;
window.demoLogin = demoLogin;
