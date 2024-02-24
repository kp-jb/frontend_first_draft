import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://frontend-first-draft.vercel.app/');
  await page.getByRole('link', { name: 'LOGIN' }).click();
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByLabel('FIRST NAME:').click();
  await page.getByLabel('FIRST NAME:').fill('Awesome');
  await page.getByLabel('FIRST NAME:').press('Tab');
  await page.getByLabel('LAST NAME:').fill('Audience');
  await page.getByLabel('LAST NAME:').press('Tab');
  await page.getByLabel('EMAIL:').fill('aa@gmail.com');
  await page.getByLabel('EMAIL:').press('Tab'); 
  await page.getByLabel('PASSWORD:').fill('strongpassword');
  await page.getByLabel('PASSWORD:').press('Tab');
  await page.getByLabel('CONFIRM PASSWORD:').fill('strongpassword');
  await page.getByLabel('CONFIRM PASSWORD:').press('Tab');
  await page.getByRole('button', { name: 'REGISTER' }).click();
});