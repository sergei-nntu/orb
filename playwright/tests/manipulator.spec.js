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
    const oldX =  await page.locator('div:nth-child(3) > div > div:nth-child(1) > h6').innerText();
    const oldXValue = oldX.split(": ")[1];
    console.log("x_def = ", oldXValue);

    await page.locator('#button-up-x').click();

    const nextX =  await page.locator('div:nth-child(3) > div > div:nth-child(1) > h6').innerText();
    const nextXValue = nextX.split(": ")[1];
    console.log("x_new = ", nextXValue);

    await expect(oldXValue).not.toBe(nextXValue);

    await page.locator('#button-down-x').click();

    const backX =  await page.locator('div:nth-child(3) > div > div:nth-child(1) > h6').innerText();
    const backXValue = backX.split(": ")[1];
    console.log("x_new_1 = ", backXValue);

    await expect(nextXValue).not.toBe(backXValue);

    await page.reload({ waitUntil: "networkidle" });

    const x =  await page.locator('div:nth-child(3) > div > div:nth-child(1) > h6').innerText();
    const xValue = x.split(": ")[1];
    console.log("value_current = ", xValue);

    await expect(backXValue).toBe(xValue);
  });

  test('Edit Y coordinate', async ({ page }) => {
    const oldY =  await page.locator('div:nth-child(3) > div > div:nth-child(3) > h6').innerText();
    const oldYValue = oldY.split(": ")[1];
    console.log("y_def = ", oldYValue);

    await page.locator('#button-up-y').click();

    const nextY =  await page.locator('div:nth-child(3) > div > div:nth-child(3) > h6').innerText();
    const nextYValue = nextY.split(": ")[1];
    console.log("y_new = ", nextYValue);

    await expect(oldYValue).not.toBe(nextYValue);

    await page.locator('#button-down-y').click();

    const backY =  await page.locator('div:nth-child(3) > div > div:nth-child(3) > h6').innerText();
    const backYValue = backY.split(": ")[1];
    console.log("y_new_1 = ", backYValue);

    await expect(nextYValue).not.toBe(backYValue);

    await page.reload({ waitUntil: "networkidle" });

    const y =  await page.locator('div:nth-child(3) > div > div:nth-child(3) > h6').innerText();
    const yValue = y.split(": ")[1];
    console.log("value_current = ", yValue);

    await expect(backYValue).toBe(yValue);
  });

  test('Edit Z coordinate', async ({ page }) => {
    const oldZ =  await page.locator('div:nth-child(3) > div > div:nth-child(5) > h6').innerText();
    const oldZValue = oldZ.split(": ")[1];
    console.log("z_def = ", oldZValue);

    await page.locator('#button-up-z').click();

    const nextZ =  await page.locator('div:nth-child(3) > div > div:nth-child(5) > h6').innerText();
    const nextZValue = nextZ.split(": ")[1];
    console.log("z_new = ", nextZValue);

    await expect(oldZValue).not.toBe(nextZValue);

    await page.locator('#button-down-z').click();

    const backZ =  await page.locator('div:nth-child(3) > div > div:nth-child(5) > h6').innerText();
    const backZValue = backZ.split(": ")[1];
    console.log("z_new_1 = ", backZValue);

    await expect(nextZValue).not.toBe(backZValue);

    await page.reload({ waitUntil: "networkidle" });

    const z =  await page.locator('div:nth-child(3) > div > div:nth-child(5) > h6').innerText();
    const zValue = z.split(": ")[1];
    console.log("value_current = ", zValue);

    await expect(backZValue).toBe(zValue);
  });
});

