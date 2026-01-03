/**
 * Sinowealth Distributor Website - Main JavaScript
 * Implements all interactive features and functionality
 */

// Main application namespace
const SinowealthApp = {
  init: function() {
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeComponents();
        this.initializeEvents();
        this.initializeAccessibility();
        this.initializePerformanceFeatures();
      });
    } else {
      this.initializeComponents();
      this.initializeEvents();
      this.initializeAccessibility();
      this.initializePerformanceFeatures();
    }
  },
  
  initializeComponents: function() {
    Components.initNavigation();
    Components.initSearch();
    Components.initFormValidation();
    Components.initModals();
    Components.initTabs();
    Components.initAccordions();
    Components.initImageGallery();
    Components.initTableFiltering();
    Components.initLazyLoading();
    Components.initSmoothScrolling();
    Components.initScrollAnimations();
  },
  
  initializeEvents: function() {
    // Scroll event for header
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const header = document.querySelector('.header');
      
      if (!header) return;
      
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down - hide header
        header.style.transform = 'translateY(-100%)';
      } else if (scrollTop < lastScrollTop) {
        // Scrolling up - show header
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollTop = scrollTop;
    });
    
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('active');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  },
  
  initializeAccessibility: function() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  },
  
  initializePerformanceFeatures: function() {
    // Initialize intersection observer for scroll animations
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
      };
      
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      // Observe elements with animate-on-scroll class
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }
  }
};

