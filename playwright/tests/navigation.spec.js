const { test, expect } = require('@playwright/test');
const Bot = require("./bot");

test.beforeEach('Navigation',async ({ page }) => {
  const bot = new Bot(page);
  await bot.tools.element.setViewportSize({
    width: 1920,
    height: 1080,
  });
  await bot.tools.element.goto('http://localhost:3000');
});

test.describe('Navigation', () => {
  test('Navigation', async ({ page }) => {
    const bot = new Bot(page);
    await bot.tools._handledButtonByTestId('NavigationIcon');
    const locator = bot.tools.element.locator('//div[text()=\'Navigation\']');
    await expect(locator).toContainText('Navigation');
  });
});