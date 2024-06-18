const { test, expect } = require('@playwright/test');
const Bot = require("./bot");
const shoulderValue = "-5";
const reductorValue = "-45";
const kneeValue = "95";

test.beforeEach('Dog',async ({ page }) => {
    const bot = new Bot(page);
    await bot.tools.element.setViewportSize({
        width: 1920,
        height: 1080,
    });
    await bot.tools.element.goto('http://localhost:3000/oqp');
    const enabled = await bot.tools.element.locator('#slider-joint-0').isEnabled();

    // await bot.tools._handledButtonByTestId('SmartToyIcon');

    // const responsePromise = bot.tools.element.waitForResponse(resp => resp.url().includes('get_pose_state') && resp.status() === 200);
    // await bot.tools.element.goto('http://localhost:3000/oqp');
    // await responsePromise;

    if(enabled){
        const locator = bot.tools.element.locator('//div[text()=\'OQP\']');
        await expect(locator).toContainText('OQP');
    }

});
test.describe.skip('Edit Front Left', () => {

    test('Edit Shoulder', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider('div:nth-child(1) > div:nth-child(3) > div > input', shoulderValue);
    });
    test('Edit Reductor', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider('div:nth-child(2) > div:nth-child(3) > div > input', reductorValue);
    });
    test('Edit Knee', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider('div:nth-child(3) > div:nth-child(3) > div > input', kneeValue);
    });
});
test.describe.skip('Edit Front Right', () => {
    test('Edit Shoulder', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider( 'div:nth-child(4) > div:nth-child(3) > div > input', shoulderValue);
    });
    test('Edit Reductor', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider( ' div:nth-child(5) > div:nth-child(3) > div > input', reductorValue);
    });
    test('Edit Knee', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider('div:nth-child(6) > div:nth-child(3) > div > input', kneeValue);
    });
});
test.describe.skip('Edit Rear Left', () => {
    test('Edit Shoulder', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider( 'div:nth-child(7) > div:nth-child(3) > div > input', shoulderValue);
    });
    test('Edit Reductor', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider('div:nth-child(8) > div:nth-child(3) > div > input', reductorValue);
    });
    test('Edit Knee', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider('div:nth-child(9) > div:nth-child(3) > div > input', kneeValue);
    });
});
test.describe.skip('Edit Rear Right', () => {
    test('Edit Shoulder', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider( 'div:nth-child(10) > div:nth-child(3) > div > input', shoulderValue);
    });
    test('Edit Reductor', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider( 'div:nth-child(11) > div:nth-child(3) > div > input', reductorValue);
    });
    test('Edit Knee', async ({ page }) => {
        const bot = new Bot(page);
        await bot._handledEditValueSlider( 'div:nth-child(12) > div:nth-child(3) > div > input', kneeValue);
    });
});