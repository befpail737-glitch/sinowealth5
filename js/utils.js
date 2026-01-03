/**
 * Sinowealth Distributor Website - Utilities JavaScript
 * Contains utility functions and helper methods
 */

// Utility functions namespace
const Utils = {
  // Debounce function to limit execution rate
  debounce: function(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        if (!immediate) func.apply(this, args);
      };
      
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(this, args);
    };
  },
  
  // Throttle function to ensure function runs at most once per interval
  throttle: function(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Format currency (supports multiple currencies)
  formatCurrency: function(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },
  
  // Format numbers with thousand separators
  formatNumber: function(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  
  // Parse query string parameters
  getUrlParams: function(url = window.location.search) {
    const params = {};
    const parser = document.createElement('a');
    parser.href = url;
    const query = parser.search.substring(1);
    const vars = query.split('&');
    
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    
    return params;
  },
  
  // Check if element is in viewport
  isElementInViewport: function(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= windowHeight &&
      rect.right <= windowWidth
    );
  },
  
  // Smooth scroll to element with offset
  smoothScrollTo: function(element, offset = 0) {
    if (!element) return;
    
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementTop - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  },
  
  // Scroll to top of page
  scrollToTop: function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },
  
  // Check if browser supports WebP
  supportsWebP: function() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('webp') > -1;
  },
  
  // Check if browser supports AVIF
  supportsAVIF: function() {
    const img = new Image();
    img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG1hAG1kdGEAAAAAAGxrYXZpZjAyAAAAABhpaW5mAAAAAAABAAEAAQBAgAABABoAAAAaaWxvYwAAAABEAAEAAXQAAAEaAAAEYXRtbGliYXZpZgAAABNtZHRhAAAAAAAAAII+cGFzc2lGc291cgAAAAAJcGFybQ0AAAAAYnQxNAAAACJiYXNlZAAAACJzdGNoYgAAAAAAAAAIAAAAF2lwcm8AAABYY2hpZQAAABJlbmdhAAAAAAAAAAEAAAACAAAABGd1aWRHWFhYAAAAAwAAAAJpcHJ0AAAAAAABAAAAA3Byb2oAAAAAAQAAAABqcHJvZwAAABdwcml2YXRlAAARbm9ucHJpdmF0ZWxvbmdncm91cAAAABtzYW5kYm94ZWRTZWN1cmVEb250RmxpZQBQAAAAAAAAAAAAAA4AAAAMAAAAHQAAACMAAAAkAAAANQAAADYAAAAnAAAAPgAAADkAAAA6AAAAOwAAADwAAAA9AAAAPgAAAD8AAABCAAAAQwAAAEMAAABEAAAARQAAAEdQAAAAAwAAAAEAAQADAAMAAwACAAMAAwACAAMAAwACAAMAAwA='
    return img.complete && img.naturalHeight > 0;
  },
  
  // Validate email format
  isValidEmail: function(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  },
  
  // Validate phone number (international format)
  isValidPhone: function(phone) {
    // Remove all non-digit characters except +
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // Basic validation: starts with + followed by 10-15 digits
    const re = /^\+\d{10,15}$/;
    return re.test(cleanPhone);
  },
  
  // Validate URL
  isValidUrl: function(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  },
  
  // Generate random ID
  generateId: function(prefix = 'id') {
    return prefix + '-' + Math.random().toString(36).substr(2, 9);
  },
  
  // Get unique values from array
  uniqueArray: function(arr) {
    return [...new Set(arr)];
  },
  
  // Capitalize first letter of string
  capitalize: function(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },
  
  // Convert string to title case
  toTitleCase: function(str) {
    return str.toLowerCase().split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  },
  
  // Truncate text with ellipsis
  truncateText: function(str, length = 100, suffix = '...') {
    if (!str || str.length <= length) return str;
    return str.substr(0, length) + suffix;
  },
  
  // Check if user prefers reduced motion
  prefersReducedMotion: function() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  
  // Check if user prefers dark mode
  prefersDarkMode: function() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  },
  
  // Add event listener for DOM ready
  domReady: function(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  },
  
  // Wait for element to exist in DOM
  waitForElement: function(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }
      
      const observer = new MutationObserver(() => {
        const element = document.querySelector(selector);
        if (element) {
          observer.disconnect();
          resolve(element);
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }, timeout);
    });
  },
  
  // Create notification toast
  showNotification: function(message, type = 'info', options = {}) {
    const defaults = {
      duration: 5000,
      closable: true,
      position: 'top-right' // top-right, top-left, bottom-right, bottom-left
    };
    
    const opts = { ...defaults, ...options };
    
    // Create notification container if it doesn't exist
    let container = document.querySelector('.notification-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'notification-container';
      container.style.cssText = `
        position: fixed;
        z-index: var(--z-index-toast);
        pointer-events: none;
      `;
      
      // Position container based on option
      switch (opts.position) {
        case 'top-left':
          container.style.top = '20px';
          container.style.left = '20px';
          break;
        case 'top-right':
          container.style.top = '20px';
          container.style.right = '20px';
          break;
        case 'bottom-left':
          container.style.bottom = '20px';
          container.style.left = '20px';
          break;
        case 'bottom-right':
          container.style.bottom = '20px';
          container.style.right = '20px';
          break;
      }
      
      document.body.appendChild(container);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      background: var(--white);
      color: var(--text-color);
      padding: var(--spacing-md);
      margin-bottom: var(--spacing-sm);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-lg);
      max-width: 350px;
      min-width: 280px;
      opacity: 0;
      transform: translateX(100%);
      transition: all var(--transition-base);
      pointer-events: all;
      position: relative;
      border-left: 4px solid ${
        type === 'success' ? 'var(--success-color)' :
        type === 'error' || type === 'danger' ? 'var(--danger-color)' :
        type === 'warning' ? 'var(--warning-color)' : 'var(--primary-color)'
      };
    `;
    
    // Add content
    const contentWrapper = document.createElement('div');
    contentWrapper.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    `;
    
    const textDiv = document.createElement('div');
    textDiv.style.cssText = `
      flex: 1;
      margin-right: var(--spacing-sm);
    `;
    textDiv.textContent = message;
    
    contentWrapper.appendChild(textDiv);
    
    // Add close button if closable
    if (opts.closable) {
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '&times;';
      closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: var(--font-size-xl);
        cursor: pointer;
        padding: 0;
        margin: 0;
        color: var(--text-color-lighter);
        opacity: 0.7;
        transition: opacity var(--transition-fast);
      `;
      closeBtn.addEventListener('click', () => {
        Utils.removeNotification(notification, container);
      });
      
      closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.opacity = '1';
      });
      
      closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.opacity = '0.7';
      });
      
      contentWrapper.appendChild(closeBtn);
    }
    
    notification.appendChild(contentWrapper);
    container.appendChild(notification);
    
    // Trigger entrance animation
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto-remove if duration > 0
    if (opts.duration > 0) {
      setTimeout(() => {
        if (notification.parentNode) {
          Utils.removeNotification(notification, container);
        }
      }, opts.duration);
    }
    
    return notification;
  },
  
  removeNotification: function(notification, container) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    notification.style.pointerEvents = 'none';
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
        
        // Remove container if no notifications left
        if (container.children.length === 0) {
          container.parentNode.removeChild(container);
        }
      }
    }, 300);
  },
  
  // Form validation and handling
  validateForm: function(form) {
    let isValid = true;
    const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  },
  
  validateField: function(field) {
    let isValid = true;
    let errorMessage = '';
    
    // Check required fields
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMessage = this.getLocalizedString('field_required', 'This field is required');
    }
    // Check email format
    else if (field.type === 'email' && field.value && !this.isValidEmail(field.value)) {
      isValid = false;
      errorMessage = this.getLocalizedString('invalid_email', 'Please enter a valid email address');
    }
    // Check URL format
    else if (field.type === 'url' && field.value && !this.isValidUrl(field.value)) {
      isValid = false;
      errorMessage = this.getLocalizedString('invalid_url', 'Please enter a valid URL');
    }
    // Check phone format
    else if (field.type === 'tel' && field.value && !this.isValidPhone(field.value)) {
      isValid = false;
      errorMessage = this.getLocalizedString('invalid_phone', 'Please enter a valid phone number');
    }
    
    // Show/hide error message
    this.showFieldError(field, errorMessage);
    
    return isValid;
  },
  
  showFieldError: function(field, message) {
    field.classList.toggle('error', !!message);
    
    // Remove any existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Add new error message if exists
    if (message) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.style.cssText = `
        color: var(--danger-color);
        font-size: var(--font-size-xs);
        margin-top: var(--spacing-xs);
        display: block;
      `;
      errorDiv.textContent = message;
      
      field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }
  },
  
  // Get localized string (simplified implementation)
  getLocalizedString: function(key, defaultString) {
    // In a real implementation, this would use a translation system
    // For now, return the default string
    return defaultString;
  },
  
  // Local storage helpers
  setLocalStorage: function(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Error saving to localStorage:', e);
      return false;
    }
  },
  
  getLocalStorage: function(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return defaultValue;
    }
  },
  
  removeFromLocalStorage: function(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Error removing from localStorage:', e);
      return false;
    }
  },
  
  // Session storage helpers
  setSessionStorage: function(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Error saving to sessionStorage:', e);
      return false;
    }
  },
  
  getSessionStorage: function(key, defaultValue = null) {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Error reading from sessionStorage:', e);
      return defaultValue;
    }
  },
  
  // Cookie helpers
  setCookie: function(name, value, days = 30) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  },
  
  getCookie: function(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  
  deleteCookie: function(name) {
    document.cookie = `${name}=; Max-Age=-99999999;`;
  },
  
  // Array and object helpers
  shuffleArray: function(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },
  
  // Deep clone object
  deepClone: function(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => this.deepClone(item));
    if (typeof obj === 'object') {
      const clonedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = this.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
  },
  
  // Object merge
  mergeObjects: function(target, ...sources) {
    sources.forEach(source => {
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            this.mergeObjects(target[key], source[key]);
          } else {
            target[key] = source[key];
          }
        }
      }
    });
    return target;
  },
  
  // Format date
  formatDate: function(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  },
  
  // Calculate time ago string
  timeAgo: function(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000); // Years
    if (interval >= 1) return interval + ' year(s) ago';
    
    interval = Math.floor(seconds / 2592000); // Months
    if (interval >= 1) return interval + ' month(s) ago';
    
    interval = Math.floor(seconds / 86400); // Days
    if (interval >= 1) return interval + ' day(s) ago';
    
    interval = Math.floor(seconds / 3600); // Hours
    if (interval >= 1) return interval + ' hour(s) ago';
    
    interval = Math.floor(seconds / 60); // Minutes
    if (interval >= 1) return interval + ' minute(s) ago';
    
    return Math.floor(seconds) + ' second(s) ago';
  },
  
  // Copy text to clipboard
  copyToClipboard: function(text) {
    return navigator.clipboard.writeText(text);
  },
  
  // Detect if device is mobile
  isMobile: function() {
    return window.innerWidth <= 768;
  },
  
  // Detect if device is tablet
  isTablet: function() {
    return window.innerWidth > 768 && window.innerWidth <= 992;
  },
  
  // Detect if device is desktop
  isDesktop: function() {
    return window.innerWidth > 992;
  },
  
  // Detect touch support
  hasTouchSupport: function() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },
  
  // Load external script dynamically
  loadScript: function(src, options = {}) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      
      if (options.async !== undefined) script.async = options.async;
      if (options.defer !== undefined) script.defer = options.defer;
      
      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      
      document.head.appendChild(script);
    });
  },
  
  // Load CSS dynamically
  loadCSS: function(href) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => resolve(link);
      link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
      
      document.head.appendChild(link);
    });
  },
  
  // Get element dimensions and position
  getElementBounds: function(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset,
      width: rect.width,
      height: rect.height,
      right: rect.right + window.pageXOffset,
      bottom: rect.bottom + window.pageYOffset
    };
  },
  
  // Check if element is fully visible in viewport
  isElementFullyVisible: function(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= windowHeight &&
      rect.right <= windowWidth
    );
  },
  
  // Get closest parent element matching selector
  getClosestParent: function(element, selector) {
    while (element && element !== document) {
      if (element.matches(selector)) {
        return element;
      }
      element = element.parentElement;
    }
    return null;
  },
  
  // Wait for specified time (useful in async functions)
  sleep: function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}