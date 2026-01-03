/**
 * Sinowealth Distributor Website - Components JavaScript
 * Contains specific UI component implementations
 */

// Components functionality
const Components = {
  // Initialize navigation system
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
      
      // Submenu handling for desktop
      const submenuParents = document.querySelectorAll('.nav-item.has-submenu');
      
      submenuParents.forEach(parent => {
        const submenu = parent.querySelector('.submenu');
        if (!submenu) return;
        
        const link = parent.querySelector('.nav-link');
        
        if (window.innerWidth >= 768) {
          // Desktop - hover to show submenu
          parent.addEventListener('mouseenter', () => {
            submenu.style.display = 'block';
            setTimeout(() => submenu.classList.add('show'), 10);
          });
          
          parent.addEventListener('mouseleave', () => {
            submenu.classList.remove('show');
            setTimeout(() => {
              if (!parent.matches(':hover')) submenu.style.display = 'none';
            }, 300);
          });
        } else {
          // Mobile - click to toggle submenu
          link.addEventListener('click', (e) => {
            e.preventDefault();
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            submenu.classList.toggle('show', submenu.style.display === 'block');
          });
        }
      });
      
      // Handle window resize for navigation behavior
      window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
          // On desktop, ensure submenus are positioned properly
          submenuParents.forEach(parent => {
            const submenu = parent.querySelector('.submenu');
            if (submenu) {
              submenu.style.display = 'none';
              submenu.classList.remove('show');
            }
          });
        }
      });
    }
  },
  
  // Initialize modal functionality
  initModals: function() {
    // Modal open triggers
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const targetModalId = this.getAttribute('data-modal-target');
        Components.openModal(targetModalId);
      });
    });
    
    // Modal close buttons
    const modalCloseButtons = document.querySelectorAll('.modal .close, .modal .modal-close');
    
    modalCloseButtons.forEach(button => {
      button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        Components.closeModal(modal);
      });
    });
    
    // Close modal when clicking on backdrop
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          Components.closeModal(modal);
        }
      });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
          Components.closeModal(openModal);
        }
      }
    });
  },
  
  openModal: function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      // Focus first focusable element in modal
      const firstFocusable = modal.querySelector('input, button, textarea, select, a[href]');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  },
  
  closeModal: function(modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Return focus to triggering element
    const activeTrigger = document.querySelector(`[data-modal-target="${modal.id}"]`);
    if (activeTrigger) {
      activeTrigger.focus();
    }
  },
  
  // Initialize tabs component
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
  
  // Initialize accordion functionality
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
  
  // Initialize tooltips
  initTooltips: function() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
      let tooltipEl;
      
      function createTooltip() {
        tooltipEl = document.createElement('div');
        tooltipEl.className = 'tooltip';
        tooltipEl.textContent = trigger.getAttribute('data-tooltip');
        tooltipEl.style.cssText = `
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -100%);
          background-color: var(--text-color);
          color: var(--white);
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--border-radius-sm);
          font-size: var(--font-size-sm);
          white-space: nowrap;
          z-index: var(--z-index-tooltip);
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--transition-fast);
          margin-bottom: var(--spacing-xs);
        `;
        
        // Add arrow element
        const arrow = document.createElement('div');
        arrow.style.cssText = `
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid var(--text-color);
        `;
        tooltipEl.appendChild(arrow);
        
        document.body.appendChild(tooltipEl);
      }
      
      function showTooltip() {
        if (!tooltipEl) createTooltip();
        
        const rect = trigger.getBoundingClientRect();
        tooltipEl.style.top = rect.top + window.pageYOffset - tooltipEl.offsetHeight - 8 + 'px';
        tooltipEl.style.left = rect.left + window.pageXOffset + rect.width / 2 + 'px';
        tooltipEl.style.opacity = '1';
      }
      
      function hideTooltip() {
        if (tooltipEl) {
          tooltipEl.style.opacity = '0';
          setTimeout(() => {
            if (tooltipEl && tooltipEl.parentNode) {
              tooltipEl.parentNode.removeChild(tooltipEl);
              tooltipEl = null;
            }
          }, 150);
        }
      }
      
      // Mouse events
      trigger.addEventListener('mouseenter', showTooltip);
      trigger.addEventListener('mouseleave', hideTooltip);
      
      // Focus events for accessibility
      trigger.addEventListener('focus', showTooltip);
      trigger.addEventListener('blur', hideTooltip);
    });
  },
  
  // Initialize image gallery/lightbox
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
      z-index: var(--z-index-modal);
      opacity: 0;
      animation: fadeIn 0.3s ease-out forwards;
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
    img.alt = caption || 'Gallery image';
    img.style.cssText = `
      max-width: 100%;
      max-height: 80vh;
      display: block;
      margin: 0 auto;
      border-radius: var(--border-radius-md);
    `;
    
    // Create caption
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
      z-index: var(--z-index-modal);
    `;
    closeBtn.addEventListener('click', function() {
      document.body.removeChild(overlay);
      document.body.style.overflow = '';
    });
    
    lightboxContent.appendChild(closeBtn);
    lightboxContent.appendChild(img);
    overlay.appendChild(lightboxContent);
    
    // Close on overlay click
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
      }
    });
    
    // Close with escape key
    function handleEscKey(e) {
      if (e.key === 'Escape') {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscKey);
      }
    }
    document.addEventListener('keydown', handleEscKey);
    
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    
    // Add fade-in animation
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
  },
  
  // Initialize table filtering
  initTableFiltering: function() {
    const filterInputs = document.querySelectorAll('.filter-input');
    
    filterInputs.forEach(input => {
      const table = input.closest('.table-container')?.querySelector('.filterable-table') || 
                   document.querySelector(input.getAttribute('data-table-selector'));
      
      if (!table) return;
      
      const rows = table.querySelectorAll('tbody tr');
      
      input.addEventListener('input', Utils.debounce(function() {
        const filterValue = this.value.toLowerCase();
        
        rows.forEach(row => {
          const rowText = row.textContent.toLowerCase();
          const matches = rowText.includes(filterValue);
          
          row.style.display = matches ? '' : 'none';
        });
      }, 300));
    });
  },
  
  // Initialize search functionality
  initSearch: function() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
      const searchResults = input.parentElement.querySelector('.search-results') ||
                           document.querySelector(input.getAttribute('data-results-selector'));
      
      input.addEventListener('input', Utils.debounce(function() {
        const query = this.value.trim();
        
        if (query.length < 2) {
          if (searchResults) searchResults.style.display = 'none';
          return;
        }
        
        // In a real implementation, this would call an API
        // For now, we'll simulate search results
        Components.performSearch(query, searchResults);
      }, 500));
    });
  },
  
  performSearch: function(query, resultsContainer) {
    if (!resultsContainer) return;
    
    // Mock search results - in real implementation, this would be API call
    const mockResults = [
      { title: `Result 1 for "${query}"`, url: '#', description: 'This is a sample search result' },
      { title: `Product related to "${query}"`, url: '#', description: 'Another search result' },
      { title: `Application note about ${query}`, url: '#', description: 'Technical document result' }
    ];
    
    let resultsHtml = '<ul class="search-results-list">';
    
    mockResults.forEach(result => {
      resultsHtml += `
        <li class="search-result-item">
          <a href="${result.url}">
            <h4>${result.title}</h4>
            <p>${result.description}</p>
          </a>
        </li>
      `;
    });
    
    resultsHtml += '</ul>';
    
    resultsContainer.innerHTML = resultsHtml;
    resultsContainer.style.display = 'block';
    
    // Add click handler to hide results when clicking outside
    document.addEventListener('click', function hideResults(e) {
      if (!resultsContainer.contains(e.target) && !e.target.classList.contains('search-input')) {
        resultsContainer.style.display = 'none';
        document.removeEventListener('click', hideResults);
      }
    });
  },
  
  // Initialize form validation
  initFormValidation: function() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
      // Prevent multiple initialization
      if (form.dataset.validated) return;
      form.dataset.validated = 'true';
      
      form.addEventListener('submit', function(e) {
        if (!Components.validateForm(this)) {
          e.preventDefault();
        }
      });
      
      // Real-time validation for required fields
      const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
      
      requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
          Components.validateField(this);
        });
        
        field.addEventListener('input', function() {
          // Remove error state when user starts typing
          this.classList.remove('error');
          const errorDiv = this.parentNode.querySelector('.field-error');
          if (errorDiv) errorDiv.style.display = 'none';
        });
      });
    });
  },
  
  validateForm: function(form) {
    const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!Components.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  },
  
  validateField: function(field) {
    let isValid = true;
    let errorMsg = '';
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMsg = 'This field is required';
    }
    // Validate email format
    else if (field.type === 'email' && field.value && !Components.isValidEmail(field.value)) {
      isValid = false;
      errorMsg = 'Please enter a valid email address';
    }
    // Validate phone format
    else if (field.type === 'tel' && field.value && !Components.isValidPhone(field.value)) {
      isValid = false;
      errorMsg = 'Please enter a valid phone number';
    }
    // Validate URL format
    else if (field.type === 'url' && field.value && !Components.isValidUrl(field.value)) {
      isValid = false;
      errorMsg = 'Please enter a valid URL';
    }
    
    // Show error message
    field.classList.toggle('error', !isValid);
    Components.showFieldError(field, errorMsg);
    
    return isValid;
  },
  
  isValidEmail: function(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  
  isValidPhone: function(phone) {
    // Basic phone validation (can be adjusted based on requirements)
    const regex = /^[\+]?[1-9][\d]{0,15}$/;
    return regex.test(phone.replace(/[\s\-\(\)]/g, ''));
  },
  
  isValidUrl: function(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
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
        display: ${msg ? 'block' : 'none'};
      `;
      field.parentNode.appendChild(errorEl);
    }
    
    errorEl.textContent = msg;
    errorEl.style.display = msg ? 'block' : 'none';
  },
  
  // Initialize lazy loading for images
  initLazyLoading: function() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Load WebP if supported, fallback to regular format
            if (img.dataset.webp && Components.isWebPSupported()) {
              img.src = img.dataset.webp;
            } else if (img.dataset.src) {
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
  
  // Check WebP support
  isWebPSupported: function() {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('webp') > -1;
  },
  
  // Initialize smooth scrolling
  initSmoothScrolling: function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !document.querySelector(targetId)) return;
        
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const offsetPosition = targetElement.offsetTop - 80; // Account for fixed header
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  },
  
  // Initialize scroll animations
  initScrollAnimations: function() {
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
      
      // Observe elements that should animate on scroll
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }
  },
  
  // Initialize countdown timers
  initCountdownTimers: function() {
    const countdownElements = document.querySelectorAll('[data-countdown]');
    
    countdownElements.forEach(element => {
      const endTime = new Date(element.getAttribute('data-countdown')).getTime();
      
      function updateCountdown() {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        if (distance <= 0) {
          element.innerHTML = 'EXPIRED';
          return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        element.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
      
      updateCountdown();
      setInterval(updateCountdown, 1000);
    });
  },
  
  // Initialize product comparison functionality
  initProductComparison: function() {
    const compareCheckboxes = document.querySelectorAll('.compare-checkbox');
    
    compareCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const productId = this.value;
        const selectedProducts = JSON.parse(localStorage.getItem('comparedProducts') || '[]');
        
        if (this.checked) {
          if (!selectedProducts.includes(productId)) {
            selectedProducts.push(productId);
          }
        } else {
          const index = selectedProducts.indexOf(productId);
          if (index > -1) {
            selectedProducts.splice(index, 1);
          }
        }
        
        localStorage.setItem('comparedProducts', JSON.stringify(selectedProducts));
        Components.updateCompareButton();
      });
    });
    
    Components.updateCompareButton();
  },
  
  updateCompareButton: function() {
    const selectedProducts = JSON.parse(localStorage.getItem('comparedProducts') || '[]');
    const compareBtn = document.querySelector('.compare-products-btn');
    
    if (compareBtn) {
      compareBtn.textContent = `Compare Products (${selectedProducts.length})`;
      compareBtn.disabled = selectedProducts.length < 2;
      
      if (selectedProducts.length >= 2) {
        compareBtn.classList.remove('disabled');
      } else {
        compareBtn.classList.add('disabled');
      }
    }
  },
  
  // Initialize rating system
  initRatings: function() {
    const ratingContainers = document.querySelectorAll('.rating');
    
    ratingContainers.forEach(container => {
      const ratingValue = parseFloat(container.getAttribute('data-rating'));
      const maxRating = parseInt(container.getAttribute('data-max') || '5');
      const readonly = container.classList.contains('readonly');
      
      // Clear existing stars
      container.innerHTML = '';
      
      // Create stars
      for (let i = 1; i <= maxRating; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.innerHTML = '★';
        star.style.cursor = readonly ? 'default' : 'pointer';
        
        if (i <= ratingValue) {
          star.style.color = 'var(--warning-color)';
        } else {
          star.style.color = 'var(--border-color)';
        }
        
        if (!readonly) {
          star.addEventListener('click', function() {
            container.setAttribute('data-rating', i.toString());
            Components.updateRatings(container);
          });
          
          star.addEventListener('mouseover', function() {
            Components.highlightStars(container, i);
          });
          
          star.addEventListener('mouseout', function() {
            Components.updateRatings(container);
          });
        }
        
        container.appendChild(star);
      }
    });
  },
  
  updateRatings: function(container) {
    const ratingValue = parseFloat(container.getAttribute('data-rating'));
    const maxRating = parseInt(container.getAttribute('data-max') || '5');
    const stars = container.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
      if (index + 1 <= ratingValue) {
        star.style.color = 'var(--warning-color)';
      } else {
        star.style.color = 'var(--border-color)';
      }
    });
  },
  
  highlightStars: function(container, upToIndex) {
    const stars = container.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
      if (index + 1 <= upToIndex) {
        star.style.color = 'var(--warning-color-light)';
      } else {
        star.style.color = 'var(--border-color)';
      }
    });
  },
  
  // Initialize parallax effect
  initParallax: function() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if ('IntersectionObserver' in window) {
      const parallaxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const speed = entry.target.getAttribute('data-parallax-speed') || '0.5';
            const yPos = -(entry.boundingClientRect.top * speed);
            
            entry.target.style.transform = `translateY(${yPos}px)`;
          }
        });
      });
      
      parallaxElements.forEach(el => {
        parallaxObserver.observe(el);
      });
    }
  }
};