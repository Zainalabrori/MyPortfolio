// Print functionality for portfolio resume
// Handles automatic resume generation and printing

class PrintManager {
    constructor() {
        this.setupPrintHandlers();
        console.log('Print manager initialized');
    }

    setupPrintHandlers() {
        // Print modal handlers
        const closePrintModal = document.getElementById('closePrintModal');
        const printFullBtn = document.getElementById('printFullBtn');
        const printSummaryBtn = document.getElementById('printSummaryBtn');
        const printModal = document.getElementById('printModal');

        // Close modal handlers
        if (closePrintModal) {
            closePrintModal.addEventListener('click', () => {
                this.hidePrintModal();
            });
        }

        // Close modal when clicking outside
        if (printModal) {
            printModal.addEventListener('click', (e) => {
                if (e.target === printModal) {
                    this.hidePrintModal();
                }
            });
        }

        // Print button handlers
        if (printFullBtn) {
            printFullBtn.addEventListener('click', () => {
                console.log('Full resume print requested');
                this.generateFullResume();
            });
        }

        if (printSummaryBtn) {
            printSummaryBtn.addEventListener('click', () => {
                console.log('Summary resume print requested');
                this.generateSummaryResume();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                this.showPrintModal();
            }
            if (e.key === 'Escape') {
                this.hidePrintModal();
            }
        });
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

    generateFullResume() {
        console.log('Generating full resume...');
        this.hidePrintModal();
        
        const resumeContent = this.createResumeHTML(true);
        this.openPrintWindow(resumeContent, 'Full Resume - ' + portfolioData.personal.name);
    }

    generateSummaryResume() {
        console.log('Generating summary resume...');
        this.hidePrintModal();
        
        const resumeContent = this.createResumeHTML(false);
        this.openPrintWindow(resumeContent, 'Resume Summary - ' + portfolioData.personal.name);
    }

    createResumeHTML(isFullResume = true) {
        const { personal, skills, experience, education, certifications, projects } = portfolioData;
        
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${isFullResume ? 'Full Resume' : 'Resume Summary'} - ${personal.name}</title>
            <style>
                ${this.getPrintStyles()}
            </style>
        </head>
        <body>
            <div class="resume-container">
                <!-- Header Section -->
                <header class="resume-header">
                    <h1 class="name">${personal.name}</h1>
                    <p class="title">${personal.title}</p>
                    <div class="contact-info">
                        <div class="contact-item">
                            <span class="icon">📧</span>
                            <span>${personal.email}</span>
                        </div>
                        <div class="contact-item">
                            <span class="icon">📱</span>
                            <span>${personal.phone}</span>
                        </div>
                        <div class="contact-item">
                            <span class="icon">📍</span>
                            <span>${personal.location}</span>
                        </div>
                        <div class="contact-item">
                            <span class="icon">🌐</span>
                            <span>${personal.website}</span>
                        </div>
                    </div>
                </header>

                <!-- Professional Summary -->
                <section class="resume-section">
                    <h2 class="section-title">Professional Summary</h2>
                    <p class="summary-text">
                        Experienced ${personal.title.toLowerCase()} with ${experience.length}+ years of expertise in modern web development. 
                        Proven track record in building scalable applications, leading development teams, and delivering high-quality solutions. 
                        Passionate about creating exceptional user experiences and staying current with emerging technologies.
                    </p>
                </section>

                <!-- Skills Section -->
                <section class="resume-section">
                    <h2 class="section-title">Technical Skills</h2>
                    <div class="skills-grid">
                        ${skills.map(category => `
                            <div class="skill-category">
                                <h3 class="skill-category-title">${category.category}</h3>
                                <div class="skill-list">
                                    ${category.skills.map(skill => `
                                        <span class="skill-tag">${skill.name}</span>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- Experience Section -->
                <section class="resume-section">
                    <h2 class="section-title">Professional Experience</h2>
                    ${experience.map(job => `
                        <div class="experience-item">
                            <div class="job-header">
                                <div class="job-title-company">
                                    <h3 class="job-title">${job.position}</h3>
                                    <p class="company">${job.company} • ${job.location}</p>
                                </div>
                                <div class="job-duration">${job.duration}</div>
                            </div>
                            <p class="job-description">${job.description}</p>
                            ${isFullResume ? `
                                <div class="achievements">
                                    <h4 class="achievements-title">Key Achievements:</h4>
                                    <ul class="achievements-list">
                                        ${job.achievements.map(achievement => `
                                            <li>${achievement}</li>
                                        `).join('')}
                                    </ul>
                                </div>
                                <div class="job-technologies">
                                    <strong>Technologies:</strong> ${job.technologies.join(', ')}
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </section>

                ${isFullResume ? `
                    <!-- Featured Projects Section -->
                    <section class="resume-section">
                        <h2 class="section-title">Featured Projects</h2>
                        ${projects.filter(p => p.featured).map(project => `
                            <div class="project-item">
                                <div class="project-header">
                                    <h3 class="project-title">${project.title}</h3>
                                    <div class="project-links">
                                        <span class="project-link">${project.github}</span>
                                        <span class="project-link">${project.live}</span>
                                    </div>
                                </div>
                                <p class="project-description">${project.description}</p>
                                <div class="project-technologies">
                                    <strong>Technologies:</strong> ${project.technologies.join(', ')}
                                </div>
                            </div>
                        `).join('')}
                    </section>

                    <!-- Education Section -->
                    <section class="resume-section">
                        <h2 class="section-title">Education</h2>
                        ${education.map(edu => `
                            <div class="education-item">
                                <div class="education-header">
                                    <h3 class="degree">${edu.degree}</h3>
                                    <span class="year">${edu.year}</span>
                                </div>
                                <p class="school">${edu.school}</p>
                                <p class="gpa">GPA: ${edu.gpa}</p>
                            </div>
                        `).join('')}
                    </section>

                    <!-- Certifications Section -->
                    <section class="resume-section">
                        <h2 class="section-title">Certifications</h2>
                        <div class="certifications-grid">
                            ${certifications.map(cert => `
                                <div class="certification-item">
                                    <h3 class="cert-name">${cert.name}</h3>
                                    <p class="cert-issuer">${cert.issuer} • ${cert.year}</p>
                                    <p class="cert-credential">ID: ${cert.credential}</p>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                <!-- Footer -->
                <footer class="resume-footer">
                    <p>Generated on ${new Date().toLocaleDateString()} • ${isFullResume ? 'Full Resume' : 'Resume Summary'}</p>
                </footer>
            </div>
        </body>
        </html>
        `;
    }

    getPrintStyles() {
        return `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Arial', sans-serif;
                font-size: 11pt;
                line-height: 1.4;
                color: #333;
                background: white;
            }

            .resume-container {
                max-width: 8.5in;
                margin: 0 auto;
                padding: 0.5in;
                background: white;
            }

            .resume-header {
                text-align: center;
                margin-bottom: 20pt;
                padding-bottom: 15pt;
                border-bottom: 2px solid #333;
            }

            .name {
                font-size: 24pt;
                font-weight: bold;
                color: #2563eb;
                margin-bottom: 5pt;
            }

            .title {
                font-size: 14pt;
                color: #666;
                margin-bottom: 10pt;
            }

            .contact-info {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 15pt;
                font-size: 10pt;
            }

            .contact-item {
                display: flex;
                align-items: center;
                gap: 3pt;
            }

            .icon {
                font-size: 12pt;
            }

            .resume-section {
                margin-bottom: 20pt;
                page-break-inside: avoid;
            }

            .section-title {
                font-size: 14pt;
                font-weight: bold;
                color: #2563eb;
                margin-bottom: 10pt;
                padding-bottom: 3pt;
                border-bottom: 1px solid #ddd;
            }

            .summary-text {
                font-size: 11pt;
                line-height: 1.5;
                text-align: justify;
            }

            .skills-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200pt, 1fr));
                gap: 15pt;
            }

            .skill-category {
                margin-bottom: 10pt;
            }

            .skill-category-title {
                font-size: 12pt;
                font-weight: bold;
                margin-bottom: 5pt;
                color: #374151;
            }

            .skill-list {
                display: flex;
                flex-wrap: wrap;
                gap: 3pt;
            }

            .skill-tag {
                background: #f3f4f6;
                padding: 2pt 6pt;
                border-radius: 3pt;
                font-size: 9pt;
                border: 1px solid #d1d5db;
            }

            .experience-item {
                margin-bottom: 15pt;
                page-break-inside: avoid;
            }

            .job-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 5pt;
            }

            .job-title {
                font-size: 12pt;
                font-weight: bold;
                color: #1f2937;
            }

            .company {
                font-size: 10pt;
                color: #2563eb;
                margin-top: 2pt;
            }

            .job-duration {
                font-size: 10pt;
                color: #666;
                font-weight: bold;
            }

            .job-description {
                font-size: 10pt;
                margin-bottom: 5pt;
                line-height: 1.4;
            }

            .achievements {
                margin-bottom: 5pt;
            }

            .achievements-title {
                font-size: 10pt;
                font-weight: bold;
                margin-bottom: 3pt;
            }

            .achievements-list {
                margin-left: 15pt;
                font-size: 10pt;
            }

            .achievements-list li {
                margin-bottom: 2pt;
            }

            .job-technologies {
                font-size: 9pt;
                color: #666;
            }

            .project-item {
                margin-bottom: 12pt;
                page-break-inside: avoid;
            }

            .project-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 3pt;
            }

            .project-title {
                font-size: 11pt;
                font-weight: bold;
                color: #1f2937;
            }

            .project-links {
                font-size: 8pt;
                color: #2563eb;
            }

            .project-link {
                display: block;
                margin-bottom: 1pt;
            }

            .project-description {
                font-size: 10pt;
                margin-bottom: 3pt;
                line-height: 1.3;
            }

            .project-technologies {
                font-size: 9pt;
                color: #666;
            }

            .education-item {
                margin-bottom: 10pt;
                page-break-inside: avoid;
            }

            .education-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 3pt;
            }

