// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }

  // Header Scroll Effect
  const header = document.querySelector('.header-fixed');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // User Profile Dropdown
  const userProfileMenu = document.getElementById('userProfileMenu');
  
  if (userProfileMenu) {
    userProfileMenu.addEventListener('click', function(e) {
      const dropdown = this.querySelector('.dropdown-menu');
      dropdown.classList.toggle('active');
      e.stopPropagation();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
      const dropdown = userProfileMenu.querySelector('.dropdown-menu');
      if (dropdown) {
        dropdown.classList.remove('active');
      }
    });
  }

  // Initialize specific page functionality
  const currentPage = getCurrentPage();
  initPageSpecificFunctionality(currentPage);
});

// Utility Functions
function getCurrentPage() {
  const path = window.location.pathname;
  
  if (path.includes('search.html')) {
    return 'search';
  } else if (path.includes('detail.html')) {
    return 'detail';
  } else if (path.includes('checkout.html')) {
    return 'checkout';
  } else if (path.includes('dashboard.html')) {
    return 'dashboard';
  } else {
    return 'home';
  }
}

function initPageSpecificFunctionality(page) {
  switch (page) {
    case 'home':
      console.log('Home page initialized');
      break;
    case 'search':
      console.log('Search page initialized');
      break;
    case 'detail':
      console.log('Detail page initialized');
      break;
    case 'checkout':
      console.log('Checkout page initialized');
      break;
    case 'dashboard':
      console.log('Dashboard page initialized');
      break;
    default:
      console.log('Page initialized');
  }
}

// Function to create temporary SVG icons (placeholder)
function createIconPlaceholders() {
  const iconElements = document.querySelectorAll('[class^="icon-"]');
  
  iconElements.forEach(icon => {
    const iconClass = Array.from(icon.classList).find(cls => cls.startsWith('icon-'));
    const iconName = iconClass.replace('icon-', '');
    
    // Create icon content based on name
    switch (iconName) {
      case 'facebook':
        icon.textContent = 'f';
        break;
      case 'instagram':
        icon.textContent = 'ig';
        break;
      case 'twitter':
        icon.textContent = 't';
        break;
      case 'youtube':
        icon.textContent = 'yt';
        break;
      case 'search':
        icon.textContent = '🔍';
        break;
      case 'filter':
        icon.textContent = '⚙️';
        break;
      case 'location':
        icon.textContent = '📍';
        break;
      case 'calendar':
        icon.textContent = '📅';
        break;
      case 'users':
        icon.textContent = '👥';
        break;
      case 'ticket':
        icon.textContent = '🎫';
        break;
      case 'cancel':
        icon.textContent = '❌';
        break;
      case 'chat':
        icon.textContent = '💬';
        break;
      case 'heart':
        icon.textContent = '❤️';
        break;
      case 'settings':
        icon.textContent = '⚙️';
        break;
      case 'logout':
        icon.textContent = '🚪';
        break;
      case 'dashboard':
        icon.textContent = '📊';
        break;
      case 'history':
        icon.textContent = '🕒';
        break;
      case 'user':
        icon.textContent = '👤';
        break;
      case 'support':
        icon.textContent = '🛎️';
        break;
      case 'dropdown':
        icon.textContent = '▼';
        break;
      case 'arrow-right':
        icon.textContent = '→';
        break;
      case 'whatsapp':
        icon.textContent = 'wa';
        break;
      default:
        icon.textContent = '•';
    }
  });
}

// Execute icon placeholders on DOM content loaded
document.addEventListener('DOMContentLoaded', createIconPlaceholders);