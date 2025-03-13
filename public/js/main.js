document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("uploadBtn").addEventListener("click", uploadResume);
});

async function uploadResume() {
  const fileInput = document.getElementById("resumeUpload");
  const jobListDiv = document.getElementById("job-list");
  const uploadBtn = document.getElementById("uploadBtn");

  if (!fileInput.files.length) {
    alert("Please upload your resume first");
    return;
  }

  // Set loading state
  //uploadBtn.classList.add("loading");
  jobListDiv.innerHTML = `
      <div style="text-align: center; padding: 30px;">
      <div class="loading-spinner" style="display: inline-block; margin-bottom: 15px;"></div>
      <p>Analyzing your resume and finding matching jobs...</p>
    </div>
  `;

  const formData = new FormData();

  formData.append("resume", fileInput.files[0]);

  try {
    const response = await fetch("api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);

    // Reset loading state
    //uploadBtn.classList.remove("loading");

    if (!data.success) {
      jobListDiv.innerHTML = `<div class="error-message">Error: ${data.message || "Failed to process your resume"}</div>`;
      return;
    }

    // JOB LISTING
    jobListDiv.innerHTML = "";

    if (data.jobs.length === 0) {
      jobListDiv.innerHTML = `
        <div style="text-align: center; padding: 20px;">
          <i class="fas fa-search" style="font-size: 2rem; color: #38ef7d; margin-bottom: 15px;"></i>
          <p>No jobs found matching your resume. Try adjusting your search criteria.</p>
        </div>
      `;
      return;
    }

    // Add a header with job count
    const headerElement = document.createElement("div");
    headerElement.classList.add("job-list-header");
    headerElement.innerHTML = `<p>Found ${data.jobs.length} matching opportunities</p>`;
    jobListDiv.appendChild(headerElement);

    // Add job cards with animation delay
    data.jobs.forEach((job, index) => {
      const jobElement = document.createElement("div");
      jobElement.classList.add("job-card");
      jobElement.style.animationDelay = `${index * 0.1}s`;

      jobElement.innerHTML = `
      <h4>${job.title}</h4>
      <p><strong><i class="fas fa-building"></i> Company:</strong> ${job.company}</p>
      <p><strong><i class="fas fa-map-marker-alt"></i> Location:</strong> ${job.location}</p>
      <a href="${job.link}" target="_blank">View Job <i class="fas fa-external-link-alt"></i></a>
    `;

      jobListDiv.appendChild(jobElement);
    });
  } catch (error) {
    console.error("Error uploading resume", error);
    uploadBtn.classList.remove("loading");
    jobListDiv.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Failed to upload resume. Please try again later.</p>
        <p class="error-details">Error: ${error.message}</p>
      </div>
    `;
  }
}
