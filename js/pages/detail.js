// Detail Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize gallery functionality
  initializeGallery();
  
  // Initialize booking calculator
  initializeBookingCalculator();
  
  // Initialize review functionality
  initializeReviews();
});

function initializeGallery() {
  // Set up image gallery functionality
  const thumbnails = document.querySelectorAll('.thumbnail-images img');
  const mainImage = document.getElementById('mainImage');
  
  if (!thumbnails || !mainImage) return;
  
  // Add click event to thumbnails
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      // Update main image
      mainImage.src = this.src;
      
      // Update active state
      thumbnails.forEach(thumb => thumb.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

function initializeBookingCalculator() {
  const bookingDate = document.getElementById('bookingDate');
  const bookingPeople = document.getElementById('bookingPeople');
  const packageOptions = document.querySelectorAll('input[name="package"]');
  const totalPrice = document.querySelector('.total-price');
  
  if (!bookingDate || !bookingPeople || !packageOptions.length || !totalPrice) return;
  
  // Set minimum date to today for booking date
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  
  if (mm < 10) mm = '0' + mm;
  if (dd < 10) dd = '0' + dd;
  
  const todayStr = yyyy + '-' + mm + '-' + dd;
  bookingDate.min = todayStr;
  
  // Default date (e.g., 2 weeks from today)
  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
  
  const twoWeeksLaterYYYY = twoWeeksLater.getFullYear();
  let twoWeeksLaterMM = twoWeeksLater.getMonth() + 1;
  let twoWeeksLaterDD = twoWeeksLater.getDate();
  
  if (twoWeeksLaterMM < 10) twoWeeksLaterMM = '0' + twoWeeksLaterMM;
  if (twoWeeksLaterDD < 10) twoWeeksLaterDD = '0' + twoWeeksLaterDD;
  
  const twoWeeksLaterStr = twoWeeksLaterYYYY + '-' + twoWeeksLaterMM + '-' + twoWeeksLaterDD;
  bookingDate.value = twoWeeksLaterStr;
  
  // Function to calculate total price
  function calculateTotalPrice() {
    // Get selected package price
    let packagePrice = 0;
    packageOptions.forEach(option => {
      if (option.checked) {
        const priceText = option.parentNode.querySelector('.package-price').textContent;
        // Extract number from price text (e.g., "Rp 2.500.000" -> 2500000)
        packagePrice = parseInt(priceText.replace(/[^0-9]/g, ''));
      }
    });
    
    // Get number of people
    const numberOfPeople = parseInt(bookingPeople.value);
    
    // Calculate total
    let total = packagePrice * numberOfPeople;
    
    // Format total as currency
    const formattedTotal = formatCurrency(total);
    totalPrice.textContent = formattedTotal;
  }
  
  // Calculate initial price
  calculateTotalPrice();
  
  // Add event listeners for recalculating price
  bookingPeople.addEventListener('change', calculateTotalPrice);
  
  packageOptions.forEach(option => {
    option.addEventListener('change', calculateTotalPrice);
  });
  
  // Currency formatter
  function formatCurrency(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
  }
}

// Function to change main image when thumbnail is clicked
function changeMainImage(src) {
  const mainImage = document.getElementById('mainImage');
  if (mainImage) {
    mainImage.src = src;
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    thumbnails.forEach(thumbnail => {
      if (thumbnail.src === src) {
        thumbnail.classList.add('active');
      } else {
        thumbnail.classList.remove('active');
      }
    });
  }
}

function initializeReviews() {
  const loadMoreBtn = document.querySelector('.btn-load-more');
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // In a real app, you would load more reviews from an API
      // For this demo, we'll add a few more reviews dynamically
      const reviewList = document.querySelector('.review-list');
      
      const newReviews = [
        {
          name: 'Ahmad Rizal',
          image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
          date: 'Mei 2025',
          rating: 5,
          text: '"Tempat ini luar biasa! Pantainya bersih, airnya jernih, dan pemandangan bawah lautnya tidak ada duanya. Semua fasilitas berfungsi dengan baik dan petugasnya sangat membantu."'
        },
        {
          name: 'Linda Wijaya',
          image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
          date: 'April 2025',
          rating: 4,
          text: '"Pengalaman yang sangat menyenangkan. Hanya saja makanannya sedikit kurang bervariasi, tapi pemandangannya menebus segalanya. Akan kembali lagi suatu saat!"'
        }
      ];
      
      // Add new reviews to the DOM
      newReviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        // Create stars based on rating
        let stars = '';
        for (let i = 0; i < 5; i++) {
          if (i < review.rating) {
            stars += '★';
          } else {
            stars += '☆';
          }
        }
        
        reviewItem.innerHTML = `
          <div class="review-header">
            <div class="review-user">
              <img src="${review.image}" alt="${review.name}">
              <div class="review-user-info">
                <h4>${review.name}</h4>
                <span class="review-date">${review.date}</span>
              </div>
            </div>
            <div class="review-rating">
              <span class="stars">${stars}</span>
            </div>
          </div>
          <p class="review-text">${review.text}</p>
        `;
        
        reviewList.appendChild(reviewItem);
      });
      
      // Hide the button after clicking
      this.style.display = 'none';
    });
  }
}