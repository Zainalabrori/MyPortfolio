// Data configuration for portfolio website
// This file contains all the dynamic content for the portfolio

const portfolioData = {
    // Personal Information
    personal: {
        name: "John Doe",
        title: "Senior Frontend Developer",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567",
        location: "New York, NY",
        website: "https://johndoe.dev",
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
        twitter: "https://twitter.com/johndoe"
    },

    // Skills data with proficiency levels
    skills: [
        {
            category: "Frontend Development",
            icon: "fas fa-code",
            skills: [
                { name: "React", level: 95 },
                { name: "Vue.js", level: 90 },
                { name: "JavaScript", level: 95 },
                { name: "TypeScript", level: 85 },
                { name: "HTML5", level: 98 },
                { name: "CSS3", level: 95 }
            ]
        },
        {
            category: "Styling & Design",
            icon: "fas fa-palette",
            skills: [
                { name: "Tailwind CSS", level: 92 },
                { name: "Sass/SCSS", level: 90 },
                { name: "Bootstrap", level: 85 },
                { name: "Styled Components", level: 80 },
                { name: "Figma", level: 75 },
                { name: "Adobe XD", level: 70 }
            ]
        },
        {
            category: "Tools & Technologies",
            icon: "fas fa-tools",
            skills: [
                { name: "Git", level: 90 },
                { name: "Webpack", level: 85 },
                { name: "Vite", level: 88 },
                { name: "Docker", level: 75 },
                { name: "AWS", level: 70 },
                { name: "Node.js", level: 80 }
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
            company: "Tech Solutions Inc.",
            position: "Senior Frontend Developer",
            duration: "2022 - Present",
            location: "New York, NY",
            description: "Leading frontend development for enterprise web applications serving 100k+ users daily.",
            achievements: [
                "Reduced page load times by 40% through performance optimization",
                "Led a team of 5 developers in migrating legacy codebase to React",
                "Implemented automated testing resulting in 95% code coverage",
                "Mentored junior developers and conducted code reviews"
            ],
            technologies: ["React", "TypeScript", "Redux", "Webpack", "Jest"]
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
        },
        {
            id: 3,
            company: "StartupTech",
            position: "Junior Frontend Developer",
            duration: "2019 - 2020",
            location: "Remote",
            description: "Contributed to the development of a SaaS platform for small businesses.",
            achievements: [
                "Developed reusable UI components reducing development time by 25%",
                "Participated in daily standups and sprint planning sessions",
                "Fixed 100+ bugs and implemented new features based on user feedback",
                "Collaborated with backend developers on API integration"
            ],
            technologies: ["JavaScript", "HTML5", "CSS3", "jQuery", "Bootstrap"]
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