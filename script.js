// API Configuration
const API_BASE_URL = '/api/v1';

const apiService = {
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('edja_token');
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const contentType = response.headers.get("content-type");
        let data;
        
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            const text = await response.text();
            console.error("Resposta não é JSON:", text);
            throw new Error(`Erro no servidor (${response.status}): ${response.statusText}`);
        }

        if (!response.ok) {
            throw new Error(data.mensagem || 'Erro na requisição');
        }
        return data;
    },

    auth: {
        async login(email, senha, captchaToken) {
            const data = await apiService.request('/auth/entrar', {
                method: 'POST',
                body: JSON.stringify({ email, senha, captchaToken }),
            });
            localStorage.setItem('edja_token', data.dados.token);
            localStorage.setItem('edja_user', JSON.stringify(data.dados));
            return data;
        },
        async register(userData) {
            return apiService.request('/auth/registrar', {
                method: 'POST',
                body: JSON.stringify(userData),
            });
        },
        async forgotPassword(email) {
            return apiService.request('/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email }),
            });
        },
        async resetPassword(token, novaSenha) {
            return apiService.request('/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify({ token, novaSenha }),
            });
        },
        logout() {
            localStorage.removeItem('edja_token');
            localStorage.removeItem('edja_user');
            window.location.reload();
        }
    },

    appointments: {
        async create(appointmentData) {
            return apiService.request('/agendamentos', {
                method: 'POST',
                body: JSON.stringify(appointmentData),
            });
        },
        async getMyAppointments() {
            return apiService.request('/agendamentos/meus');
        }
    },

    courses: {
        async list() {
            return apiService.request('/cursos');
        }
    }
};

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
    item.addEventListener('click', (e) => {
        // Remove active class from all nav links
        navItems.forEach(link => link.classList.remove('active'));
        // Add active class to the clicked nav link
        e.currentTarget.classList.add('active');

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

// Update active nav link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').substring(1) === current) {
            a.classList.add('active');
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
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    
                    // Add large class if it's one of the requested categories AND we are NOT in 'all' view
                    if ((category === 'category2' || category === 'category3') && category !== 'all') {
                        card.classList.add('large');
                    } else {
                        card.classList.remove('large');
                    }
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