/**
 * COMPONENTS.JS - Reusable UI Behaviors
 * Modals, Toasts, File Uploads, Tables
 */

// 1. TOAST SYSTEM

// Create toast container if it doesn't exist
(function createToastContainer() {
  if (!document.getElementById('toast-container')) {
    const container = document.createElement('div');
    container.className = 'toast-container';
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
})();

/**
 * Show a toast notification
 * @param {string} message - The message to display
 * @param {string} type - 'success', 'error', 'warning', 'info'
 * @param {number} duration - Milliseconds to show (default: 4000)
 */
function showToast(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const iconMap = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  
  toast.innerHTML = `
    <span class="toast-icon">${iconMap[type] || 'ℹ️'}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
  `;
  
  container.appendChild(toast);
  
  // Auto-remove after duration
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove();
    }
  }, duration);
}

// Make globally available
window.showToast = showToast;


// 2. MODAL SYSTEM

let currentModalCallback = null;

/**
 * Open a modal with custom content
 * @param {Object} options - Modal configuration
 * @param {string} options.title - Modal title
 * @param {string|HTMLElement} options.body - Modal content
 * @param {string} options.confirmText - Confirm button text (optional)
 * @param {Function} options.onConfirm - Callback when confirm is clicked
 * @param {Function} options.onCancel - Callback when cancel is clicked (optional)
 */
function openModal({ title, body, confirmText, onConfirm, onCancel }) {
  let overlay = document.getElementById('modal-overlay');
  
  if (!overlay) {
    overlay = createModalOverlay();
  }
  
  const modal = overlay.querySelector('.modal');
  const titleEl = modal.querySelector('.modal-title');
  const bodyEl = modal.querySelector('.modal-body');
  const footerEl = modal.querySelector('.modal-footer');
  
  titleEl.textContent = title || 'Modal';
  bodyEl.innerHTML = typeof body === 'string' ? body : body.outerHTML;
  
  // Clear and rebuild footer
  footerEl.innerHTML = '';
  
  if (confirmText) {
    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'btn btn-secondary';
    confirmBtn.textContent = confirmText;
    confirmBtn.onclick = () => {
      if (onConfirm) onConfirm();
      closeModal();
    };
    footerEl.appendChild(confirmBtn);
  }
  
  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn btn-ghost';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.onclick = () => {
    if (onCancel) onCancel();
    closeModal();
  };
  footerEl.appendChild(cancelBtn);
  
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  currentModalCallback = { onConfirm, onCancel };
}

/**
 * Create the modal overlay in the DOM
 */
function createModalOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-overlay';
  
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">Modal</h2>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
      <div class="modal-body"></div>
      <div class="modal-footer"></div>
    </div>
  `;
  
  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  
  document.body.appendChild(overlay);
  return overlay;
}

/**
 * Close the currently open modal
 */
function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  currentModalCallback = null;
}

// Make globally available
window.openModal = openModal;
window.closeModal = closeModal;


// 3. TABLE ROW CLICK HANDLER

/**
 * Make table rows clickable
 * @param {string} selector - The table selector (e.g., '#applications-table tbody tr')
 * @param {Function} onClick - Callback receiving the row data
 */
function makeTableRowsClickable(selector, onClick) {
  document.querySelectorAll(selector).forEach(row => {
    row.addEventListener('click', () => {
      const data = extractRowData(row);
      onClick(data);
    });
  });
}

function extractRowData(row) {
  const cells = row.querySelectorAll('td');
  return Array.from(cells).map(cell => cell.textContent.trim());
}

window.makeTableRowsClickable = makeTableRowsClickable;


// 4. FILE UPLOAD WIDGET

/**
 * Create a file upload widget with preview
 * @param {string} containerId - ID of the container element
 * @param {Object} options - Configuration
 * @param {Function} options.onUpload - Callback when file is uploaded
 * @param {string} options.accept - File types accepted (default: 'image/*,.pdf')
 * @param {number} options.maxSize - Max file size in MB (default: 5)
 */
function initFileUpload(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }
  
  const accept = options.accept || 'image/*,.pdf';
  const maxSize = (options.maxSize || 5) * 1024 * 1024;
  
  container.innerHTML = `
    <div class="upload-zone" id="upload-zone" style="border: 2px dashed var(--border); border-radius: var(--radius-md); padding: var(--space-6); text-align: center; cursor: pointer; transition: all var(--transition-fast); background: var(--surface);">
      <div class="upload-icon" style="font-size: 2.5rem; margin-bottom: var(--space-3);">📄</div>
      <p style="font-size: var(--text-base);">Drag & drop your National ID here, or <strong>click to browse</strong></p>
      <p style="font-size: var(--text-sm); color: var(--ink-tertiary); margin-top: var(--space-2);">Accepted: JPG, PNG, PDF - Max ${maxSize / (1024 * 1024)}MB</p>
      <input type="file" id="file-input" accept="${accept}" style="display:none">
    </div>
    <div class="upload-preview hidden" id="upload-preview" style="margin-top: var(--space-4); padding: var(--space-4); border: 1px solid var(--success); border-radius: var(--radius-md); background: var(--success-light);">
      <div style="display: flex; align-items: center; gap: var(--space-4);">
        <img id="preview-image" src="" alt="ID Preview" style="width: 80px; height: 80px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border);" />
        <div style="flex: 1;">
          <span id="file-name" style="font-weight: var(--weight-medium); display: block;">file.pdf</span>
          <span style="font-size: var(--text-sm); color: var(--success);">✅ Uploaded successfully</span>
          <a href="#" id="replace-link" style="font-size: var(--text-sm); color: var(--navy-700); display: inline-block; margin-top: var(--space-1);">Replace file</a>
        </div>
      </div>
      <div class="upload-progress" style="margin-top: var(--space-3);">
        <div id="progress-bar" style="height: 4px; background: var(--success); width: 100%; border-radius: var(--radius-full); transition: width 0.3s;"></div>
      </div>
    </div>
  `;
  
  const zone = container.querySelector('#upload-zone');
  const fileInput = container.querySelector('#file-input');
  const preview = container.querySelector('#upload-preview');
  const previewImg = container.querySelector('#preview-image');
  const fileName = container.querySelector('#file-name');
  const replaceLink = container.querySelector('#replace-link');
  const progressBar = container.querySelector('#progress-bar');
  
  //  Click to browse 
  zone.addEventListener('click', () => fileInput.click());
  
  replaceLink.addEventListener('click', (e) => {
    e.preventDefault();
    resetUpload();
  });
  
  //  File selection 
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  });
  
  // Drag and drop 
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.style.borderColor = 'var(--navy-700)'; 
    zone.style.background = 'var(--navy-50)';  
  });
  
  zone.addEventListener('dragleave', () => {
    zone.style.borderColor = 'var(--border)';
    zone.style.background = 'var(--surface)';
  });
  
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.style.borderColor = 'var(--border)';
    zone.style.background = 'var(--surface)';
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });
  
  //  Handle file 
  function handleFile(file) {
    if (!file) return;
    
    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      showToast('Please upload a JPG, PNG, or PDF file', 'error');
      return;
    }
    
    // Validate size
    if (file.size > maxSize) {
      showToast(`File size must be under ${maxSize / (1024 * 1024)}MB`, 'error');
      return;
    }
    
    // Show preview
    zone.style.display = 'none';
    preview.classList.remove('hidden');
    fileName.textContent = file.name;
    
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImg.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      previewImg.src = '/placeholder-id.png';
    }
    
    // Simulate progress (for demo effect)
    let progress = 0;
    progressBar.style.width = '0%';
    
    const interval = setInterval(() => {
      progress += 10;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
      
      if (progress >= 100) {
        clearInterval(interval);
        showToast('ID uploaded successfully! ✅', 'success');
        
        // Call onUpload callback
        if (options.onUpload) {
          options.onUpload(file);
        }
      }
    }, 80);
  }
  
  //  Reset upload 
  function resetUpload() {
    zone.style.display = 'block';
    preview.classList.add('hidden');
    fileInput.value = '';
    progressBar.style.width = '0%';
  }
  
  // Store references for external use
  container._resetUpload = resetUpload;
  container._getFile = () => fileInput.files[0];
  container._getFileInput = () => fileInput;
}

// Make globally available
window.initFileUpload = initFileUpload;


// 5. AUTO-INIT: Sidebar Active State

// Automatically highlight active nav item based on current page
document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href)) {
      link.classList.add('active');
    }
  });
});



// 6. LOGOUT HELPER

/**
 * Log out the current user (clears storage and redirects to login)
 */
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('user');
  window.location.href = '/login.html';
}

window.logout = logout;