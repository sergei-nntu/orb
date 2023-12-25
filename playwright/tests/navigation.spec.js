const { test, expect } = require('@playwright/test');

test.beforeEach('Navigation',async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test.describe('Navigation', () => {
  test('Navigation', async ({ page }) => {
    await page.getByTestId('NavigationIcon').click();
    const locator = page.locator('//div[text()=\'Navigation\']');
    await expect(locator).toContainText('Navigation');
  });
});