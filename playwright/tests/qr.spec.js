const { test, expect } = require('@playwright/test');
const Bot = require("./bot");

test.beforeEach('QR',async ({ page }) => {
    const bot = new Bot(page);
    await bot.tools.element.goto('http://127.0.0.1:3000');
});

test.describe('QR', () => {
    test('QR', async ({ page }) => {
        const bot = new Bot(page);
        await bot.tools._handledButtonByTestId('QrCode2Icon');
        const locator = bot.tools.element.locator('//div[text()=\'QR\']');
        await expect(locator).toContainText('QR');
        await expect(bot.tools.element.locator('#root > div > main > svg')).toBeVisible();
    });
});