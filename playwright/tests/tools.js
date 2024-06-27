module.exports = class Tools {
    constructor(element) {
        this.element = element;
    }

    async _handledTextInput(selector, value) {
        await this.element.locator(selector).fill(value);
        await this.element.locator(selector).press('Enter');
    }

    async _handledInnerText(selector) {
        const value = await this.element.locator(selector).last().innerText();
        return value;
    }

    async _handledInputValue(selector) {
        const value = await this.element.locator(selector).inputValue();
        return value;
    }
    async _handledButton(selector, wait = false, button) {
        await this.element.locator(selector).click();
        await this.element.waitForTimeout(2000);
        await this.element.locator(`#progress-bar-${button}`).waitFor({state:'hidden'});
        if (wait) await this._waitLoading();
    }

    async _handledSystemButton(selector, wait = false) {
        await this.element.locator(selector).click();
        if (wait) await this._waitLoading();
    }

    async _handledButtonByTestId(selector){
        await this.element.getByTestId(selector).click();
    }

    async _handledKeyButton( button){
        await this.element.keyboard.down(button);
        await this.element.keyboard.up(button);
        await this.element.waitForTimeout(2000);
        await this.element.locator('span[id*= progress-bar]').last().waitFor({state:'hidden'});

    }

    async _waitFor(selector, state){
        await this.element.locator(selector).last().waitFor({state:state});
    }

    async _isVisible(selector){
        try {
            await this.element.locator(selector).last().waitFor({timeout:5000});
            return true;
        }
        catch (e){
            return  false;
        }
    }

    async _waitLoading() {
        const visible = await this._isVisible("div > canvas");
        console.log("visible = ", visible);
        if (visible) await this.element.locator('//div[contains(text(),\'loaded\')]').waitFor({state:'hidden'});
    }

    async _reloadManipulator() {
        // const responsePromise = this.element.waitForResponse(resp => resp.url().includes('convert_pose') && resp.status() === 200);
        await this.element.reload({ waitUntil: "networkidle" });
        await this._waitLoading();
        // await responsePromise;

        const enabled = await this.element.locator('#button-down-z').isDisabled();
        console.log("enabled = ", enabled)

        if(enabled) await this.element.locator('svg[class*= Disabled]').last().waitFor({state:'hidden'});
    }

    async _reload() {
        await this.element.reload({ waitUntil: "networkidle" });
        await this._waitLoading();

        // const enabled = await this.element.locator('#input-joint-0').isDisabled();
        // console.log("enabled = ", enabled)

        // if(enabled)
        await this.element.locator('//*[(contains(@class,\'disabled\'))] //*[(contains(@id,\'input-joint\'))]').last().waitFor({state:'hidden'});
    }
};