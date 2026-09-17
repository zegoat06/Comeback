/* ========================================
   SWIFTb - Shared Helpers
   ======================================== */

function getCurrentUser() {
  try {
    return JSON.parse(sessionStorage.getItem('user'));
  } catch {
    return null;
  }
}

function getUserData() {
  return getCurrentUser() || {};
}

function logout() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('role');
  sessionStorage.removeItem('user');
  window.location.href = '../auth/loginPage.html';
}

function showToast(message, type = 'info', duration = 4000) {
  alert(message);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatDateTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

window.getCurrentUser = getCurrentUser;
window.getUserData = getUserData;
window.logout = logout;
window.showToast = showToast;
window.formatDate = formatDate;
window.formatDateTime = formatDateTime;