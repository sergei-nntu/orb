const { test, expect } = require('@playwright/test');

test.beforeEach('QR',async ({ page }) => {
    await page.goto('http://localhost:3000');
});

test.describe('QR', () => {
    test('QR', async ({ page }) => {
        await page.getByTestId('QrCode2Icon').click();
        const locator = page.locator('//div[text()=\'QR\']');
        await expect(locator).toContainText('QR');
        await expect(page.locator('#root > div > main > svg')).toBeVisible();
    });
});