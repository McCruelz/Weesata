// Checkout Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize checkout steps navigation
  initializeCheckoutSteps();
  
  // Initialize promo code functionality
  initializePromoCode();
  
  // Initialize copy to clipboard functionality
  initializeCopyButtons();
});

function initializeCheckoutSteps() {
  const steps = document.querySelectorAll('.checkout-steps .step');
  const formSections = [
    document.getElementById('bookingForm').closest('.form-section'),
    document.getElementById('paymentSection'),
    document.getElementById('confirmationSection')
  ];
  
  const continueToPaymentBtn = document.getElementById('continueToPayment');
  const processPaymentBtn = document.getElementById('processPayment');
  
  // Continue to Payment Step
  if (continueToPaymentBtn) {
    continueToPaymentBtn.addEventListener('click', function() {
      // Validate form (in a real app, this would be more comprehensive)
      const nameInput = document.getElementById('fullName');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');
      
      if (!nameInput.value || !emailInput.value || !phoneInput.value) {
        alert('Silakan lengkapi semua informasi pemesan.');
        return;
      }
      
      // Move to step 2 (Payment)
      steps[0].classList.remove('active');
      steps[1].classList.add('active');
      steps[0].classList.add('completed');
      
      formSections[0].style.display = 'none';
      formSections[1].style.display = 'block';
      
      continueToPaymentBtn.style.display = 'none';
      processPaymentBtn.style.display = 'block';
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // Process Payment Button (finalize order)
  if (processPaymentBtn) {
    processPaymentBtn.addEventListener('click', function() {
      // In a real app, this would process the payment
      // For demo, we'll just show the confirmation
      steps[1].classList.remove('active');
      steps[2].classList.add('active');
      steps[1].classList.add('completed');
      
      formSections[1].style.display = 'none';
      formSections[2].style.display = 'block';
      
      processPaymentBtn.style.display = 'none';
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function initializePromoCode() {
  const promoInput = document.querySelector('.promo-code input');
  const promoButton = document.querySelector('.promo-code button');
  const priceBreakdown = document.querySelector('.price-breakdown');
  const totalPrice = document.querySelector('.total-value');
  
  if (!promoInput || !promoButton || !priceBreakdown || !totalPrice) return;
  
  promoButton.addEventListener('click', function() {
    const promoCode = promoInput.value.trim();
    
    if (promoCode) {
      // Check if promo is valid (for demo, "WEESATA25" is valid)
      if (promoCode.toUpperCase() === 'WEESATA25') {
        // Check if promo already applied
        const existingPromo = document.querySelector('.price-item.discount');
        if (!existingPromo) {
          // Calculate 25% discount (simplified)
          const currentTotalText = totalPrice.textContent;
          const currentTotal = parseInt(currentTotalText.replace(/[^0-9]/g, ''));
          const discountAmount = Math.round(currentTotal * 0.25);
          const newTotal = currentTotal - discountAmount;
          
          // Add discount line
          const discountElement = document.createElement('div');
          discountElement.className = 'price-item discount';
          discountElement.innerHTML = `
            <span class="item-name">Diskon Promo (WEESATA25)</span>
            <span class="item-value">- Rp ${discountAmount.toLocaleString('id-ID')}</span>
          `;
          
          // Insert before total
          const totalElement = document.querySelector('.price-total');
          priceBreakdown.insertBefore(discountElement, totalElement);
          
          // Update total price
          totalPrice.textContent = `Rp ${newTotal.toLocaleString('id-ID')}`;
          
          // Disable promo input
          promoInput.disabled = true;
          promoButton.disabled = true;
          
          // Show success message
          alert('Promo WEESATA25 berhasil diterapkan! Anda mendapatkan diskon 25%.');
        } else {
          alert('Promo sudah diterapkan.');
        }
      } else {
        alert('Kode promo tidak valid.');
      }
    } else {
      alert('Silakan masukkan kode promo.');
    }
  });
}

function initializeCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  if (copyButtons.length === 0) return;
  
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const textToCopy = this.getAttribute('data-clipboard-text');
      
      // Create temporary textarea to copy text
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      
      // Copy text
      textarea.select();
      document.execCommand('copy');
      
      // Remove temporary textarea
      document.body.removeChild(textarea);
      
      // Update button text temporarily
      const originalText = this.textContent;
      this.textContent = 'Tersalin!';
      
      // Reset button text after a delay
      setTimeout(() => {
        this.textContent = originalText;
      }, 2000);
    });
  });
}