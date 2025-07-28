// Download functionality for portfolio resume
// Handles automatic resume generation and PDF download using html2canvas and jsPDF

class DownloadManager {
  constructor() {
    this.librariesReady = false;
    this.setupDownloadHandlers();

    // Wait for DOM and libraries to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => this.checkLibraries(), 100);
      });
    } else {
      setTimeout(() => this.checkLibraries(), 100);
    }

    console.log("Download manager initialized");
  }

  // Check if libraries are available (loaded via HTML)
  checkLibraries() {
    console.log("=== Library Check ===");
    console.log("html2canvas type:", typeof html2canvas);
    console.log("window.jsPDF type:", typeof window.jsPDF);
    console.log("global jsPDF type:", typeof jsPDF);

    const html2canvasReady = typeof html2canvas !== "undefined";
    let jsPDFReady = false;

    // Check for different jsPDF globals
    if (typeof window.jsPDF !== "undefined") {
      console.log("✅ Found jsPDF in window.jsPDF");
      jsPDFReady = true;
    } else if (typeof jsPDF !== "undefined") {
      console.log("✅ Found jsPDF in global scope");
      jsPDFReady = true;
    } else if (window.jspdf && window.jspdf.jsPDF) {
      console.log("✅ Found jsPDF in window.jspdf.jsPDF");
      jsPDFReady = true;
    }

    console.log("Library status:");
    console.log("- html2canvas:", html2canvasReady ? "✅" : "❌");
    console.log("- jsPDF:", jsPDFReady ? "✅" : "❌");

    if (html2canvasReady && jsPDFReady) {
      this.librariesReady = true;
      console.log("🎉 All libraries ready!");
    } else {
      this.librariesReady = false;
      console.warn("⏳ Libraries not ready yet, will retry...");

      // Retry after 500ms if not ready
      if (this.retryCount < 10) {
        this.retryCount = (this.retryCount || 0) + 1;
        setTimeout(() => this.checkLibraries(), 500);
      } else {
        console.error("❌ Libraries failed to load after multiple attempts");
        this.showLibraryMissingError();
      }
    }
  }

  showLibraryMissingError() {
    const errorMsg = `
            <div style="position: fixed; top: 20px; right: 20px; background: #fee2e2; border: 1px solid #fecaca; color: #991b1b; padding: 15px; border-radius: 8px; max-width: 350px; z-index: 1000; font-family: Arial, sans-serif;">
                <h4 style="margin: 0 0 10px 0; font-weight: bold;">⚠️ Required Libraries Missing</h4>
                <p style="margin: 0 0 10px 0; font-size: 14px;">Please add these to your HTML head:</p>
                <code style="display: block; background: #f3f4f6; padding: 8px; font-size: 11px; margin: 5px 0; border-radius: 4px;">
                    &lt;script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"&gt;&lt;/script&gt;<br>
                    &lt;script src="https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js"&gt;&lt;/script&gt;
                </code>
                <button onclick="this.parentElement.remove()" style="background: #dc2626; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                    Close
                </button>
            </div>
        `;

    const errorDiv = document.createElement("div");
    errorDiv.innerHTML = errorMsg;
    document.body.appendChild(errorDiv);
  }

  setupDownloadHandlers() {
    // Get all modal elements
    const downloadModal = document.getElementById("printModal");
    const printBtn = document.getElementById("printBtn");

    console.log("Setting up download handlers for mobile and desktop...");

    // Show modal when print button is clicked
    if (printBtn) {
      printBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Download button clicked, showing modal...");
        this.showDownloadModal();
      });
    } else {
      console.error(
        'Print button not found! Make sure element has id="printBtn"'
      );
    }

    // Setup handlers for BOTH desktop and mobile buttons
    this.setupButtonHandlers();

    // Close modal when clicking outside
    if (downloadModal) {
      downloadModal.addEventListener("click", (e) => {
        if (e.target === downloadModal) {
          console.log("Clicked outside modal, closing...");
          this.hideDownloadModal();
        }
      });
    }

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "d") {
        e.preventDefault();
        this.showDownloadModal();
      }
      if (e.key === "Escape") {
        this.hideDownloadModal();
      }
    });
  }

  // NEW METHOD: Handle both desktop and mobile buttons
  setupButtonHandlers() {
    // Desktop buttons
    const downloadFullBtn = document.getElementById("printFullBtn");
    const downloadSummaryBtn = document.getElementById("printSummaryBtn");
    const closeDownloadModal = document.getElementById("closePrintModal");

    // Mobile buttons
    const downloadFullBtnMobile = document.getElementById("printFullBtnMobile");
    const downloadSummaryBtnMobile = document.getElementById(
      "printSummaryBtnMobile"
    );
    const closeDownloadModalMobile = document.getElementById(
      "closePrintModalMobile"
    );

    console.log("Button elements found:");
    console.log("- Desktop Full:", !!downloadFullBtn);
    console.log("- Desktop Summary:", !!downloadSummaryBtn);
    console.log("- Desktop Close:", !!closeDownloadModal);
    console.log("- Mobile Full:", !!downloadFullBtnMobile);
    console.log("- Mobile Summary:", !!downloadSummaryBtnMobile);
    console.log("- Mobile Close:", !!closeDownloadModalMobile);

    // Full Resume Download - Desktop & Mobile
    [downloadFullBtn, downloadFullBtnMobile].forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", () => {
          console.log("Full resume download requested");
          this.downloadFullResume();
        });
      }
    });

    // Summary Resume Download - Desktop & Mobile
    [downloadSummaryBtn, downloadSummaryBtnMobile].forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", () => {
          console.log("Summary resume download requested");
          this.downloadSummaryResume();
        });
      }
    });

    // Close Modal - Desktop & Mobile
    [closeDownloadModal, closeDownloadModalMobile].forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", () => {
          console.log("Modal close requested");
          this.hideDownloadModal();
        });
      }
    });
  }

  // Enhanced modal show/hide with better mobile support
  showDownloadModal() {
    const modal = document.getElementById("printModal");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");

      // Prevent body scroll on mobile
      document.body.style.overflow = "hidden";

      console.log("Download modal opened - mobile/desktop compatible");
    } else {
      console.error('Modal not found! Make sure element has id="printModal"');
    }
  }

  hideDownloadModal() {
    const modal = document.getElementById("printModal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");

      // Restore body scroll
      document.body.style.overflow = "";

      console.log("Download modal closed");
    }
  }

  async downloadFullResume() {
    if (!this.librariesReady) {
      console.error("Libraries not ready");
      alert(
        "Required libraries are not loaded. Please add them to your HTML head section."
      );
      return;
    }

    console.log("Generating full resume PDF...");
    this.hideDownloadModal();

    try {
      const resumeContent = this.createResumeHTML(true);
      await this.generateAndDownloadPDF(
        resumeContent,
        `${portfolioData.personal.name}_Full_Resume.pdf`
      );
    } catch (error) {
      console.error("Error generating full resume:", error);
      alert("Error generating PDF. Please try again.");
    }
  }

  async downloadSummaryResume() {
    if (!this.librariesReady) {
      console.error("Libraries not ready");
      alert(
        "Required libraries are not loaded. Please add them to your HTML head section."
      );
      return;
    }

    console.log("Generating summary resume PDF...");
    this.hideDownloadModal();

    try {
      const resumeContent = this.createResumeHTML(false);
      await this.generateAndDownloadPDF(
        resumeContent,
        `${portfolioData.personal.name}_Resume_Summary.pdf`
      );
    } catch (error) {
      console.error("Error generating summary resume:", error);
      alert("Error generating PDF. Please try again.");
    }
  }

  async generateAndDownloadPDF(htmlContent, filename) {
    console.log("Starting PDF generation process...");

    // Create temporary container for HTML content
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = htmlContent;
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    tempContainer.style.width = "210mm"; // A4 width
    tempContainer.style.background = "white";

    document.body.appendChild(tempContainer);

    try {
      // Generate canvas from HTML
      console.log("Converting HTML to canvas...");
      const canvas = await html2canvas(
        tempContainer.querySelector(".resume-container"),
        {
          scale: 2, // Higher quality
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffffff",
          width: 794, // A4 width in pixels at 96 DPI
          height: null, // Auto height
        }
      );

      // Create PDF with better error handling
      console.log("Canvas generated, creating PDF...");

      // Get jsPDF from any available namespace
      let jsPDFClass;
      if (typeof window.jsPDF !== "undefined") {
        jsPDFClass = window.jsPDF.jsPDF || window.jsPDF;
      } else if (typeof jsPDF !== "undefined") {
        jsPDFClass = jsPDF;
      } else if (window.jspdf && window.jspdf.jsPDF) {
        jsPDFClass = window.jspdf.jsPDF;
      } else {
        throw new Error("jsPDF not found in any expected location");
      }

      console.log("Using jsPDF class:", typeof jsPDFClass);

      // Create PDF instance
      const pdf = new jsPDFClass({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      // Calculate dimensions
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      console.log(`PDF dimensions: ${imgWidth}x${imgHeight}mm`);

      // Convert canvas to image
      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      // Add image to PDF
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

      // Handle multi-page content if needed
      if (imgHeight > pdfHeight) {
        const totalPages = Math.ceil(imgHeight / pdfHeight);
        console.log(`Content spans ${totalPages} pages`);

        for (let i = 1; i < totalPages; i++) {
          pdf.addPage();
          const yOffset = -pdfHeight * i;
          pdf.addImage(imgData, "JPEG", 0, yOffset, imgWidth, imgHeight);
        }
      }

      // Download the PDF
      console.log("Downloading PDF:", filename);
      pdf.save(filename);

      console.log("PDF download completed successfully");
    } catch (error) {
      console.error("PDF generation failed:", error);
      throw error;
    } finally {
      // Clean up temporary container
      document.body.removeChild(tempContainer);
    }
  }

  createResumeHTML(isFullResume = true) {
    const {
      personal,
      skills,
      experience,
      education,
      certifications,
      projects,
    } = portfolioData;

    return `
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
                    Highly skilled and results-driven ${personal.title.toLowerCase()} with 1 year of experience designing, developing,
                    and deploying dynamic web applications. Proficient in crafting scalable, secure, and user- friendly solutions
                    across diverse industries. Expertise spans both frontend and backend development, ensuring seamless
                    integration and performance optimization.
                </p>
            </section>

            <!-- Skills Section -->
            <section class="resume-section">
                <h2 class="section-title">Technical Skills</h2>
                <div class="skills-grid">
                    ${skills
                      .map(
                        (category) => `
                        <div class="skill-category">
                            <h3 class="skill-category-title">${
                              category.category
                            }</h3>
                            <div class="skill-list">
                                <ul>
                                    ${category.skills
                                      .map((skill) => `<li> ${skill.name}</li>`)
                                      .join("")}
                                </ul>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </section>

            <!-- Experience Section -->
            <section class="resume-section">
                <h2 class="section-title">Professional Experience</h2>
                ${experience
                  .map(
                    (job) => `
                    <div class="experience-item">
                        <div class="job-header">
                            <div class="job-title-company">
                                <h3 class="job-title">${job.position}</h3>
                                <p class="company">${job.company} • ${
                      job.location
                    }</p>
                            </div>
                            <div class="job-duration">${job.duration}</div>
                        </div>
                        <p class="job-description">${job.description}</p>
                        ${
                          isFullResume
                            ? `
                            <div class="achievements">
                                <h4 class="achievements-title">Key Achievements:</h4>
                                <ul class="achievements-list">
                                    ${job.achievements
                                      .map(
                                        (achievement) => `
                                        <li>${achievement}</li>
                                    `
                                      )
                                      .join("")}
                                </ul>
                            </div>
                            <div class="job-technologies">
                                <strong>Technologies:</strong> ${job.technologies.join(
                                  ", "
                                )}
                            </div>
                        `
                            : ""
                        }
                    </div>
                `
                  )
                  .join("")}
            </section>

            ${
              isFullResume
                ? `
                <!-- Featured Projects Section -->
                <section class="resume-section">
                    <h2 class="section-title">Featured Projects</h2>
                    ${projects
                      .filter((p) => p.featured)
                      .map(
                        (project) => `
                        <div class="project-item">
                            <div class="project-header">
                                <h3 class="project-title">${project.title}</h3>
                            </div>
                            <p class="project-description">${
                              project.description
                            }</p>
                            <div class="project-technologies">
                                <strong>Technologies:</strong> ${project.technologies.join(
                                  ", "
                                )}
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </section>

                <!-- Education Section -->
                <section class="resume-section">
                    <h2 class="section-title">Education</h2>
                    ${education
                      .map(
                        (edu) => `
                        <div class="education-item">
                            <div class="education-header">
                                <h3 class="degree">${edu.degree}</h3>
                                <span class="year">${edu.year}</span>
                            </div>
                            <p class="school">${edu.school}</p>
                            <p class="gpa">GPA: ${edu.gpa}</p>
                        </div>
                    `
                      )
                      .join("")}
                </section>

                <!-- Certifications Section -->
                <section class="resume-section">
                    <h2 class="section-title">Certifications</h2>
                    <div class="certifications-grid">
                        ${certifications
                          .map(
                            (cert) => `
                            <div class="certification-item">
                                <h3 class="cert-name">${cert.name}</h3>
                                <p class="cert-issuer">${cert.issuer} • ${cert.year}</p>
                                <p class="cert-credential">ID: ${cert.credential}</p>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                </section>
            `
                : ""
            }

            <!-- Footer -->
            <footer class="resume-footer">
                <p>Generated on ${new Date().toLocaleDateString()} • ${
      isFullResume ? "Full Resume" : "Resume Summary"
    }</p>
            </footer>

            <style>
                .resume-container {
                    max-width: 794px;
                    margin: 0 auto;
                    padding: 40px;
                    background: white;
                    font-family: 'Arial', sans-serif;
                    color: #333;
                    line-height: 1.4;
                }

                .resume-header {
                    text-align: center;
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 2px solid #2563eb;
                }

                .name {
                    font-size: 32px;
                    font-weight: bold;
                    color: #2563eb;
                    margin-bottom: 8px;
                }

                .title {
                    font-size: 18px;
                    color: #666;
                    margin-bottom: 15px;
                }

                .contact-info {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 20px;
                    font-size: 14px;
                }

                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .icon {
                    font-size: 16px;
                }

                .resume-section {
                    margin-bottom: 25px;
                }

                .section-title {
                    font-size: 20px;
                    font-weight: bold;
                    color: #2563eb;
                    margin-bottom: 15px;
                    padding-bottom: 5px;
                    border-bottom: 1px solid #ddd;
                }

                .summary-text {
                    font-size: 14px;
                    line-height: 1.6;
                    text-align: justify;
                }

                .skills-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                }

                .skill-category {
                    margin-bottom: 15px;
                }

                .skill-category-title {
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 8px;
                    color: #374151;
                }

                .skill-list ul {
                    margin: 0;
                    padding-left: 1rem;
                    list-style: none;
                }

                .skill-list li::before {
                    content: "- ";
                }

                .skill-list li {
                    font-size: 0.875rem;
                    margin-bottom: 4px;
                }

                .skill-tag {
                    background: #f3f4f6;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    border: 1px solid #d1d5db;
                }

                .experience-item {
                    margin-bottom: 20px;
                }

                .job-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 8px;
                }

                .job-title {
                    font-size: 16px;
                    font-weight: bold;
                    color: #1f2937;
                }

                .company {
                    font-size: 14px;
                    color: #2563eb;
                    margin-top: 3px;
                }

                .job-duration {
                    font-size: 14px;
                    color: #666;
                    font-weight: bold;
                }

                .job-description {
                    font-size: 14px;
                    margin-bottom: 8px;
                    line-height: 1.5;
                }

                .achievements {
                    margin-bottom: 8px;
                }

                .achievements-title {
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }

                .achievements-list {
                    margin-left: 20px;
                    font-size: 13px;
                }

                .achievements-list li {
                    margin-bottom: 3px;
                }

                .job-technologies {
                    font-size: 12px;
                    color: #666;
                }

                .project-item {
                    margin-bottom: 15px;
                }

                .project-header {
                    margin-bottom: 5px;
                }

                .project-title {
                    font-size: 15px;
                    font-weight: bold;
                    color: #1f2937;
                }

                .project-description {
                    font-size: 13px;
                    margin-bottom: 5px;
                    line-height: 1.4;
                }

                .project-technologies {
                    font-size: 12px;
                    color: #666;
                }

                .education-item {
                    margin-bottom: 12px;
                }

                .education-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 5px;
                }

                .degree {
                    font-size: 15px;
                    font-weight: bold;
                    color: #1f2937;
                }

                .year {
                    font-size: 13px;
                    color: #666;
                }

                .school {
                    font-size: 13px;
                    color: #2563eb;
                    margin-bottom: 3px;
                }

                .gpa {
                    font-size: 12px;
                    color: #666;
                }

                .certifications-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 15px;
                }

                .certification-item {
                    padding: 12px;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                    background: #f9fafb;
                }

                .cert-name {
                    font-size: 14px;
                    font-weight: bold;
                    color: #1f2937;
                    margin-bottom: 4px;
                }

                .cert-issuer {
                    font-size: 12px;
                    color: #2563eb;
                    margin-bottom: 3px;
                }

                .cert-credential {
                    font-size: 11px;
                    color: #666;
                }

                .resume-footer {
                    text-align: center;
                    margin-top: 25px;
                    padding-top: 15px;
                    border-top: 1px solid #ddd;
                    font-size: 11px;
                    color: #666;
                }
            </style>
        </div>
        `;
  }

  // Save resume data as JSON backup
  saveResumeData() {
    try {
      const dataStr = JSON.stringify(portfolioData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(dataBlob);
      downloadLink.download = `${portfolioData.personal.name}_resume_data.json`;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Clean up the blob URL
      URL.revokeObjectURL(downloadLink.href);

      console.log("Resume data saved as JSON");
    } catch (error) {
      console.error("Error saving resume data:", error);
      alert("Error saving resume data. Please try again.");
    }
  }
}

// Initialize download manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const downloadManager = new DownloadManager();

  // Make it globally available for debugging
  window.downloadManager = downloadManager;

  console.log("Download manager ready");
});

// Analytics for download usage
function trackDownloadUsage(type) {
  console.log("Download usage tracked:", type);
  // In production, send to analytics service
  // gtag('event', 'download_resume', { 'resume_type': type });
}
