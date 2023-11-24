const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByTestId('PrecisionManufacturingIcon').click();
  await page.waitForTimeout(3000);

  const locator = page.locator('//div[text()=\'Manipulator\']');
  await expect(locator).toContainText('Manipulator');
});
test.describe('Position', () => {
  test('Edit X coordinate', async ({ page }) => {
    const oldX =  await page.locator('div:nth-child(3) > div > div > div:nth-child(1) > h6').innerText();
    const oldXValue = oldX.split(": ")[1];
    console.log("x_def = ", oldXValue);

    await page.locator('div > div.MuiBox-root.css-s2l2eq > svg:nth-child(4)').click();

    const nextX =  await page.locator('div:nth-child(3) > div > div > div:nth-child(1) > h6').innerText();
    const nextXValue = nextX.split(": ")[1];
    console.log("x_new = ", nextXValue);

    await expect(oldXValue).not.toBe(nextXValue);

    await page.locator('div > div.MuiBox-root.css-s2l2eq > svg:nth-child(3)').click();

    const backX =  await page.locator('div:nth-child(3) > div > div > div:nth-child(1) > h6').innerText();
    const backXValue = backX.split(": ")[1];
    console.log("x_new_1 = ", backXValue);

    await expect(nextXValue).not.toBe(backXValue);
  });

  test('Edit Y coordinate', async ({ page }) => {
    const oldY =  await page.locator('div:nth-child(3) > div > div > div:nth-child(3) > h6').innerText();
    const oldYValue = oldY.split(": ")[1];
    console.log("y_def = ", oldYValue);

    await page.locator('div > div.MuiBox-root.css-s2l2eq > svg:nth-child(1)').click();

    const nextY =  await page.locator('div:nth-child(3) > div > div > div:nth-child(3) > h6').innerText();
    const nextYValue = nextY.split(": ")[1];
    console.log("y_new = ", nextYValue);

    await expect(oldYValue).not.toBe(nextYValue);

    await page.locator('div > div.MuiBox-root.css-s2l2eq > svg:nth-child(2)').click();

    const backY =  await page.locator('div:nth-child(3) > div > div > div:nth-child(3) > h6').innerText();
    const backYValue = backY.split(": ")[1];
    console.log("y_new_1 = ", backYValue);

    await expect(nextYValue).not.toBe(backYValue);
  });

  test('Edit Z coordinate', async ({ page }) => {
    const oldZ =  await page.locator('div:nth-child(3) > div > div > div:nth-child(5) > h6').innerText();
    const oldZValue = oldZ.split(": ")[1];
    console.log("z_def = ", oldZValue);

    await page.locator('div > div.MuiBox-root.css-1bnxa12 > svg:nth-child(2)').click();

    const nextZ =  await page.locator('div:nth-child(3) > div > div > div:nth-child(5) > h6').innerText();
    const nextZValue = nextZ.split(": ")[1];
    console.log("z_new = ", nextZValue);

    await expect(oldZValue).not.toBe(nextZValue);

    await page.locator('div > div.MuiBox-root.css-1bnxa12 > svg:nth-child(1)').click();

    const backZ =  await page.locator('div:nth-child(3) > div > div > div:nth-child(5) > h6').innerText();
    const backZValue = backZ.split(": ")[1];
    console.log("z_new_1 = ", backZValue);

    await expect(nextZValue).not.toBe(backZValue);
  });
});

test.describe('Orientation', () => {
  test('Edit pitch value', async ({ page }) => {
    const oldPitch =  await page.locator('div:nth-child(3) > div > div > div:nth-child(2) > h6').innerText();
    const oldPitchValue = oldPitch.split(": ")[1];
    console.log("value_def = ", oldPitchValue);

    await page.locator('div > div.MuiBox-root.css-1jmon9g > svg:nth-child(1)').click();

    const nextPitch =  await page.locator('div:nth-child(3) > div > div > div:nth-child(2) > h6').innerText();
    const nextPitchValue = nextPitch.split(": ")[1];
    console.log("value_new = ", nextPitchValue);

    await expect(oldPitchValue).not.toBe(nextPitchValue);

    await page.locator('div > div.MuiBox-root.css-bybrtm > svg:nth-child(1)').click();

    const backPitch =  await page.locator('div:nth-child(3) > div > div > div:nth-child(2) > h6').innerText();
    const backPitchValue = backPitch.split(": ")[1];
    console.log("value_new_1 = ", backPitchValue);

    await expect(nextPitchValue).not.toBe(backPitchValue);

  });

  test('Edit roll value', async ({ page }) => {
    const oldRoll =  await page.locator('div:nth-child(3) > div > div > div:nth-child(4) > h6').innerText();
    const oldRollValue = oldRoll.split(": ")[1];
    console.log("value_def = ", oldRollValue);

    await page.locator('div > div.MuiBox-root.css-1jmon9g > svg:nth-child(2)').click();

    const nextRoll =  await page.locator('div:nth-child(3) > div > div > div:nth-child(4) > h6').innerText();
    const nextRollValue = nextRoll.split(": ")[1];
    console.log("value_new = ", nextRollValue);

    await expect(oldRollValue).not.toBe(nextRollValue);

    await page.locator('div > div.MuiBox-root.css-bybrtm > svg:nth-child(2)').click();

    const backRoll =  await page.locator('div:nth-child(3) > div > div > div:nth-child(4) > h6').innerText();
    const backRollValue = backRoll.split(": ")[1];
    console.log("value_new_1 = ", backRollValue);

    await expect(nextRollValue).not.toBe(backRollValue);
  });

  test('Edit yaw value', async ({ page }) => {
    const oldYaw =  await page.locator('div:nth-child(3) > div > div > div:nth-child(4) > h6').innerText();
    const oldYawValue = oldYaw.split(": ")[1];
    console.log("value_def = ", oldYawValue);

    await page.locator('div > div.MuiBox-root.css-1jmon9g > svg:nth-child(3)').click();

    const nextYaw =  await page.locator('div:nth-child(3) > div > div > div:nth-child(6) > h6').innerText();
    const nextYawValue = nextYaw.split(": ")[1];
    console.log("value_new = ", nextYawValue);

    await expect(oldYawValue).not.toBe(nextYawValue);

    await page.locator('div > div.MuiBox-root.css-bybrtm > svg:nth-child(3)').click();

    const backYaw =  await page.locator('div:nth-child(3) > div > div > div:nth-child(6) > h6').innerText();
    const backYawValue = backYaw.split(": ")[1];
    console.log("value_new_1 = ", backYawValue);

    await expect(nextYawValue).not.toBe(backYawValue);
  });
});
