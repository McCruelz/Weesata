// Search Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Filter Sidebar Functionality
  initializeFilterSidebar();
  
  // Initialize Price Range Slider
  initializePriceRangeSliders();
  
  // Initialize search from URL parameters
  initializeFromURLParams();
  
  // Handle filter application
  initializeFilterActions();
});

function initializeFilterSidebar() {
  const showFiltersBtn = document.getElementById('showFiltersMobile');
  const closeFiltersBtn = document.getElementById('closeFiltersMobile');
  const filterSidebar = document.getElementById('filterSidebar');
  const body = document.body;
  
  if (showFiltersBtn && filterSidebar) {
    showFiltersBtn.addEventListener('click', function() {
      filterSidebar.classList.add('active');
      // Create overlay
      const overlay = document.createElement('div');
      overlay.className = 'filter-overlay active';
      document.body.appendChild(overlay);
      
      // Close filters when overlay is clicked
      overlay.addEventListener('click', function() {
        filterSidebar.classList.remove('active');
        this.remove();
      });
      
      // Prevent body scrolling
      body.style.overflow = 'hidden';
    });
  }
  
  if (closeFiltersBtn && filterSidebar) {
    closeFiltersBtn.addEventListener('click', function() {
      filterSidebar.classList.remove('active');
      // Remove overlay
      const overlay = document.querySelector('.filter-overlay');
      if (overlay) overlay.remove();
      
      // Re-enable body scrolling
      body.style.overflow = '';
    });
  }
}

function initializePriceRangeSliders() {
  const minSlider = document.getElementById('priceSliderMin');
  const maxSlider = document.getElementById('priceSliderMax');
  const minInput = document.getElementById('minPrice');
  const maxInput = document.getElementById('maxPrice');
  
  if (minSlider && maxSlider && minInput && maxInput) {
    // Update input when sliders change
    minSlider.addEventListener('input', function() {
      const minValue = parseInt(minSlider.value);
      const maxValue = parseInt(maxSlider.value);
      
      if (minValue > maxValue) {
        minSlider.value = maxValue;
        minInput.value = maxValue;
      } else {
        minInput.value = minValue;
      }
    });
    
    maxSlider.addEventListener('input', function() {
      const minValue = parseInt(minSlider.value);
      const maxValue = parseInt(maxSlider.value);
      
      if (maxValue < minValue) {
        maxSlider.value = minValue;
        maxInput.value = minValue;
      } else {
        maxInput.value = maxValue;
      }
    });
    
    // Update sliders when inputs change
    minInput.addEventListener('change', function() {
      const minValue = parseInt(minInput.value);
      const maxValue = parseInt(maxInput.value);
      
      if (minValue > maxValue) {
        minInput.value = maxValue;
        minSlider.value = maxValue;
      } else {
        minSlider.value = minValue;
      }
    });
    
    maxInput.addEventListener('change', function() {
      const minValue = parseInt(minInput.value);
      const maxValue = parseInt(maxInput.value);
      
      if (maxValue < minValue) {
        maxInput.value = minValue;
        maxSlider.value = minValue;
      } else {
        maxSlider.value = maxValue;
      }
    });
  }
}

function initializeFromURLParams() {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  
  // Set destination search input
  const destinationParam = urlParams.get('destination');
  const searchInput = document.getElementById('searchInput');
  if (destinationParam && searchInput) {
    searchInput.value = destinationParam;
  }
  
  // Set other filters from parameters if needed
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    categoryCheckboxes.forEach(checkbox => {
      if (checkbox.value === categoryParam) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    });
  }
  
  // Update result count based on filters
  updateResultCount();
}

function initializeFilterActions() {
  const applyFilterBtn = document.querySelector('.btn-apply-filter');
  const resetFilterBtn = document.querySelector('.btn-reset-filter');
  
  if (applyFilterBtn) {
    applyFilterBtn.addEventListener('click', function() {
      // In a real application, this would apply filters and update results
      // For this demo, we'll just show a filtered count
      updateResultCount(true);
      
      // Close the mobile filter sidebar if it's open
      const filterSidebar = document.getElementById('filterSidebar');
      if (filterSidebar && filterSidebar.classList.contains('active')) {
        filterSidebar.classList.remove('active');
        const overlay = document.querySelector('.filter-overlay');
        if (overlay) overlay.remove();
        document.body.style.overflow = '';
      }
    });
  }
  
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', function() {
      // Reset all checkboxes
      document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
      });
      
      // Reset radio buttons to "all"
      const allRatingRadio = document.querySelector('input[name="rating"][value="all"]');
      if (allRatingRadio) allRatingRadio.checked = true;
      
      // Reset price range
      const minSlider = document.getElementById('priceSliderMin');
      const maxSlider = document.getElementById('priceSliderMax');
      const minInput = document.getElementById('minPrice');
      const maxInput = document.getElementById('maxPrice');
      
      if (minSlider && maxSlider && minInput && maxInput) {
        minSlider.value = 0;
        maxSlider.value = 5000000;
        minInput.value = 0;
        maxInput.value = 5000000;
      }
      
      // Reset location select
      const provinceSelect = document.getElementById('provinceSelect');
      if (provinceSelect) provinceSelect.value = '';
      
      // Update results
      updateResultCount();
    });
  }
  
  // Handle sort by change
  const sortBySelect = document.getElementById('sortBy');
  if (sortBySelect) {
    sortBySelect.addEventListener('change', function() {
      // In a real application, this would sort the results
      // For this demo, we'll just log the sort option
      console.log('Sorting by:', this.value);
    });
  }
}

function updateResultCount(isFiltered = false) {
  const resultCountElem = document.getElementById('resultCount');
  if (resultCountElem) {
    // Simulate filtered results
    if (isFiltered) {
      const randomCount = Math.floor(Math.random() * 10) + 1;
      resultCountElem.textContent = randomCount.toString();
    } else {
      // Reset to default count
      resultCountElem.textContent = '16';
    }
  }
}