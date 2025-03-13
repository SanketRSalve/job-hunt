const puppeteer  = require("puppeteer-core");

async function scrapeJobs(skills) {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.connect({
        browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BLESS_TOKEN}`, 
  });
  const page = await browser.newPage();

  // Construct job search url 
  const formattedSkills = skills.join(' ');

  const jobSearchUrl = `https://in.linkedin.com/jobs/search/?keywords=%20${formattedSkills}`;
  console.log(jobSearchUrl);
  
  // Navigate page to the url
  await page.goto(jobSearchUrl, { waitUntil: 'networkidle2'});

  // Extract Jobs List  
  //TODO: Add time of posting
  const jobs = await page.evaluate(() => {
    let jobList = [];
    const jobElements = document.querySelectorAll('.base-card');

    jobElements.forEach(job => {
      const title = job.querySelector('.base-search-card__title')?.innerText.trim() || 'N/A';
            const company = job.querySelector('.base-search-card__subtitle')?.innerText.trim() || 'N/A';
            const location = job.querySelector('.job-search-card__location')?.innerText.trim() || 'N/A';
            const link = job.querySelector('a')?.href || 'N/A';
      jobList.push({ title, company, location, link })
    });
    return jobList;
  });

  await browser.close();
  console.log(jobs);
  return jobs;
}


module.exports = scrapeJobs;
