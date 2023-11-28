const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
});

test.describe('QR', () => {
    test('QR', async ({ page }) => {
        await page.getByTestId('QrCode2Icon').click();
        await page.waitForTimeout(3000);
        const locator = page.locator('//div[text()=\'QR\']');
        await expect(locator).toContainText('QR');
    });
});