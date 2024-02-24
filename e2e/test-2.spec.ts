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

