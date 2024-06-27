const { test, expect } = require('@playwright/test');
const Bot = require("./bot");
const shoulderValue = "-5";
const reductorValue = "-45";
const kneeValue = "80";

test.beforeEach('Dog',async ({ page }) => {
    const bot = new Bot(page);
    await bot.tools.element.setViewportSize({
        width: 1920,
        height: 1080,
    });
    await bot.tools.element.goto('http://localhost:3000/oqp');
    // const enabled = await bot.tools.element.locator('#input-joint-0').isEnabled();

    await bot.tools.element.locator('//*[(contains(@class,\'disabled\'))] //*[(contains(@id,\'input-joint\'))]').last().waitFor({state:'hidden'});

    // await bot.tools._handledButtonByTestId('SmartToyIcon');

    // const responsePromise = bot.tools.element.waitForResponse(resp => resp.url().includes('get_pose_state') && resp.status() === 200);
    // await bot.tools.element.goto('http://localhost:3000/oqp');
    // await responsePromise;

    // if(enabled){
    const locator = bot.tools.element.locator('//div[text()=\'OQP\']');
    await expect(locator).toContainText('OQP');
    // }

});
test.describe('Edit Front Left', () => {

    test('Edit Shoulder', async ({ page }) => {
        const bot = new Bot(page);
        await bot.tools.element.waitForTimeout(3000);
        await bot._handledEditValueSlider('#input-joint-0', shoulderValue);
    });
    test('Edit Reductor', async ({ page }) => {
        const bot = new Bot(page);
        await bot.tools.element.waitForTimeout(3000);
        await bot._handledEditValueSlider('#input-joint-1', reductorValue);
    });
    test('Edit Knee', async ({ page }) => {
        const bot = new Bot(page);
        await bot.tools.element.waitForTimeout(3000);
        await bot._handledEditValueSlider('#input-joint-2', kneeValue);
    });
});
test.describe('Edit Front Right', () => {
    test('Edit Shoulder', async ({ page }) => {
        const bot = new Bot(page);
        await bot.tools.element.waitForTimeout(3000);
        await bot._handledEditValueSlider( '#input-joint-3', shoulderValue);
    });
    test('Edit Reductor', async ({ page }) => {
        const bot = new Bot(page);
        await bot.tools.element.waitForTimeout(3000);
        await bot._handledEditValueSlider( '#input-joint-4', reductorValue);
    });
    test('Edit Knee', async ({ page }) => {
        const bot = new Bot(page);
        await bot.tools.element.waitForTimeout(3000);
        await bot._handledEditValueSlider('#input-joint-5', kneeValue);
    });
});
test.describe('Edit Rear Left', () => {
    test('Edit Shoulder', async ({ page }) => {
        const bot = new Bot(page);
        await bot.tools.element.waitForTimeout(3000);
        await bot._handledEditValueSlider( '#input-joint-6', shoulderValue);
    });
    test('Edit Reductor', async ({ page }) => {
        const bot = new Bot(page);
        await bot.tools.element.waitForTimeout(3000);
        await bot._handledEditValueSlider('#input-joint-7', reductorValue);
    });
    test('Edit Knee', async ({ page }) => {
        const bot = new Bot(page);
        await bot.tools.element.waitForTimeout(3000);
        await bot._handledEditValueSlider('#input-joint-8', kneeValue);
    });
});
test.describe('Edit Rear Right', () => {
    test('Edit Shoulder', async ({ page }) => {
        const bot = new Bot(page);
        await bot.tools.element.waitForTimeout(3000);
        await bot._handledEditValueSlider( '#input-joint-9', shoulderValue);
    });
    test('Edit Reductor', async ({ page }) => {
        const bot = new Bot(page);
        await bot.tools.element.waitForTimeout(3000);
        await bot._handledEditValueSlider( '#input-joint-10', reductorValue);
    });
    test('Edit Knee', async ({ page }) => {
        const bot = new Bot(page);
        await bot.tools.element.waitForTimeout(3000);
        await bot._handledEditValueSlider( '#input-joint-11', kneeValue);
    });
});