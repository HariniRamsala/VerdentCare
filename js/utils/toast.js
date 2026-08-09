// js/utils/toast.js
// Reusable toast notification system

(function () {
  // Ensure container exists
  function getContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  const ICONS = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: '🌿'
  };

  window.showToast = function (message, type = 'info', duration = 3200) {
    const container = getContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icon = document.createElement('span');
    icon.className = 'toast-icon';
    icon.textContent = ICONS[type] || ICONS.info;

    const text = document.createElement('span');
    text.className = 'toast-message';
    text.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(text);
    container.appendChild(toast);

    // Auto-remove
    const removeTimer = setTimeout(() => {
      removeToast(toast);
    }, duration);

    // Click to dismiss
    toast.addEventListener('click', () => {
      clearTimeout(removeTimer);
      removeToast(toast);
    });
  };

  function removeToast(toast) {
    if (!toast.parentElement) return;
    toast.classList.add('removing');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 320);
  }
})();
