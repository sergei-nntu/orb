const {expect} = require("@playwright/test");

const Tools = require("./tools");

module.exports = class Bot {
    constructor(page) {
        this.tools = new Tools(page);
        this.element = page;
    }
    get element() {
        return this._element;
    }
    set element(element) {
        this.tools.element = element;
        this._element = element;
    }

    async _handledEditValueSlider(selector, value) {

        const oldValue = await this.tools._handledInputValue(selector);
        console.log("value_def = ", oldValue);

        await this.tools._handledTextInput(selector,value);

        const nextValue =  await this.tools._handledInputValue(selector);
        console.log("value_new = ", nextValue);

        await expect(oldValue).not.toBe(nextValue);

        await this.tools._reload();

        const currentValue = await this.tools._handledInputValue(selector);
        console.log("value_current = ", currentValue);

        await expect(nextValue).toBe(currentValue);

        await this.tools._handledTextInput(selector,oldValue);

        await this.tools._reload();

        const defValue = await this.tools._handledInputValue(selector);
        console.log("defValue = ",defValue);

        await expect(defValue).toBe(oldValue);
    }

    async _handledEditValueByClick(selector, button) {

        const oldCoordinate = await this.tools._handledInnerText(selector);

        const oldCoordinateValue = oldCoordinate.split(": ")[1];
        console.log("coordinate_def = ", oldCoordinateValue);

        await this.tools._handledButton(`#button-up-${button}`);

        const nextCoordinate = await this.tools._handledInnerText(selector);

        const nextCoordinateValue = nextCoordinate.split(": ")[1];
        console.log("coordinate_new = ", nextCoordinateValue);

        await expect(oldCoordinateValue).not.toBe(nextCoordinateValue);

        await this.tools._handledButton(`#button-down-${button}`);

        const backCoordinate =  await this.tools._handledInnerText(selector);
        const backCoordinateValue = backCoordinate.split(": ")[1];
        console.log("coordinate_new_1 = ", backCoordinateValue);

        await expect(nextCoordinateValue).not.toBe(backCoordinateValue);

        await this.tools._reload();

        const coordinate =  await this.tools._handledInnerText(selector);
        const coordinateValue = coordinate.split(": ")[1];
        console.log("coordinate_current = ", coordinateValue);

        await expect(backCoordinateValue).toBe(coordinateValue);
    }
};