test.describe('Orientation', () => {
  test('Edit pitch value', async ({ page }) => {
    const oldPitch =  await page.locator('div:nth-child(3) > div > div:nth-child(2) > h6').innerText();
    const oldPitchValue = oldPitch.split(": ")[1];
    console.log("value_def = ", oldPitchValue);

    await page.locator('#button-up-pitch').click();

    const nextPitch =  await page.locator('div:nth-child(3) > div > div:nth-child(2) > h6').innerText();
    const nextPitchValue = nextPitch.split(": ")[1];
    console.log("value_new = ", nextPitchValue);

    await expect(oldPitchValue).not.toBe(nextPitchValue);

    await page.locator('#button-down-pitch').click();

    const backPitch =  await page.locator('div:nth-child(3) > div > div:nth-child(2) > h6').innerText();
    const backPitchValue = backPitch.split(": ")[1];
    console.log("value_new_1 = ", backPitchValue);

    await expect(nextPitchValue).not.toBe(backPitchValue);

    await page.reload({ waitUntil: "networkidle" });

    const pitch =  await page.locator('div:nth-child(3) > div > div:nth-child(2) > h6').innerText();
    const pitchValue = pitch.split(": ")[1];
    console.log("value_current = ", pitchValue);

    await expect(backPitchValue).toBe(pitchValue);

  });

  test('Edit roll value', async ({ page }) => {
    const oldRoll =  await page.locator('div:nth-child(3) > div > div:nth-child(4) > h6').innerText();
    const oldRollValue = oldRoll.split(": ")[1];
    console.log("value_def = ", oldRollValue);

    await page.locator('#button-up-roll').click();

    const nextRoll =  await page.locator('div:nth-child(3) > div > div:nth-child(4) > h6').innerText();
    const nextRollValue = nextRoll.split(": ")[1];
    console.log("value_new = ", nextRollValue);

    await expect(oldRollValue).not.toBe(nextRollValue);

    await page.locator('#button-down-roll').click();

    const backRoll =  await page.locator('div:nth-child(3) > div > div:nth-child(4) > h6').innerText();
    const backRollValue = backRoll.split(": ")[1];
    console.log("value_new_1 = ", backRollValue);

    await expect(nextRollValue).not.toBe(backRollValue);

    await page.reload({ waitUntil: "networkidle" });

    const roll =  await page.locator('div:nth-child(3) > div > div:nth-child(4) > h6').innerText();
    const rollValue = roll.split(": ")[1];
    console.log("value_current = ", rollValue);

    await expect(backRollValue).toBe(rollValue);
  });

  test('Edit yaw value', async ({ page }) => {
    const oldYaw =  await page.locator('div:nth-child(3) > div > div:nth-child(6) > h6').innerText();
    const oldYawValue = oldYaw.split(": ")[1];
    console.log("value_def = ", oldYawValue);

    await page.locator('#button-up-yaw').click();

    const nextYaw =  await page.locator('div:nth-child(3) > div > div:nth-child(6) > h6').innerText();
    const nextYawValue = nextYaw.split(": ")[1];
    console.log("value_new = ", nextYawValue);

    await expect(oldYawValue).not.toBe(nextYawValue);

    await page.locator('#button-down-yaw').click();

    const backYaw =  await page.locator('div:nth-child(3) > div > div:nth-child(6) > h6').innerText();
    const backYawValue = backYaw.split(": ")[1];
    console.log("value_new_1 = ", backYawValue);

    await expect(nextYawValue).not.toBe(backYawValue);

    await page.reload({ waitUntil: "networkidle" });

    const yaw =  await page.locator('div:nth-child(3) > div > div:nth-child(6) > h6').innerText();
    const yawValue = yaw.split(": ")[1];
    console.log("value_current = ", yawValue);

    await expect(backYawValue).toBe(yawValue);
  });
});
test.describe('Joints Position', () => {
  test('Edit Joint0', async ({ page }) => {
    const oldJoint0 =  await page.locator('#input-joint0').inputValue();
    console.log("value_def = ", oldJoint0);

    await page.locator('#input-joint0').fill("20");
    await page.locator('#input-joint0').press("Enter");

    const nextJoint0 =  await page.locator('#input-joint0').inputValue();
    console.log("value_new = ", nextJoint0);

    await expect(oldJoint0).not.toBe(nextJoint0);

    await page.reload({ waitUntil: "networkidle" });

    const joint0 =  await page.locator('#input-joint0').inputValue();
    console.log("value_current = ", joint0);

    await expect(nextJoint0).toBe(joint0);
  });

  test('Edit Joint1', async ({ page }) => {
    const oldJoint1 =  await page.locator('#input-joint1').inputValue();
    console.log("value_def = ", oldJoint1);

    await page.locator('#input-joint1').fill("20");
    await page.locator('#input-joint1').press("Enter");

    const nextJoint1 =  await page.locator('#input-joint1').inputValue();
    console.log("value_new = ", nextJoint1);

    await expect(oldJoint1).not.toBe(nextJoint1);

    await page.reload({ waitUntil: "networkidle" });

    const joint1 =  await page.locator('#input-joint1').inputValue();
    console.log("value_current = ", joint1);

    await expect(nextJoint1).toBe(joint1);
  });

  test('Edit Joint2', async ({ page }) => {
    const oldJoint2 =  await page.locator('#input-joint2').inputValue();
    console.log("value_def = ", oldJoint2);

    await page.locator('#input-joint2').fill("20");
    await page.locator('#input-joint2').press("Enter");

    const nextJoint2 =  await page.locator('#input-joint2').inputValue();
    console.log("value_new = ", nextJoint2);

    await expect(oldJoint2).not.toBe(nextJoint2);

    await page.reload({ waitUntil: "networkidle" });

    const joint2 =  await page.locator('#input-joint2').inputValue();
    console.log("value_current = ", joint2);

    await expect(nextJoint2).toBe(joint2);
  });

  test('Edit Joint3', async ({ page }) => {
    const oldJoint3 =  await page.locator('#input-joint3').inputValue();
    console.log("value_def = ", oldJoint3);

    await page.locator('#input-joint3').fill("20");
    await page.locator('#input-joint3').press("Enter");

    const nextJoint3 =  await page.locator('#input-joint3').inputValue();
    console.log("value_new = ", nextJoint3);

    await expect(oldJoint3).not.toBe(nextJoint3);

    await page.reload({ waitUntil: "networkidle" });

    const joint3 =  await page.locator('#input-joint3').inputValue();
    console.log("value_current = ", joint3);

    await expect(nextJoint3).toBe(joint3);
  });

  test('Edit Joint4', async ({ page }) => {
    const oldJoint4 =  await page.locator('#input-joint4').inputValue();
    console.log("value_def = ", oldJoint4);

    await page.locator('#input-joint4').fill("20");
    await page.locator('#input-joint4').press("Enter");

    const nextJoint4 =  await page.locator('#input-joint4').inputValue();
    console.log("value_new = ", nextJoint4);

    await expect(oldJoint4).not.toBe(nextJoint4);

    await page.reload({ waitUntil: "networkidle" });

    const joint4 =  await page.locator('#input-joint4').inputValue();
    console.log("value_current = ", joint4);

    await expect(nextJoint4).toBe(joint4);
  });

  test('Edit Joint5', async ({ page }) => {
    const oldJoint5 =  await page.locator('#input-joint5').inputValue();
    console.log("value_def = ", oldJoint5);

    await page.locator('#input-joint5').fill("20");
    await page.locator('#input-joint5').press("Enter");

    const nextJoint5 =  await page.locator('#input-joint5').inputValue();
    console.log("value_new = ", nextJoint5);

    await expect(oldJoint5).not.toBe(nextJoint5);

    await page.reload({ waitUntil: "networkidle" });

    const joint5 =  await page.locator('#input-joint5').inputValue();
    console.log("value_current = ", joint5);

    await expect(nextJoint5).toBe(joint5);
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

    await expect(newPosition).toBe(gripperPosition);

  });
});
