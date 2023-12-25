const {expect} = require("@playwright/test");

exports.handledTextInput = async ({ page }, selector, value) => {
    const oldValue =  await page.locator(selector).inputValue();
    console.log("value_def = ", oldValue);

    await page.locator(selector).fill(value);
    await page.locator(selector).press("Enter");

    const nextValue =  await page.locator(selector).inputValue();
    console.log("value_new = ", nextValue);

    await expect(oldValue).not.toBe(nextValue);

    await page.reload({ waitUntil: "networkidle" });

    const currentValue =  await page.locator(selector).inputValue();
    console.log("value_current = ", currentValue);

    // await expect(nextValue).toBe(value);
    await page.locator(selector).fill(oldValue);
    await page.locator(selector).press("Enter");

}

exports.handledInnerText = async ({ page }, selector, button) => {
    const oldCoordinate =  await page.locator(selector).innerText();
    const oldCoordinateValue = oldCoordinate.split(": ")[1];
    console.log("coordinate_def = ", oldCoordinateValue);

    await page.locator(`#button-up-${button}`).click();

    const nextCoordinate =  await page.locator(selector).innerText();
    const nextCoordinateValue = nextCoordinate.split(": ")[1];
    console.log("coordinate_new = ", nextCoordinateValue);

    await expect(oldCoordinateValue).not.toBe(nextCoordinateValue);

    await page.locator(`#button-down-${button}`).click();

    const backCoordinate =  await page.locator(selector).innerText();
    const backCoordinateValue = backCoordinate.split(": ")[1];
    console.log("coordinate_new_1 = ", backCoordinateValue);

    await expect(nextCoordinateValue).not.toBe(backCoordinateValue);

    await page.reload({ waitUntil: "networkidle" });

    const coordinate =  await page.locator(selector).innerText();
    const coordinateValue = coordinate.split(": ")[1];
    console.log("coordinate_current = ", coordinateValue);

    await expect(backCoordinateValue).toBe(coordinateValue);
}

const _isVisible = async ({ page }, selector) => {
    try {
        await page.locator(selector).waitFor({timeout:2000});
        return true;
    }
    catch (e){
        return  false;
    }
}

exports.waitLoading = async ({ page } ) => {
    const visible = await _isVisible({page} ,'div > canvas');
    console.log("visible = ", visible);
    if (visible) await page.locator('//div[contains(text(),\'loaded\')]').waitFor({state:'hidden'});
}