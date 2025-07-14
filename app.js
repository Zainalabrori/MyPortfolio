// Main application JavaScript for portfolio website
// Handles all interactive functionality and dynamic content rendering

class PortfolioApp {
    constructor() {
        this.init();
        console.log('Portfolio app initialized');
    }

    init() {
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
            this.renderSkills();
            this.renderProjects();
            this.renderExperience();
            this.setupSmoothScrolling();
            this.setupMobileMenu();
            this.setupContactForm();
            this.setupAnimations();
            console.log('All components initialized');
        });
    }

    setupEventListeners() {
        // Print button functionality
        const printBtn = document.getElementById('printBtn');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                console.log('Print button clicked');
                this.showPrintModal();
            });
        }

        // Navigation active state
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                this.setActiveNavLink(link);
                console.log('Navigation clicked:', targetId);
            });
        });

        // Scroll spy for navigation
        window.addEventListener('scroll', () => {
            this.handleScrollSpy();
        });
    }

    renderSkills() {
        const container = document.getElementById('skillsContainer');
        if (!container) return;

        console.log('Rendering skills section');
        
        container.innerHTML = portfolioData.skills.map(category => `
            <div class="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
                <div class="flex items-center mb-4">
                    <i class="${category.icon} text-2xl text-blue-600 mr-3"></i>
                    <h3 class="text-xl font-bold text-gray-800">${category.category}</h3>
                </div>
                <div class="space-y-3">
                    ${category.skills.map(skill => `
                        <div class="skill-item">
                            <div class="flex justify-between mb-1">
                                <span class="text-sm font-medium text-gray-700">${skill.name}</span>
                                <span class="text-sm text-gray-500">${skill.level}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-600 h-2 rounded-full transition-all duration-1000 skill-bar" 
                                     style="width: 0%" data-width="${skill.level}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        // Animate skill bars when they come into view
        this.animateSkillBars();
    }

    renderProjects() {
        const container = document.getElementById('projectsContainer');
        if (!container) return;

        console.log('Rendering projects section');
        
        container.innerHTML = portfolioData.projects.map(project => `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 project-card">
                <div class="relative overflow-hidden group">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110">
                    <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div class="flex space-x-4">
                            <a href="${project.github}" target="_blank" class="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <i class="fab fa-github mr-2"></i>Code
                            </a>
                            <a href="${project.live}" target="_blank" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                <i class="fas fa-external-link-alt mr-2"></i>Live
                            </a>
                        </div>
                    </div>
                    ${project.featured ? '<div class="absolute top-2 right-2 bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-xs font-bold">Featured</div>' : ''}
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">${project.title}</h3>
                    <p class="text-gray-600 mb-4">${project.description}</p>
                    <div class="flex flex-wrap gap-2">
                        ${project.technologies.map(tech => `
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">${tech}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // Add click analytics
        container.querySelectorAll('.project-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                console.log('Project card clicked:', portfolioData.projects[index].title);
            });
        });
    }

    renderExperience() {
        const container = document.getElementById('experienceContainer');
        if (!container) return;

        console.log('Rendering experience section');
        
        container.innerHTML = portfolioData.experience.map((job, index) => `
            <div class="relative experience-item mb-12">
                <div class="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full z-10"></div>
                <div class="ml-8 bg-white p-6 rounded-lg shadow-lg">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                            <h3 class="text-xl font-bold text-gray-800">${job.position}</h3>
                            <p class="text-blue-600 font-semibold">${job.company}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-gray-600">${job.duration}</p>
                            <p class="text-gray-500 text-sm">${job.location}</p>
                        </div>
                    </div>
                    <p class="text-gray-600 mb-4">${job.description}</p>
                    <div class="mb-4">
                        <h4 class="font-semibold text-gray-800 mb-2">Key Achievements:</h4>
                        <ul class="list-disc list-inside text-gray-600 space-y-1">
                            ${job.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        ${job.technologies.map(tech => `
                            <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">${tech}</span>
                        `).join('')}
                    </div>
                </div>
                ${index < portfolioData.experience.length - 1 ? 
                    '<div class="absolute left-2 top-4 bottom-0 w-0.5 bg-gray-300"></div>' : ''}
            </div>
        `).join('');
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
        console.log('Skill bar animations setup complete');
    }

    setupSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80; // Account for fixed navbar
            const elementPosition = element.offsetTop - offset;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
            
            console.log('Scrolled to section:', sectionId);
        }
    }

    setActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
            link.classList.add('text-gray-700');
        });
        
        activeLink.classList.remove('text-gray-700');
        activeLink.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
    }

    handleScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const offset = 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
            link.classList.add('text-gray-700');
            
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.remove('text-gray-700');
                link.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
            }
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                console.log('Mobile menu toggled');
            });
            
            // Close mobile menu when clicking on links
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            // e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            console.log('Contact form submitted:', formData);
            
            // Simulate form submission
            this.showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white transform transition-all duration-300 ${
            type === 'success' ? 'bg-green-600' : 
            type === 'error' ? 'bg-red-600' : 
            'bg-blue-600'
        }`;
        notification.textContent = message;
        notification.style.transform = 'translateX(100%)';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
        
        console.log('Notification shown:', message, type);
    }

    setupAnimations() {
        // Fade in animation for elements
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeIn');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.project-card, .experience-item, .skill-item');
        animateElements.forEach(el => observer.observe(el));
        
        console.log('Animations setup complete');
    }

    showPrintModal() {
        const modal = document.getElementById('printModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            console.log('Print modal opened');
        }
    }

    hidePrintModal() {
        const modal = document.getElementById('printModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            console.log('Print modal closed');
        }
    }

    // Analytics tracking
    trackEvent(eventName, eventData = {}) {
        console.log('Event tracked:', eventName, eventData);
        // In production, this would send data to analytics service
        // Example: gtag('event', eventName, eventData);
    }

    // Performance monitoring
    measurePerformance() {
        if (performance.mark) {
            performance.mark('portfolio-app-start');
            
            window.addEventListener('load', () => {
                performance.mark('portfolio-app-end');
                performance.measure('portfolio-app-load', 'portfolio-app-start', 'portfolio-app-end');
                
                const measure = performance.getEntriesByName('portfolio-app-load')[0];
                console.log('Portfolio app load time:', measure.duration, 'ms');
            });
        }
    }
}

// Initialize the portfolio app
const portfolioApp = new PortfolioApp();
portfolioApp.measurePerformance();

// Export for debugging
window.portfolioApp = portfolioApp;

// Global error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio app error:', e.error);
    // In production, send to error tracking service
});

// Service Worker registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}