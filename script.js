// Modern JavaScript for landing page functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Performance optimization: Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preconnect';
    preloadLink.href = 'https://youtube.com';
    document.head.appendChild(preloadLink);
    
    // Get DOM elements
    const ctaButton = document.querySelector('.cta-button');
    const adBanners = document.querySelectorAll('.ad-banner');
    const mainContent = document.querySelector('.main-content');
    const countdownContainer = document.getElementById('countdown-container');
    const countdownElement = document.getElementById('countdown');
    const countdownText = document.getElementById('countdown-text');
    
    // 5-second countdown before button appears
    if (ctaButton && countdownElement) {
        let timeLeft = 5;
        
        // Update countdown every second
        const countdownInterval = setInterval(() => {
            timeLeft--;
            countdownElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                
                // Hide countdown and show button
                countdownContainer.style.opacity = '0';
                countdownContainer.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    countdownContainer.style.display = 'none';
                    ctaButton.classList.add('show');
                    console.log('Watch Now button appeared after 5-second countdown');
                }, 300);
            }
        }, 1000);
    }
    
    // Enhanced CTA button interactions
    if (ctaButton) {
        // Add click tracking and analytics
        ctaButton.addEventListener('click', function(e) {
            // Track click event (placeholder for analytics)
            console.log('CTA button clicked - redirecting to YouTube');
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add keyboard accessibility
        ctaButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Ad banner hover effects and lazy loading simulation
    adBanners.forEach((banner, index) => {
        // Add hover effects
        banner.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });
        
        banner.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
        
        // Simulate lazy loading for ad content
        setTimeout(() => {
            banner.style.opacity = '1';
            banner.style.transition = 'opacity 0.5s ease';
        }, 200 * (index + 1));
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    if (mainContent) {
        observer.observe(mainContent);
    }
    
    // Smooth scroll behavior for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            }, 0);
        });
    }
    
    // Mobile touch optimizations
    if ('ontouchstart' in window) {
        // Add touch feedback for mobile devices
        ctaButton?.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        ctaButton?.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    }
    
    // Accessibility improvements
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    
    // Add focus indicators for keyboard navigation
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #667eea';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Error handling for external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            try {
                // Ensure external links open in new tab
                if (!this.target) {
                    this.target = '_blank';
                    this.rel = 'noopener noreferrer';
                }
            } catch (error) {
                console.warn('Error handling external link:', error);
            }
        });
    });
    
});

// Utility functions
const utils = {
    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export utils for potential future use
window.landingPageUtils = utils;

