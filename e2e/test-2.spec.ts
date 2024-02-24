import { test, expect } from '@playwright/test';

// test registration 
test('test registration', async ({ page }) => {
  await page.goto('https://frontend-first-draft.vercel.app/login');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByLabel('FIRST NAME:').click();
  await page.getByLabel('FIRST NAME:').fill('Awesome');
  await page.getByLabel('FIRST NAME:').press('Tab');
  await page.getByLabel('LAST NAME:').fill('Audience');
  await page.getByLabel('LAST NAME:').press('Tab');
  await page.getByLabel('EMAIL:').fill('aa@gmail.com');
  await page.getByLabel('EMAIL:').press('Tab');
  await page.getByLabel('PASSWORD:', { exact: true }).fill('strongpassword');
  await page.getByLabel('PASSWORD:', { exact: true }).press('Tab');
  await page.getByLabel('CONFIRM PASSWORD:').fill('strongpassword');
  await page.getByLabel('CONFIRM PASSWORD:').press('Tab');
  await page.getByRole('button', { name: 'REGISTER' }).click();
  await page.goto('https://frontend-first-draft.vercel.app/records');
  await expect(page.getByRole('heading', { name: 'NO RESUMES' })).toHaveText('NO RESUMES');
});

// test create resume
test('test login page', async ({ page }) => {
  await page.goto('https://frontend-first-draft.vercel.app/login');
  await page.getByLabel('EMAIL:').click();
  await page.getByLabel('EMAIL:').fill('email@email.com');
  await page.getByLabel('EMAIL:').press('Tab');
  await page.getByLabel('PASSWORD:').fill('12345');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.goto('https://frontend-first-draft.vercel.app/records');
  await page.getByRole('link', { name: 'CREATE' }).first().click();
  await page.getByPlaceholder('Paste resumes or cover').click();
  await page.getByPlaceholder('Paste resumes or cover').fill(' Jacob Bassett\nSoftware Developer\nMona, UT | Willing to Relocate | jacobbassett@gmail.com | 801-857-7988 linkedin.com/in/jacobbassett | github.com/jdabassett | jacobbassett-portfolio.netlify.app\nFull-stack software developer proficient with JavaScript and Python. Life-long learner passionate about innovations in computer science, biology, and material science to name a few.\nTECHNICAL SKILLS\nLanguages: Python, JavaScript, R, HTML5, CSS3\nSkills and Tools: Github, VS Code, PyCharm, RStudio, React, Django, Zsh, Node.js, Express.js,\nPROJECTS\nA-MAZE-ING - Dec 2023 - github.com/.../README.md - demo\n● CLI that enables users to create mazes with a variety of maze generation algorithms.\n● Leveraging Python to generate mazes, serialize/deserialize data, create maze\nsolutions and generate SVG images.\n{...} cocktail lover - Aug 2023 - github.com/.../README.md - demo\n● Empowers users to discover new cocktail recipes through multiple intuitive search\noptions and curate a collection of their favorites.\n● Leveraged JavaScript, React, Github, MongoDB, Node.js, Express.js, and Auth0.\n● Envisioned, developed, and resolved all issues autonomously.\nSystematic mutagenesis of TFIIH subunit p52/Tfb2 identifies residues required for XPB/Ssl2 subunit function and genetic interactions with TFB6 - Oct 2022 – jbc.org/article\n● As primary author, I guided this project from its inception to publication.\n● Effectively collaborated with distinct labs across the country to enhance the depth and significance of our discoveries.\n● Analyzed all data and transformed results into compelling visuals.\nEDUCATION\nCode Fellows - Seattle, WA\nCertificate, Advanced Software Development in Full-Stack Python - Feb 2024\nUtah Valley University - Orem, UT\nBachelors of Biotechnology, Minor in Chemistry - May 2014\nEXPERIENCE\nInstitute for Systems Biology - Seattle, WA - Sept 2014 to Sept 2022\nLab Manager - 2021-2022\n● Managed projects, presented discoveries, facilitated collaborations, managed\ninventory, adhered to best accounting standards, and participated in hiring. Research Associate III - 2019-2022\n● Developed R and Python programs to automate lab tasks, efficiently analyzed large datasets, and displayed results in a compelling fashion.\nResearch Associate II - 2017-2019\n● Expanded proficiencies to experiment design, protein design, advanced protein\npurification, antibody production, RNA-seq, mass-spectrometry, and data analysis. Research Associate I - 2014-2017\n● Demonstrated proficiency in core lab techniques such as DNA synthesis, cloning, protein expression, project planning, and process documentation.');
  await page.getByRole('button', { name: 'SAVE' }).click();
  await page.getByLabel('FILE TYPE:RESUMECOVER LETTER').selectOption('true');
  await page.getByLabel('FILE NAME:').click();
  await page.getByLabel('FILE NAME:').fill('current resume');
  await page.getByRole('button', { name: 'SAVE' }).click();
  await page.goto('https://frontend-first-draft.vercel.app/records');
  await expect(page.getByRole('heading', { name: 'RESUMES' })).toHaveText('RESUMES');
});
