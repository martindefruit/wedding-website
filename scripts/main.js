/*
 * EmailJS Setup Instructions:
 * 
 * 1. Sign up for free at https://www.emailjs.com/
 * 2. Go to Email Services and add your email service (Gmail, Outlook, etc.)
 * 3. Go to Email Templates and create a new template
 * 
 * Sample Email Template (Copy this into EmailJS):
 * 
 * Subject: New RSVP - {{guest_name}}
 * 
 * Hello!
 * 
 * You have received a new RSVP for your wedding:
 * 
 * Guest Name: {{guest_name}}
 * Attending: {{attending}}
 * Welcome Cocktail: {{welcome_cocktail}}
 * Shuttle to/from Hotel: {{shuttle}}
 * Plus One: {{plus_one}}
 * Dietary Restrictions: {{dietary_restrictions}}
 * 
 * Submitted on: {{submission_date}}
 * 
 * Template Variables (must match exactly):
 * - {{guest_name}}
 * - {{attending}}
 * - {{welcome_cocktail}}
 * - {{shuttle}}
 * - {{plus_one}}
 * - {{dietary_restrictions}}
 * - {{submission_date}}
 * 
 * 4. Get your Public Key from: https://dashboard.emailjs.com/admin/integration
 * 5. Get your Service ID and Template ID from: https://dashboard.emailjs.com/admin
 * 6. Replace the placeholder values in this file:
 *    - YOUR_PUBLIC_KEY (line ~50 and ~250)
 *    - YOUR_SERVICE_ID (line ~90)
 *    - YOUR_TEMPLATE_ID (line ~91)
 */

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Plus One Form Logic
const plusOneSelect = document.getElementById('plusOne');
const plusOneNameGroup = document.getElementById('plus-one-name-group');
const plusOneName = document.getElementById('plusOneName');

plusOneSelect.addEventListener('change', (e) => {
    if (e.target.value === 'yes') {
        plusOneNameGroup.style.display = 'block';
        plusOneName.setAttribute('required', 'required');
    } else {
        plusOneNameGroup.style.display = 'none';
        plusOneName.removeAttribute('required');
        plusOneName.value = '';
    }
});

// Initialize EmailJS
// TODO: Replace with your EmailJS Public Key
// Get it from: https://dashboard.emailjs.com/admin/integration
// Note: Initialize EmailJS after the script loads (will be done in DOMContentLoaded)

// Form Validation and Submission
const rsvpForm = document.getElementById('rsvp-form');
const formMessage = document.getElementById('form-message');
const submitBtn = rsvpForm.querySelector('.submit-btn');

rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(rsvpForm);
    const data = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Check if attending checkbox is checked
    const attendingCheckbox = document.getElementById('attending');
    data.attending = attendingCheckbox.checked ? 'yes' : 'no';
    
    // Validate required fields
    if (!data.guestName || !attendingCheckbox.checked) {
        showMessage('Please fill in your name and confirm you are coming.', 'error');
        return;
    }
    
    // Validate plus one if selected
    if (data.plusOne === 'yes') {
        if (!data.plusOneName) {
            showMessage('Please provide your plus one\'s full name.', 'error');
            return;
        }
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    showMessage('Sending your RSVP...', 'success');
    
    try {
        // Format plus one info
        const plusOneInfo = data.plusOne === 'yes' 
            ? `Yes - ${data.plusOneName}`
            : 'No';
        
        // Prepare email template parameters
        const templateParams = {
            guest_name: data.guestName,
            attending: data.attending === 'yes' ? 'Yes, I\'m coming!' : 'No',
            welcome_cocktail: data.welcomeCocktail || 'Not specified',
            shuttle: data.shuttle || 'Not specified',
            plus_one: plusOneInfo,
            dietary_restrictions: data.dietaryRestrictions || 'None',
            submission_date: new Date().toLocaleString()
        };
        
        // TODO: Replace with your EmailJS Service ID and Template ID
        // Get these from: https://dashboard.emailjs.com/admin
        const serviceId = 'service_s0hynku'; // Replace with your service ID
        const templateId = 'template_e436pjj'; // Replace with your template ID
        
        // Send email via EmailJS
        const response = await emailjs.send(serviceId, templateId, templateParams);
        console.log('EmailJS Response:', response);
        
        // Show success message
        showMessage('Thank you for your RSVP! We\'re looking forward to celebrating with you!', 'success');
        
        // Reset form
        rsvpForm.reset();
        plusOneNameGroup.style.display = 'none';
        plusOneName.removeAttribute('required');
        
    } catch (error) {
        console.error('EmailJS Error Details:', error);
        console.error('Error Code:', error?.code);
        console.error('Error Text:', error?.text);
        console.error('Error Status:', error?.status);
        
        // More detailed error message
        let errorMsg = 'Sorry, there was an error sending your RSVP. ';
        if (error?.text) {
            errorMsg += `Error: ${error.text}. `;
        }
        errorMsg += 'Please check the browser console for details or contact us directly.';
        showMessage(errorMsg, 'error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit RSVP';
    }
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Scroll-linked horizontal carousel
function initScrollCarousel() {
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryCarousel = document.querySelector('.gallery-carousel');
    
    if (!galleryContainer || !galleryCarousel) return;
    
    const totalImages = 7;
    const visibleImages = 4;
    const hiddenImages = totalImages - visibleImages;
    
    // Calculate max translation: we need to move by the width of hidden images
    // Each image is 25vw (100vw / 4 visible images)
    // Hidden images: 3 images = 3 * 25vw = 75vw
    // As percentage of container width (100vw): 75%
    const maxTranslateX = (hiddenImages / visibleImages) * 100;
    
    let ticking = false;
    
    function updateCarousel() {
        const containerRect = galleryContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const containerHeight = containerRect.height;
        
        // Calculate scroll progress through the gallery section
        // Progress starts when top of container reaches viewport
        // Progress ends when bottom of container reaches top of viewport
        let scrollProgress = 0;
        
        if (containerRect.top < windowHeight && containerRect.bottom > 0) {
            // Container is in viewport
            // Calculate how far through the scroll we are
            // Extend the scroll range to make movement slower (multiply by 2 for slower movement)
            const scrollStart = windowHeight; // When container top hits bottom of viewport
            const scrollEnd = -containerHeight; // When container bottom hits top of viewport
            const scrollRange = (scrollStart - scrollEnd) * 8; // Multiply by 2 to slow down
            const currentPosition = containerRect.top;
            
            scrollProgress = Math.max(0, Math.min(1, (scrollStart - currentPosition) / scrollRange));
        }
        
        // Translate carousel horizontally based on scroll progress
        // At progress 0: show first 4 images (translateX = 0%)
        // At progress 1: show last 4 images (translateX = maxTranslateX%)
        const translateX = scrollProgress * maxTranslateX;
        galleryCarousel.style.transform = `translateX(-${translateX}%)`;
        
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateCarousel);
            ticking = true;
        }
    }
    
    // Listen to scroll events
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial update
    updateCarousel();
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initScrollCarousel();
        // Initialize EmailJS after DOM is ready
        if (typeof emailjs !== 'undefined') {
            // TODO: Replace with your EmailJS Public Key
            emailjs.init("-id_iy_06E2L0hCGA"); // Replace with your actual public key
        }
    });
} else {
    initScrollCarousel();
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        // TODO: Replace with your EmailJS Public Key
        emailjs.init("-id_iy_06E2L0hCGA"); // Replace with your actual public key
    }
}

