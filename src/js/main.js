// Import our CSS
import '../css/style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website initialized');

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Update copyright year
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to nav items based on scroll position
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('header').offsetHeight;

        // Get all sections
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => observer.observe(el));
});

// Add some CSS for the reveal animations
const style = document.createElement('style');
style.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .reveal-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);