// Components functionality
const Components = {
  // Initialize navigation
  initNavigation: function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('active');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
    
    // Desktop submenu handling
    const submenuParents = document.querySelectorAll('.nav-item.has-submenu');
    submenuParents.forEach(parent => {
      const submenu = parent.querySelector('.submenu');
      if (!submenu) return;
      
      parent.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 768) {
          submenu.style.display = 'block';
          setTimeout(() => submenu.classList.add('show'), 10);
        }
      });
      
      parent.addEventListener('mouseleave', () => {
        if (window.innerWidth >= 768) {
          submenu.classList.remove('show');
          setTimeout(() => {
            if (!parent.matches(':hover')) submenu.style.display = 'none';
          }, 300);
        }
      });
      
      // Mobile click toggle
      if (window.innerWidth < 768) {
        const link = parent.querySelector('.nav-link');
        link.addEventListener('click', (e) => {
          if (window.innerWidth < 768) {
            e.preventDefault();
            const isVisible = submenu.style.display === 'block';
            submenu.style.display = isVisible ? 'none' : 'block';
            submenu.classList.toggle('show', submenu.style.display === 'block');
          }
        });
      }
    });
    
    // Update submenu handling on resize
    window.addEventListener('resize', Utils.debounce(() => {
      const submenuParents = document.querySelectorAll('.nav-item.has-submenu');
      submenuParents.forEach(parent => {
        const submenu = parent.querySelector('.submenu');
        if (!submenu) return;
        
        if (window.innerWidth >= 768) {
          // On desktop, reset mobile styles
          submenu.style.display = 'none';
          submenu.classList.remove('show');
        } else {
          // On mobile, ensure submenu is hidden by default
          submenu.style.display = 'none';
          submenu.classList.remove('show');
        }
      });
    }, 250));
  },
  
  // Initialize search functionality
  initSearch: function() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
      const searchResults = input.nextElementSibling?.classList?.contains('search-results') ? 
                           input.nextElementSibling : null;
      
      input.addEventListener('input', Utils.debounce(function() {
        const query = this.value.trim().toLowerCase();
        
        if (!searchResults) return;
        
        if (query.length < 2) {
          searchResults.style.display = 'none';
          return;
        }
        
        // In a real implementation, this would call an API
        // For now, we'll show mock results
        Components.performSearch(query, searchResults);
      }, 300));
    });
  },
  
  performSearch: function(query, resultsContainer) {
    // This is a placeholder implementation
    // In a real site, this would fetch results from an API
    resultsContainer.innerHTML = `
      <div class="search-result-item">
        <h4>No results found for "${query}"</h4>
        <p>Try searching for product codes like "SH79F", "SH36700", or "BMS"</p>
      </div>
    `;
    resultsContainer.style.display = 'block';
  },
  
  // Form validation
  initFormValidation: function() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        if (!Components.validateForm(this)) {
          e.preventDefault();
        }
      });
      
      // Real-time validation
      const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
      fields.forEach(field => {
        field.addEventListener('blur', () => {
          Components.validateField(field);
        });
        
        field.addEventListener('input', () => {
          // Clear error state when user starts typing
          field.classList.remove('error');
          const errorEl = field.parentNode.querySelector('.field-error');
          if (errorEl) errorEl.style.display = 'none';
        });
      });
    });
  },
  
  validateForm: function(form) {
    const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    fields.forEach(field => {
      if (!Components.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  },
  
  validateField: function(field) {
    let isValid = true;
    let errorMsg = '';
    
    // Check required fields
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMsg = 'This field is required';
    }
    // Email validation
    else if (field.type === 'email' && field.value && !Utils.isValidEmail(field.value)) {
      isValid = false;
      errorMsg = 'Please enter a valid email address';
    }
    // Phone validation
    else if (field.type === 'tel' && field.value && !Utils.isValidPhone(field.value)) {
      isValid = false;
      errorMsg = 'Please enter a valid phone number';
    }
    // URL validation
    else if (field.type === 'url' && field.value && !Utils.isValidUrl(field.value)) {
      isValid = false;
      errorMsg = 'Please enter a valid URL';
    }
    
    // Show/hide error message
    field.classList.toggle('error', !isValid);
    Components.showFieldError(field, errorMsg);
    
    return isValid;
  },
  
  showFieldError: function(field, msg) {
    let errorEl = field.parentNode.querySelector('.field-error');
    
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'field-error';
      errorEl.style.cssText = `
        color: var(--danger-color);
        font-size: var(--font-size-sm);
        margin-top: var(--spacing-xs);
        display: block;
      `;
      field.parentNode.appendChild(errorEl);
    }
    
    errorEl.textContent = msg;
    errorEl.style.display = msg ? 'block' : 'none';
  },
  
  // Modal functionality
  initModals: function() {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal-target');
        Components.openModal(modalId);
      });
    });
    
    // Close modals
    const closeButtons = document.querySelectorAll('.modal .close, .modal .modal-close, .modal-overlay');
    
    closeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const modal = this.closest('.modal') || document.querySelector('.modal.show');
        if (modal) Components.closeModal(modal);
      });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) Components.closeModal(openModal);
      }
    });
  },
  
  openModal: function(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus first focusable element
    const firstFocusable = modal.querySelector('input, button, textarea, select, a[href]');
    if (firstFocusable) firstFocusable.focus();
  },
  
  closeModal: function(modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  },
  
  // Tab functionality
  initTabs: function() {
    const tabContainers = document.querySelectorAll('.tab-container');
    
    tabContainers.forEach(container => {
      const tabButtons = container.querySelectorAll('.tab-button');
      const tabPanels = container.querySelectorAll('.tab-panel');
      
      tabButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Remove active class from all buttons and panels
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabPanels.forEach(panel => panel.classList.remove('active'));
          
          // Add active class to clicked button and corresponding panel
          this.classList.add('active');
          tabPanels[index].classList.add('active');
        });
      });
    });
  },
  
  // Accordion functionality
  initAccordions: function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
      
      if (header && content) {
        header.addEventListener('click', function() {
          const isCurrentlyActive = item.classList.contains('active');
          
          // Close all accordion items
          accordionItems.forEach(acc => {
            acc.classList.remove('active');
            const accContent = acc.querySelector('.accordion-content');
            if (accContent) {
              accContent.style.maxHeight = null;
              accContent.style.opacity = null;
              accContent.style.visibility = null;
            }
          });
          
          // Open current item if it wasn't already active
          if (!isCurrentlyActive) {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
            content.style.visibility = 'visible';
          }
        });
      }
    });
  },
  
  // Image gallery functionality
  initImageGallery: function() {
    const galleryItems = document.querySelectorAll('.gallery-item, [data-gallery]');
    
    galleryItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        
        const imgSrc = this.getAttribute('data-large') || 
                      this.getAttribute('data-src') || 
                      this.querySelector('img')?.getAttribute('src');
        const caption = this.getAttribute('data-caption') || 
                       this.querySelector('img')?.getAttribute('alt') || 
                       '';
        
        if (imgSrc) {
          Components.showLightbox(imgSrc, caption);
        }
      });
    });
  },
  
  showLightbox: function(imageSrc, caption = '') {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1050;
      opacity: 0;
    `;
    
    // Create lightbox content
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    lightboxContent.style.cssText = `
      position: relative;
      max-width: 90%;
      max-height: 90%;
      text-align: center;
    `;
    
    // Create image
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
      max-width: 100%;
      max-height: 80vh;
      display: block;
      margin: 0 auto;
      border-radius: var(--border-radius-md);
    `;
    
    // Create caption if exists
    if (caption) {
      const captionEl = document.createElement('div');
      captionEl.textContent = caption;
      captionEl.style.cssText = `
        color: var(--white);
        margin-top: var(--spacing-md);
        font-size: var(--font-size-lg);
      `;
      lightboxContent.appendChild(captionEl);
    }
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      border: none;
      color: var(--white);
      font-size: var(--font-size-xxxl);
      cursor: pointer;
      z-index: 1051;
    `;
    
    closeBtn.addEventListener('click', function() {
      document.body.removeChild(overlay);
      document.body.style.overflow = '';
    });
    
    // Add click outside to close
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
      }
    });
    
    lightboxContent.appendChild(closeBtn);
    lightboxContent.appendChild(img);
    overlay.appendChild(lightboxContent);
    
    document.body.appendChild(overlay);
    
    // Animate in
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
    
    // Handle escape key
    function handleEsc(e) {
      if (e.key === 'Escape') {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEsc);
      }
    }
    document.addEventListener('keydown', handleEsc);
  },
  
  // Table filtering functionality
  initTableFiltering: function() {
    const filterInputs = document.querySelectorAll('.filter-input');
    
    filterInputs.forEach(input => {
      const table = input.closest('.table-container')?.querySelector('.filterable-table');
      if (!table) return;
      
      const rows = table.querySelectorAll('tbody tr');
      
      input.addEventListener('input', Utils.debounce(function() {
        const filterValue = this.value.trim().toLowerCase();
        
        rows.forEach(row => {
          const rowText = row.textContent.toLowerCase();
          const shouldShow = rowText.includes(filterValue);
          
          row.style.display = shouldShow ? '' : 'none';
        });
      }, 300));
    });
  },
  
  // Lazy loading for images
  initLazyLoading: function() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Load image
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            
            img.classList.remove('lazy');
            img.classList.add('loaded');
            
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px'
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  },
  
  // Smooth scrolling for anchor links
  initSmoothScrolling: function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').length > 1) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            // Account for fixed header offset
            const headerOffset = document.querySelector('.header')?.offsetHeight || 0;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset - 20; // 20px extra padding
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  },
  
  // Scroll animations
  initScrollAnimations: function() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }
  }
};

// Utility functions
const Utils = {
  // Debounce function
  debounce: function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Throttle function
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
  
  // Email validation
  isValidEmail: function(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  
  // Phone validation
  isValidPhone: function(phone) {
    // Simple phone validation (international format)
    const regex = /^[\+]?[1-9][\d\s\-\(\)]{7,}$/;
    return regex.test(phone.replace(/\s/g, ''));
  },
  
  // URL validation
  isValidUrl: function(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  },
  
  // Check WebP support
  supportsWebP: function() {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('webp') > -1;
  },
  
  // Format currency
  formatCurrency: function(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },
  
  // Get URL parameters
  getUrlParameter: function(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  },
  
  // Check if element is in viewport
  isElementInViewport: function(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  
  // Smooth scroll to element with offset
  smoothScrollTo: function(target, offset = 0) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top: elementPosition,
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
  
  // Generate random ID
  generateId: function(prefix = 'id') {
    return prefix + '-' + Math.random().toString(36).substr(2, 9);
  },
  
  // Capitalize first letter of string
  capitalize: function(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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
    const nameEQ = name + '=';
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
  
  // Notification system
  showNotification: function(message, type = 'info', duration = 5000) {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(note => note.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: var(--spacing-md) var(--spacing-lg);
      background-color: ${
        type === 'success' ? 'var(--success-color)' : 
        type === 'error' || type === 'danger' ? 'var(--danger-color)' : 
        type === 'warning' ? 'var(--warning-color)' : 'var(--primary-color)'
      };
      color: var(--white);
      border-radius: var(--border-radius-md);
      z-index: 1070;
      box-shadow: var(--shadow-lg);
      max-width: 300px;
      word-wrap: break-word;
      opacity: 0;
      transform: translateX(100%);
      transition: all var(--transition-base);
    `;
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="margin-right: var(--spacing-md);">${message}</span>
        <button class="notification-close" style="
          background: none; 
          border: none; 
          color: inherit; 
          font-size: var(--font-size-xl); 
          cursor: pointer;
        ">&times;</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger entrance animation
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    });
    
    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        if (notification.parentNode && document.body.contains(notification)) {
          notification.style.opacity = '0';
          notification.style.transform = 'translateX(100%)';
          setTimeout(() => {
            if (notification.parentNode && document.body.contains(notification)) {
              notification.parentNode.removeChild(notification);
            }
          }, 300);
        }
      }, duration);
    }
  }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  SinowealthApp.init();
});

// Make components available globally
window.Components = Components;
window.Utils = Utils;