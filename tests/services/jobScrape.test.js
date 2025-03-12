const { default: puppeteer } = require("puppeteer");
const scrapeJobs = require("../../src/services/jobScrape");

jest.mock("puppeteer");

test("Scrapes jobs success", async () => {
  const mockPage = {
    goto: jest.fn(),
    evaluate: jest.fn(() => [
      {
        title: "Full Stack Developer",
        company: "Freshpass",
        location: "Remote",
        link: "https://www.example.com/job/1",
      },
    ]),

    close: jest.fn(),
  };

  const mockBrowser = {
    newPage: jest.fn(() => mockPage),
    close: jest.fn(),
  };

  puppeteer.launch.mockResolvedValue(mockBrowser);

  const jobTitle = "Full Stack Developer";
  const skills = ["Node.js", "React"];

  const jobs = await scrapeJobs(skills);

  expect(puppeteer.launch).toHaveBeenCalled();
  expect(mockPage.goto).toHaveBeenCalled();
  expect(mockPage.evaluate).toHaveBeenCalled();

  expect(jobs).toEqual([
    {
      title: 'Full Stack Developer',
      company: 'Freshpass',
      location: 'Remote',
      link: 'https://www.example.com/job/1'
    }
  ]);
});
