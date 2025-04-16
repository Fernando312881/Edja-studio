// Mobile Navigation Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const lines = document.querySelectorAll('.mobile-menu div');
        lines[0].classList.toggle('rotate-down');
        lines[1].classList.toggle('fade-out');
        lines[2].classList.toggle('rotate-up');
    });
}

// Close mobile menu when clicking on a nav link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            
            // Reset hamburger animation
            const lines = document.querySelectorAll('.mobile-menu div');
            lines[0].classList.remove('rotate-down');
            lines[1].classList.remove('fade-out');
            lines[2].classList.remove('rotate-up');
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Update toggle symbol
            const toggle = item.querySelector('.faq-toggle');
            if (item.classList.contains('active')) {
                toggle.textContent = '−'; // Minus sign
            } else {
                toggle.textContent = '+'; // Plus sign
            }
        });
    });
}

// Procedure Category Filtering
const categoryTabs = document.querySelectorAll('.category-tab');
const procedureCards = document.querySelectorAll('.procedure-card');

if (categoryTabs.length > 0 && procedureCards.length > 0) {
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            const category = tab.getAttribute('data-category');
            
            // Show/hide procedure cards based on category
            procedureCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .testimonial-card, .procedure-card, .value-card, .team-card, .certification-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate-in');
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .testimonial-card, .procedure-card, .value-card, .team-card, .certification-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .mobile-menu div {
            transition: all 0.3s ease;
        }
        
        .rotate-down {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .fade-out {
            opacity: 0;
        }
        
        .rotate-up {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    `;
    document.head.appendChild(style);
    
    // Trigger initial scroll event to show elements in view
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
});