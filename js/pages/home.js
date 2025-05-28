// Home Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Carousel Functionality
  initializeCarousel();
  
  // Search Box Functionality
  initializeSearch();
});

function initializeCarousel() {
  const carousel = document.getElementById('recommendationsCarousel');
  if (!carousel) return;
  
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  const carouselItems = carousel.querySelectorAll('.carousel-item');
  const itemCount = carouselItems.length;
  
  // Determine how many items to show based on viewport width
  let itemsToShow = 4;
  
  function updateItemsToShow() {
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 576) {
      itemsToShow = 1;
    } else if (viewportWidth < 768) {
      itemsToShow = 2;
    } else if (viewportWidth < 992) {
      itemsToShow = 3;
    } else {
      itemsToShow = 4;
    }
  }
  
  updateItemsToShow();
  
  // Add resize listener to update itemsToShow when window is resized
  window.addEventListener('resize', updateItemsToShow);
  
  let currentIndex = 0;
  
  function updateCarousel() {
    // Calculate the position to translate the carousel
    const itemWidth = carousel.offsetWidth / itemsToShow;
    const translateX = -currentIndex * itemWidth;
    
    carousel.style.transform = `translateX(${translateX}px)`;
  }
  
  // Initialize the carousel
  updateCarousel();
  
  // Next button functionality
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (currentIndex < itemCount - itemsToShow) {
        currentIndex++;
        updateCarousel();
      } else {
        // Loop back to the beginning if at the end
        currentIndex = 0;
        updateCarousel();
      }
    });
  }
  
  // Previous button functionality
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      } else {
        // Loop to the end if at the beginning
        currentIndex = itemCount - itemsToShow;
        updateCarousel();
      }
    });
  }
  
  // Auto-play carousel (optional)
  let autoplayInterval;
  
  function startAutoplay() {
    autoplayInterval = setInterval(function() {
      if (currentIndex < itemCount - itemsToShow) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    }, 5000);
  }
  
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  // Start autoplay
  startAutoplay();
  
  // Pause autoplay on hover
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  
  // Stop autoplay on touch
  carousel.addEventListener('touchstart', stopAutoplay, { passive: true });
}

function initializeSearch() {
  const searchButton = document.querySelector('.btn-search');
  
  if (searchButton) {
    searchButton.addEventListener('click', function() {
      const destination = document.getElementById('destination').value;
      const date = document.getElementById('date').value;
      const people = document.getElementById('people').value;
      
      // Redirect to search page with parameters
      const searchParams = new URLSearchParams();
      if (destination) searchParams.append('destination', destination);
      if (date) searchParams.append('date', date);
      if (people) searchParams.append('people', people);
      
      const searchQuery = searchParams.toString() ? `?${searchParams.toString()}` : '';
      window.location.href = `search.html${searchQuery}`;
    });
  }
  
  // Set minimum date to today for date picker
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    
    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;
    
    const todayStr = yyyy + '-' + mm + '-' + dd;
    dateInput.min = todayStr;
    
    // Set default date to one week from today
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const nextWeekYYYY = nextWeek.getFullYear();
    let nextWeekMM = nextWeek.getMonth() + 1;
    let nextWeekDD = nextWeek.getDate();
    
    if (nextWeekMM < 10) nextWeekMM = '0' + nextWeekMM;
    if (nextWeekDD < 10) nextWeekDD = '0' + nextWeekDD;
    
    const nextWeekStr = nextWeekYYYY + '-' + nextWeekMM + '-' + nextWeekDD;
    dateInput.value = nextWeekStr;
  }
}