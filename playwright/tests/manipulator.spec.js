const { test, expect } = require('@playwright/test');
const {handledInnerText, handledTextInput} = require("./tools");
const jointValue = "20";

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByTestId('PrecisionManufacturingIcon').click();
  const locator = page.locator('//div[text()=\'Manipulator\']');
  await expect(locator).toContainText('Manipulator');
});
test.describe('Position', () => {
  test.describe.configure({ mode: 'serial' });
  test('Edit X coordinate', async ({ page }) => {
    await handledInnerText({page}, 'div:nth-child(1) > div > div:nth-child(1) > h6',"x");
  });
  test('Edit Y coordinate', async ({ page }) => {
    await handledInnerText({page}, 'div:nth-child(1) > div > div:nth-child(2) > h6',"y");
  });
  test('Edit Z coordinate', async ({ page }) => {
    await handledInnerText({page}, 'div:nth-child(1) > div > div:nth-child(3) > h6',"z");
  });
});
test.describe('Orientation', () => {
  test.describe.configure({ mode: 'serial' });
  test('Edit pitch value', async ({ page }) => {
    await handledInnerText({page}, 'div:nth-child(2) > div > div:nth-child(1) > h6',"pitch");
  });
  test('Edit roll value', async ({ page }) => {
    await handledInnerText({page}, 'div:nth-child(3) > div > div > div:nth-child(2) > div > div:nth-child(2) > h6',"roll");
  });
  test('Edit yaw value', async ({ page }) => {
    await handledInnerText({page}, 'div:nth-child(2) > div > div:nth-child(3) > h6',"yaw");
  });
});
test.describe('Joints Position', () => {
  test.describe.configure({ mode: 'serial' });
  test('Edit Joint0', async ({ page }) => {
    await handledTextInput({page}, '#input-joint-0',jointValue);
  });
  test('Edit Joint1', async ({ page }) => {
    await handledTextInput({page}, '#input-joint-1',jointValue);
  });
  test('Edit Joint2', async ({ page }) => {
    await handledTextInput({page}, '#input-joint-2',jointValue);
  });
  test('Edit Joint3', async ({ page }) => {
    await handledTextInput({page}, '#input-joint-3',jointValue);
  });
  test('Edit Joint4', async ({ page }) => {
    await handledTextInput({page}, '#input-joint-4',jointValue);
  });
  test('Edit Joint5', async ({ page }) => {
    await handledTextInput({page}, '#input-joint-5',jointValue);
  });
});
test.describe('Gripper State', () => {
  test('Edit Gripper State', async ({ page }) => {
    const oldPosition =  await page.locator('#slider-gripper-state > span> input').inputValue();
    console.log("position_0 = ", oldPosition);

    const sliderTrack = await page.locator('#slider-gripper-state');
    const sliderOffsetWidth = await sliderTrack.evaluate(el => {
      return el.getBoundingClientRect().width;
    })
    console.log("sliderOffsetWidth = ", sliderOffsetWidth);
    // Using the hover method to place the mouse cursor then moving it to the right
    await sliderTrack.hover({ force: true, position: { x: 0, y: 0 } });
    await page.mouse.down();
    await sliderTrack.click({ force: true, position: { x: (sliderOffsetWidth / 1.5), y: 0 } });
    await page.mouse.up();

    const newPosition =  await page.locator('#slider-gripper-state > span> input').inputValue();
    console.log("position_1 = ", newPosition);

    await expect(oldPosition).not.toBe(newPosition);

    await page.reload({ waitUntil: "networkidle" });

    const gripperPosition =  await page.locator('#slider-gripper-state > span> input').inputValue();
    console.log("value_current = ", gripperPosition);

    // await expect(newPosition).toBe(gripperPosition);

  });
});
test.describe('Connection to the server', () => {
  test('Establishing a connection to the server', async ({ page }) => {
    const userMessage =  await page.locator('//div[@id="user-message"][1]').innerText();
    console.log("text = ", userMessage);
    await expect(userMessage).not.toBe('Error with connection to the server');
  });
});