            .degree {
                font-size: 11pt;
                font-weight: bold;
                color: #1f2937;
            }

            .year {
                font-size: 10pt;
                color: #666;
            }

            .school {
                font-size: 10pt;
                color: #2563eb;
                margin-bottom: 2pt;
            }

            .gpa {
                font-size: 9pt;
                color: #666;
            }

            .certifications-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200pt, 1fr));
                gap: 10pt;
            }

            .certification-item {
                padding: 8pt;
                border: 1px solid #e5e7eb;
                border-radius: 4pt;
                background: #f9fafb;
            }

            .cert-name {
                font-size: 10pt;
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 2pt;
            }

            .cert-issuer {
                font-size: 9pt;
                color: #2563eb;
                margin-bottom: 2pt;
            }

            .cert-credential {
                font-size: 8pt;
                color: #666;
            }

            .resume-footer {
                text-align: center;
                margin-top: 20pt;
                padding-top: 10pt;
                border-top: 1px solid #ddd;
                font-size: 8pt;
                color: #666;
            }

            @media print {
                body {
                    font-size: 10pt;
                }
                
                .resume-container {
                    margin: 0;
                    padding: 0.25in;
                }
                
                .resume-section {
                    page-break-inside: avoid;
                }
                
                .experience-item,
                .project-item,
                .education-item {
                    page-break-inside: avoid;
                }
            }
        `;
    }

    openPrintWindow(content, title) {
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        
        if (!printWindow) {
            console.error('Could not open print window. Please allow pop-ups.');
            alert('Please allow pop-ups to print the resume.');
            return;
        }

        printWindow.document.write(content);
        printWindow.document.close();
        
        // Wait for content to load before printing
        printWindow.onload = function() {
            console.log('Print window loaded, initiating print...');
            printWindow.focus();
            printWindow.print();
            
            // Close the print window after printing
            printWindow.onafterprint = function() {
                console.log('Print completed, closing window...');
                setTimeout(() => printWindow.close(), 100);
            };
        };
    }

    // Export resume as PDF (would require a backend service)
    exportAsPDF(isFullResume = true) {
        console.log('PDF export requested (requires backend service)');
        // This would typically send the resume HTML to a backend service
        // that converts it to PDF using libraries like Puppeteer or wkhtmltopdf
        alert('PDF export feature requires backend implementation');
    }

    // Save resume data as JSON
    saveResumeData() {
        const dataStr = JSON.stringify(portfolioData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'resume-data.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        console.log('Resume data saved as JSON');
    }
}

// Initialize print manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const printManager = new PrintManager();
    
    // Make it globally available for debugging
    window.printManager = printManager;
    
    console.log('Print manager ready');
});

// Analytics for print usage
function trackPrintUsage(type) {
    console.log('Print usage tracked:', type);
    // In production, send to analytics service
    // gtag('event', 'print_resume', { 'resume_type': type });
}