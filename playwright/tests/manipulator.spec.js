const { test, expect } = require('@playwright/test');
const Bot = require("./bot");
const jointValue = "20";

test.beforeEach('Manipulator',async ({ page }) => {
  const bot = new Bot(page);
  // await bot.tools.element.goto('http://localhost:3000/manipulator');
  // await bot.tools._waitLoading();

  const responsePromise = bot.tools.element.waitForResponse(resp => resp.url().includes('convert_pose') && resp.status() === 200);
  await bot.tools.element.goto('http://localhost:3000/manipulator');
  await responsePromise;

  // await bot.tools._handledButtonByTestId('PrecisionManufacturingIcon');
  const locator = bot.tools.element.locator('//div[text()=\'Manipulator\']');
  await expect(locator).toContainText('Manipulator');
});
test.describe('Position', () => {
  test.describe.configure({ mode: 'serial' });
  test('Edit X coordinate', async ({ page }) => {
    const bot = new Bot(page);
    await bot._handledEditValueByClick( 'div:nth-child(1) > div > div:nth-child(1) > h6',["x"]);
  });
  test('Edit X coordinate with keyboard buttons', async ({ page }) => {
    const bot = new Bot(page);
    await bot._handledEditValueByClick( 'div:nth-child(1) > div > div:nth-child(1) > h6',["D","A"], true);
  });
  test('Edit Y coordinate', async ({ page }) => {
    const bot = new Bot(page);
    await bot._handledEditValueByClick( 'div:nth-child(1) > div > div:nth-child(2) > h6',["y"]);
  });
  test('Edit Y coordinate with keyboard buttons', async ({ page }) => {
    const bot = new Bot(page);
    await bot._handledEditValueByClick( 'div:nth-child(1) > div > div:nth-child(2) > h6',["W","S"], true);
  });
  test('Edit Z coordinate', async ({ page }) => {
    const bot = new Bot(page);
    await bot._handledEditValueByClick( 'div:nth-child(1) > div > div:nth-child(3) > h6',["z"]);
  });
  test('Edit Z coordinate with keyboard buttons', async ({ page }) => {
    const bot = new Bot(page);
    await bot._handledEditValueByClick( 'div:nth-child(1) > div > div:nth-child(3) > h6',["E","Q"], true);
  });
});
test.describe('Changing the path of movement of the manipulator', () => {
  test.describe.configure({ mode: 'serial' });
  test('Changing the path of movement of the manipulator along the X coordinate',async ({ page }) => {
    const bot = new Bot(page);
    // await bot.tools.element.waitForTimeout(1000);
    await bot._handledEditTrajectory('#button-up-x');
    await bot._handledEditTrajectory('#button-down-x');
  });
  test('Changing the path of movement of the manipulator along the Y coordinate',async ({ page }) => {
    const bot = new Bot(page);
    // await bot.tools.element.waitForTimeout(1000);
    await bot._handledEditTrajectory('#button-up-y');
    await bot._handledEditTrajectory('#button-down-y');
  });
  test('Changing the path of movement of the manipulator along the Z coordinate',async ({ page }) => {
    const bot = new Bot(page);
    // await bot.tools.element.waitForTimeout(1000);
    await bot._handledEditTrajectory('#button-up-z');
    await bot._handledEditTrajectory('#button-down-z');
  });
  test('Changing the trajectory of the manipulator when changing the pitch',async ({ page }) => {
    const bot = new Bot(page);
    // await bot.tools.element.waitForTimeout(1000);
    await bot._handledEditTrajectory('#button-up-pitch');
    await bot._handledEditTrajectory('#button-down-pitch');

  });
  test('Changing the trajectory of the manipulator when changing the roll',async ({ page }) => {
    const bot = new Bot(page);
    // await bot.tools.element.waitForTimeout(1000);
    await bot._handledEditTrajectory('#button-up-roll');
    await bot._handledEditTrajectory('#button-down-roll');
  });
  test('Changing the trajectory of the manipulator when changing yaw',async ({ page }) => {
    const bot = new Bot(page);
    // await bot.tools.element.waitForTimeout(1000);
    await bot._handledEditTrajectory('#button-up-yaw');
    await bot._handledEditTrajectory('#button-down-yaw');
  });
});
test.describe('Orientation', () => {
  test.describe.configure({ mode: 'serial' });
  test('Edit pitch value', async ({ page }) => {
    const bot = new Bot(page);
    await bot._handledEditValueByClick('div:nth-child(2) > div > div:nth-child(1) > h6',["pitch"]);
  });
  test('Edit roll value', async ({ page }) => {
    const bot = new Bot(page);
    await bot._handledEditValueByClick('div:nth-child(3) > div > div > div:nth-child(2) > div > div:nth-child(2) > h6',["roll"]);
  });
  test('Edit yaw value', async ({ page }) => {
    const bot = new Bot(page);
    await bot._handledEditValueByClick( 'div:nth-child(2) > div > div:nth-child(3) > h6',["yaw"]);
  });
});
test.describe.skip('Joints Position tests', () => {
  test.describe.configure({ mode: 'serial' });
  test('Edit Joint0', async ({ page }) => {
    const bot = new Bot(page);
    await bot._handledEditValueSlider( '#input-joint-0',jointValue);
  });
  test('Edit Joint1', async ({ page }) => {
    const bot = new Bot(page);
    await bot._handledEditValueSlider( '#input-joint-1',jointValue);
  });
  test('Edit Joint2', async ({ page }) => {
    const bot = new Bot(page);
    await bot._handledEditValueSlider( '#input-joint-2',jointValue);
  });
  test('Edit Joint3', async ({ page }) => {
    const bot = new Bot(page);
    await bot._handledEditValueSlider( '#input-joint-3',jointValue);
  });
  test('Edit Joint4', async ({ page }) => {
    const bot = new Bot(page);
    await bot._handledEditValueSlider( '#input-joint-4',jointValue);
  });
  test('Edit Joint5', async ({ page }) => {
    const bot = new Bot(page);
    await bot._handledEditValueSlider( '#input-joint-5',jointValue);
  });
});
test.describe('Gripper State', () => {
  test('Edit Gripper State', async ({ page }) => {
    const bot = new Bot(page);
    const oldPosition =  await bot.tools._handledInputValue('#slider-gripper-state > span> input');
    console.log("position_0 = ", oldPosition);

    const sliderTrack = await bot.tools.element.locator('#slider-gripper-state');
    const sliderOffsetWidth = await sliderTrack.evaluate(el => {
      return el.getBoundingClientRect().width;
    })
    console.log("sliderOffsetWidth = ", sliderOffsetWidth);
    // Using the hover method to place the mouse cursor then moving it to the right
    await sliderTrack.hover({ force: true, position: { x: 0, y: 0 } });
    await bot.tools.element.mouse.down();
    await sliderTrack.click({ force: true, position: { x: (sliderOffsetWidth / 1.5), y: 0 } });
    await bot.tools.element.mouse.up();

    const newPosition = await bot.tools._handledInputValue('#slider-gripper-state > span> input');
    console.log("position_1 = ", newPosition);

    await expect(oldPosition).not.toBe(newPosition);
    await bot.tools._reload();

    const gripperPosition =  await bot.tools._handledInputValue('#slider-gripper-state > span> input');

    console.log("value_current = ", gripperPosition);

  });
});
test.describe('Connection to the server', () => {
  test('Establishing a connection to the server', async ({ page }) => {
    const bot = new Bot(page);
    const userMessage = await bot.tools._handledInnerText('//div[@id="user-message"][1]');
    console.log("text = ", userMessage);
    await expect(userMessage).not.toBe('Error with connection to the server');
  });
});
