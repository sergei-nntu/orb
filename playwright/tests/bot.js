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

        // const enabled = await this.element.locator('#input-joint-0').isDisabled();
        // console.log("enabled = ", enabled)

        // if(enabled)
        await this.element.locator('//*[(contains(@class,\'disabled\'))] //*[(contains(@id,\'input-joint\'))]').last().waitFor({state:'hidden'});

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

    async _handledEditValueByClick(selector, button = [], key=false) {

        const oldCoordinate = await this.tools._handledInnerText(selector);

        const oldCoordinateValue = oldCoordinate.split(":")[1].trim();
        console.log("coordinate_def = ", oldCoordinateValue);

        if(key) {
            await this.tools._handledKeyButton(button[0]);

        } else {
            await this.tools._handledButton(`#button-up-${button[0]}`, false, button[0] );
        }

        const nextCoordinate = await this.tools._handledInnerText(selector);

        const nextCoordinateValue = nextCoordinate.split(":")[1].trim();
        console.log("coordinate_new = ", nextCoordinateValue);

        await expect(oldCoordinateValue).not.toBe(nextCoordinateValue);

        if(key) {
            await this.tools._handledKeyButton(button[1]);

        }else{
            await this.tools._handledButton(`#button-down-${button[0]}`, false, button[0]);
        }

        const backCoordinate =  await this.tools._handledInnerText(selector);
        const backCoordinateValue = backCoordinate.split(":")[1].trim();
        console.log("coordinate_new_1 = ", backCoordinateValue);

        await expect(nextCoordinateValue).not.toBe(backCoordinateValue);

        await this.tools._reloadManipulator();

        const coordinate =  await this.tools._handledInnerText(selector);
        const coordinateValue = coordinate.split(":")[1].trim();
        console.log("coordinate_current = ", coordinateValue);

        await expect(backCoordinateValue).toBe(coordinateValue);
    }

    async _getListValues(selector)  {
        const elements = [];
        const elementsAll = await this.element.locator(selector).all();
        console.log("elementsAll = ",elementsAll);
        for (const element of elementsAll) {
            const value = await element.inputValue();
            elements.push(value);
        }
        console.log("elements = ", elements);
        return elements;
    }

    async _handledEditTrajectory(selector, button) {
        const joints_def = await this._getListValues('input[id*= input-joint]');
        // const responsePromise = this.tools.element.waitForResponse(resp => resp.url().includes('post_joints_state'));
        const enabled = await this.element.locator('#button-down-z').isEnabled();
        if(enabled){
            await this.tools._handledButton( selector, false, button);
        }
        // await responsePromise;
        await this.tools._waitFor('//div[text()=\'Changed goal state\']','visible');
        // const message =  await this.tools._handledInnerText('#user-message');
        // console.log("message = ", message);
        // await this.tools.element.waitForTimeout(1000);
        const joints_new= await this._getListValues('input[id*= input-joint]');
        await expect(joints_def).not.toStrictEqual(joints_new);
    }
};
