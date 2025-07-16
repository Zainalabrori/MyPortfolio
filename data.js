// Data configuration for portfolio website
// This file contains all the dynamic content for the portfolio

const portfolioData = {
    // Personal Information
    personal: {
        name: "Zainal Abrori",
        title: "Fullstack Web & Mobile Developer",
        email: "zainalabrori.pro@gmail.com",
        phone: "+62 857-4575-0951",
        location: "Pamekasan, East Java, Indonesia",
        linkedin: "https://www.linkedin.com/in/zainal-abrori-bb242829b/",
        github: "https://github.com/Zainalabrori"
    },

    // Skills data with proficiency levels
    skills: [
        {
            category: "Frontend Development",
            icon: "fas fa-code",
            skills: [
                { name: "HTML", level: 100 },
                { name: "CSS", level: 90 },
                { name: "JAVASCRIPT", level: 90 },
                { name: "BOOTSTRAP", level: 100 },
                { name: "TAILWIND CSS", level: 90 },
                { name: "FLUTTER", level: 70 }
            ]
        },
        {
            category: "Backend Development",
            icon: "fas fa-palette",
            skills: [
                { name: "PYTHON", level: 70 },
                { name: "PHP", level: 90 },
                { name: "GOLANG", level: 70 },
                { name: "MYSQL", level: 90 },
                { name: "PHALCON", level: 70 },
                { name: "LARAVEL", level: 90 }
            ]
        },
        {
            category: "Tools & Technologies",
            icon: "fas fa-tools",
            skills: [
                { name: "VISUAL STUDIO CODE", level: 100 },
                { name: "GITBASH", level: 90 },
                { name: "GITHUB", level: 90 },
                { name: "POSTMAN", level: 90 },
                { name: "ZER0TIER", level: 70 },
                { name: "ANYDESK", level: 90 }
            ]
        },
        {
            category: "Soft Skills",
            icon: "fas fa-user-friends",
            skills: [
                { name: "PROBLEM SOLVING", level: 90 },
                { name: "SELF MANAGEMENT", level: 90 },
                { name: "WORKING WITH PEOPLE", level: 90 },
                { name: "TECHNOLOGY ADAPTATION", level: 90 }
            ]
        }
    ],

    // Projects portfolio
    projects: [
        {
            id: 1,
            title: "E-Commerce Dashboard",
            description: "A comprehensive admin dashboard for e-commerce management with real-time analytics and inventory tracking.",
            image: "https://via.placeholder.com/400x250/4F46E5/FFFFFF?text=E-Commerce+Dashboard",
            technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
            github: "https://github.com/johndoe/ecommerce-dashboard",
            live: "https://ecommerce-dashboard.johndoe.dev",
            featured: true
        },
        {
            id: 2,
            title: "Task Management App",
            description: "A collaborative task management application with drag-and-drop functionality and team collaboration features.",
            image: "https://via.placeholder.com/400x250/10B981/FFFFFF?text=Task+Manager",
            technologies: ["Vue.js", "Vuex", "Node.js", "MongoDB"],
            github: "https://github.com/johndoe/task-manager",
            live: "https://taskmanager.johndoe.dev",
            featured: true
        },
        {
            id: 3,
            title: "Weather App",
            description: "A responsive weather application with location-based forecasts and interactive weather maps.",
            image: "https://via.placeholder.com/400x250/F59E0B/FFFFFF?text=Weather+App",
            technologies: ["JavaScript", "CSS3", "Weather API", "Mapbox"],
            github: "https://github.com/johndoe/weather-app",
            live: "https://weather.johndoe.dev",
            featured: false
        },
        {
            id: 4,
            title: "Portfolio Website",
            description: "A modern, responsive portfolio website built with vanilla JavaScript and optimized for performance.",
            image: "https://via.placeholder.com/400x250/8B5CF6/FFFFFF?text=Portfolio+Site",
            technologies: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
            github: "https://github.com/johndoe/portfolio",
            live: "https://johndoe.dev",
            featured: true
        },
        {
            id: 5,
            title: "Chat Application",
            description: "Real-time chat application with multiple rooms, file sharing, and emoji support.",
            image: "https://via.placeholder.com/400x250/EF4444/FFFFFF?text=Chat+App",
            technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
            github: "https://github.com/johndoe/chat-app",
            live: "https://chat.johndoe.dev",
            featured: false
        },
        {
            id: 6,
            title: "Expense Tracker",
            description: "A comprehensive expense tracking application with budget management and financial insights.",
            image: "https://via.placeholder.com/400x250/06B6D4/FFFFFF?text=Expense+Tracker",
            technologies: ["React", "Firebase", "Chart.js", "Material-UI"],
            github: "https://github.com/johndoe/expense-tracker",
            live: "https://expenses.johndoe.dev",
            featured: false
        }
    ],

    // Work experience
    experience: [
        {
            id: 1,
            company: "CV Surya Sejahtera Sentosa",
            position: "Frontend Developer",
            duration: "February 2024 - June 2024",
            location: "Ngawi, East Java, Indonesia",
            description: "Development of leading frontend for factories and warehouse web applications.",
            achievements: [
                "Reduced Inventory Errors by 90%",
                "Improved Stock Turnover by 30%",
                "Accelerated Warehouse Operations by 40%",
                "Reduced Manual Entry Time by 70%"
            ],
            technologies: ["CSS", "Blade", "JavaScript", "Bootstrap"]
        },
        {
            id: 2,
            company: "Digital Agency Pro",
            position: "Frontend Developer",
            duration: "2020 - 2022",
            location: "Brooklyn, NY",
            description: "Developed responsive websites and web applications for diverse clients across multiple industries.",
            achievements: [
                "Built 20+ responsive websites using modern frontend frameworks",
                "Improved client satisfaction scores by 30% through better UX design",
                "Collaborated with designers to create pixel-perfect implementations",
                "Implemented SEO best practices resulting in improved search rankings"
            ],
            technologies: ["Vue.js", "Sass", "Bootstrap", "WordPress", "PHP"]
        }
    ],

    // Education
    education: [
        {
            degree: "Bachelor of Science in Computer Science",
            school: "New York University",
            year: "2015 - 2019",
            gpa: "3.8/4.0",
            relevant_courses: [
                "Data Structures and Algorithms",
                "Web Development",
                "Software Engineering",
                "Database Systems",
                "Human-Computer Interaction"
            ]
        }
    ],

    // Certifications
    certifications: [
        {
            name: "AWS Certified Developer - Associate",
            issuer: "Amazon Web Services",
            year: "2023",
            credential: "AWS-CDA-2023-001"
        },
        {
            name: "Google Analytics Certified",
            issuer: "Google",
            year: "2022",
            credential: "GA-2022-456"
        },
        {
            name: "React Developer Certification",
            issuer: "Meta",
            year: "2021",
            credential: "META-REACT-2021-789"
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioData;
}

// Console logging for debugging
console.log('Portfolio data loaded:', portfolioData);
console.log('Total projects:', portfolioData.projects.length);
console.log('Total experience entries:', portfolioData.experience.length);
console.log('Total skill categories:', portfolioData.skills.length);