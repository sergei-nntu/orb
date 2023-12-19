const { test, expect } = require('@playwright/test');
const {handledTextInput} = require("./tools");
const shoulderValue = "-5";
const reductorValue = "-45";
const kneeValue = "95";

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.getByTestId('SmartToyIcon').click();
    const locator = page.locator('//div[text()=\'Dog\']');
    await expect(locator).toContainText('Dog');
});
test.describe('Edit Front Left', () => {
    test('Edit Shoulder', async ({ page }) => {
        await handledTextInput({page}, 'div:nth-child(1) > div:nth-child(3) > div > input',shoulderValue);
    });
    test('Edit Reductor', async ({ page }) => {
        await handledTextInput({page}, 'div:nth-child(2) > div:nth-child(3) > div > input',reductorValue);
    });
    test('Edit Knee', async ({ page }) => {
        await handledTextInput({page}, 'div:nth-child(3) > div:nth-child(3) > div > input',kneeValue);
    });
});
test.describe('Edit Front Right', () => {
    test('Edit Shoulder', async ({ page }) => {
        await handledTextInput({page}, 'div:nth-child(4) > div:nth-child(3) > div > input',shoulderValue);
    });
    test('Edit Reductor', async ({ page }) => {
        await handledTextInput({page}, 'div:nth-child(5) > div:nth-child(3) > div > input',reductorValue);
    });
    test('Edit Knee', async ({ page }) => {
        await handledTextInput({page}, 'div:nth-child(6) > div:nth-child(3) > div > input',kneeValue);
    });
});
test.describe('Edit Rear Left', () => {
    test('Edit Shoulder', async ({ page }) => {
        await handledTextInput({page}, 'div:nth-child(7) > div:nth-child(3) > div > input',shoulderValue);
    });
    test('Edit Reductor', async ({ page }) => {
        await handledTextInput({page}, 'div:nth-child(8) > div:nth-child(3) > div > input',reductorValue);
    });
    test('Edit Knee', async ({ page }) => {
        await handledTextInput({page}, 'div:nth-child(9) > div:nth-child(3) > div > input',kneeValue);
    });
});
test.describe('Edit Rear Right', () => {
    test('Edit Shoulder', async ({ page }) => {
        await handledTextInput({page}, 'div:nth-child(10) > div:nth-child(3) > div > input',shoulderValue);
    });
    test('Edit Reductor', async ({ page }) => {
        await handledTextInput({page}, 'div:nth-child(11) > div:nth-child(3) > div > input',reductorValue);
    });
    test('Edit Knee', async ({ page }) => {
        await handledTextInput({page}, 'div:nth-child(12) > div:nth-child(3) > div > input',kneeValue);
    });
});