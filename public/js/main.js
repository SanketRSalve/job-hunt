document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("uploadBtn").addEventListener("click", uploadResume);
});


async function uploadResume() {
  const fileInput = document.getElementById("resumeUpload");
  const jobListDiv = document.getElementById("job-list");

  if (!fileInput.files.length) {
    alert("upload resume");
    return ;
  }


  const formData = new FormData();

  formData.append("resume", fileInput.files[0]);

  try {
    const response = await fetch("http://localhost:3000/api/upload",{
      method: "POST",
      body: formData
    } );

    const data = await response.json();
    console.log(data);
    if (!data.success) {
      return;
    }


    // JOB LISTING
    jobListDiv.innerHTML = "";
    if (data.jobs.length === 0) {
      jobListDiv.innerHTML = "No jobs founcd";
      return;
    }

    data.jobs.forEach(job => {
      const jobElement = document.createElement("div");
      jobElement.classList.add("job-card");
      jobElement.innerHTML = `
      <h4>${job.title}</h4>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <a href="${job.link}" target="_blank">View Job</a>
`;
      jobListDiv.appendChild(jobElement);
    });
    
  } catch (error) {
    console.error("Error uploading resume",error);
    alert("Failed to upload");
  }

}
