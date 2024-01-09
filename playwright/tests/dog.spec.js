const { test, expect } = require('@playwright/test');
const Bot = require("./bot");
const shoulderValue = "-5";
const reductorValue = "-45";
const kneeValue = "95";

test.beforeEach('Dog',async ({ page }) => {
    await page.goto('http://localhost:3000',{ waitUntil: "networkidle" });

    await page.getByTestId('SmartToyIcon').click();
    const locator = page.locator('//div[text()=\'Dog\']');
    await expect(locator).toContainText('Dog');
});
test.describe('Edit Front Left', () => {

    test('Edit Shoulder', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider('div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div > input', shoulderValue);
    });
    test('Edit Reductor', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider('div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div > input', reductorValue);
    });
    test('Edit Knee', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider('div:nth-child(1) > div:nth-child(3) > div:nth-child(3) > div > input', kneeValue);
    });
});
test.describe('Edit Front Right', () => {
    test('Edit Shoulder', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider( 'div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div > input', shoulderValue);
    });
    test('Edit Reductor', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider( 'div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div > input', reductorValue);
    });
    test('Edit Knee', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider('div:nth-child(2) > div:nth-child(3) > div:nth-child(3) > div > input', kneeValue);
    });
});
test.describe('Edit Rear Left', () => {
    test('Edit Shoulder', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider( 'div:nth-child(3) > div:nth-child(1) > div:nth-child(4) > div > input', shoulderValue);
    });
    test('Edit Reductor', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider('div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div > input', reductorValue);
    });
    test('Edit Knee', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider('div:nth-child(3) > div:nth-child(3) > div:nth-child(3) > div > input', kneeValue);
    });
});
test.describe('Edit Rear Right', () => {
    test('Edit Shoulder', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider( 'div:nth-child(4) > div:nth-child(1) > div:nth-child(4) > div > input', shoulderValue);
    });
    test('Edit Reductor', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider( 'div:nth-child(4) > div:nth-child(2) > div:nth-child(3) > div > input', reductorValue);
    });
    test('Edit Knee', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider( 'div:nth-child(4) > div:nth-child(3) > div:nth-child(3) > div > input', kneeValue);
    });
});