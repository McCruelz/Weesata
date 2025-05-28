// Dashboard Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize dashboard navigation
  initializeDashboardNav();
  
  // Initialize profile edit functionality
  initializeProfileEdit();

  // Initialize trip history functionality
  initializeTripHistory();

  // Initialize wishlist functionality 
  initializeWishlist();

  // Initialize settings functionality
  initializeSettings();
});

function initializeDashboardNav() {
  const navLinks = document.querySelectorAll('.dashboard-nav a');
  const sections = document.querySelectorAll('.dashboard-section');
  
  if (!navLinks.length || !sections.length) return;
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the target section
      const targetId = this.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      
      // If target section exists
      if (targetSection) {
        // Hide all sections
        sections.forEach(section => {
          section.style.display = 'none';
          section.classList.remove('active');
        });
        
        // Show target section
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        
        // Update active nav link
        navLinks.forEach(navLink => {
          navLink.parentElement.classList.remove('active');
        });
        this.parentElement.classList.add('active');
      }
    });
  });
}

function initializeProfileEdit() {
  const editProfileBtn = document.querySelector('.btn-edit-profile');
  
  if (!editProfileBtn) return;
  
  editProfileBtn.addEventListener('click', function() {
    // Get all profile fields
    const profileFields = document.querySelectorAll('.profile-field p');
    
    // Determine if we're in edit mode
    const isEditing = this.textContent.includes('Simpan');
    
    if (isEditing) {
      // Save changes
      saveProfileChanges();
      this.textContent = 'Edit Profil';
    } else {
      // Enter edit mode
      enterEditMode();
      this.textContent = 'Simpan Perubahan';
    }
  });
}

function initializeTripHistory() {
  const filterButtons = document.querySelectorAll('.history-filter button');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      // In a real app, this would filter the trips
    });
  });
}

function initializeWishlist() {
  const removeButtons = document.querySelectorAll('.wishlist-remove');
  
  removeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const wishlistItem = this.closest('.wishlist-item');
      wishlistItem.remove();
      // In a real app, this would also update the database
    });
  });
}

function initializeSettings() {
  const notificationToggles = document.querySelectorAll('.notification-toggle');
  
  notificationToggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
      // In a real app, this would update user preferences
      console.log('Notification setting changed:', this.checked);
    });
  });

  // Handle password change form
  const passwordForm = document.getElementById('passwordChangeForm');
  if (passwordForm) {
    passwordForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // In a real app, this would handle password change
      alert('Password berhasil diubah!');
      this.reset();
    });
  }
}

function enterEditMode() {
  const profileFields = document.querySelectorAll('.profile-field p');
  
  profileFields.forEach(field => {
    const currentValue = field.textContent;
    const fieldLabel = field.previousElementSibling.textContent;
    
    // Don't make KTP fully editable
    if (fieldLabel.includes('KTP')) {
      return;
    }
    
    // Create input element based on field type
    let inputElement;
    
    if (fieldLabel.includes('Tanggal')) {
      inputElement = document.createElement('input');
      inputElement.type = 'date';
      
      // Convert date format (e.g., "15 April 1990" to "1990-04-15")
      const dateParts = currentValue.split(' ');
      if (dateParts.length === 3) {
        const day = dateParts[0];
        const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const month = monthNames.indexOf(dateParts[1]) + 1;
        const year = dateParts[2];
        
        // Format date for input
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;
        inputElement.value = `${year}-${formattedMonth}-${formattedDay}`;
      } else {
        inputElement.value = '';
      }
    } else if (fieldLabel.includes('Jenis Kelamin')) {
      inputElement = document.createElement('select');
      
      const options = ['Laki-laki', 'Perempuan'];
      options.forEach(option => {
        const optElement = document.createElement('option');
        optElement.value = option;
        optElement.textContent = option;
        if (option === currentValue) {
          optElement.selected = true;
        }
        inputElement.appendChild(optElement);
      });
    } else {
      inputElement = document.createElement('input');
      inputElement.type = 'text';
      inputElement.value = currentValue;
    }
    
    // Set input classes
    inputElement.className = 'edit-field';
    
    // Replace paragraph with input
    field.parentNode.replaceChild(inputElement, field);
  });
}

function saveProfileChanges() {
  const inputFields = document.querySelectorAll('.profile-field .edit-field');
  
  inputFields.forEach(input => {
    // Create paragraph element
    const paragraph = document.createElement('p');
    
    // Get label to determine formatting
    const label = input.previousElementSibling.textContent;
    
    // Format value based on field type
    if (input.type === 'date') {
      // Format date as "15 April 1990"
      const date = new Date(input.value);
      if (!isNaN(date.getTime())) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        paragraph.textContent = date.toLocaleDateString('id-ID', options);
      } else {
        paragraph.textContent = '';
      }
    } else {
      paragraph.textContent = input.value || '';
    }
    
    // Replace input with paragraph
    input.parentNode.replaceChild(paragraph, input);
  });
}