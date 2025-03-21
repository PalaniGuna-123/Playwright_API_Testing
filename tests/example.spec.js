import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://cheerful-beignet-68699c.netlify.app/');
  await page.getByRole('link', { name: 'profile' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'click here' }).click();
  await page.locator('#name').click();
  await page.locator('#name').fill('hire');
  await page.locator('#email').click();
  await page.locator('#email').fill('hire@gmail.com');
  await page.locator('#password').click();
  await page.locator('#password').fill('Doller@?2004');
  await page.getByText('Show').first().click();
  await page.locator('#password').click();
  await page.locator('#password').press('ControlOrMeta+a');
  await page.locator('#password').press('ControlOrMeta+c');
  await page.locator('#confirmPassword').click();
  await page.locator('#confirmPassword').fill('Doller@?2004');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'submit' }).click();
  await page.goto('https://cheerful-beignet-68699c.netlify.app/index.html');
  await page.locator('#top_10MoviesContainer').getByRole('link', { name: 'The Exorcist' }).click();
  await page.getByRole('button', { name: 'Watch now' }).click();
  await page.goto('https://cheerful-beignet-68699c.netlify.app/details.html?id=1&movie_name=The%20Exorcist');
  await page.getByRole('textbox', { name: 'search....' }).click();
  await page.getByRole('textbox', { name: 'search....' }).fill('the');
  await page.getByRole('heading', { name: 'The Conjuring', exact: true }).click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('link', { name: 'Wishlist' }).click();
});