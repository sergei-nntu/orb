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
    async _handledButton(selector, wait = false) {
        await this.element.locator(selector).click();
        await this.element.waitForTimeout(2000);
        if (wait) await this._waitLoading();
    }

    async _handledButtonByTestId(selector){
        await this.element.getByTestId(selector).click();
    }

    async _handledKeyButton( button){
        await this.element.keyboard.down(button);
        await this.element.keyboard.up(button);
        await this.element.waitForTimeout(2000);
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
        const responsePromise = this.element.waitForResponse(resp => resp.url().includes('convert_pose') && resp.status() === 200);
        await this.element.reload();
        await responsePromise;

        await this._waitLoading();
    }

    async _reload() {
        await this.element.reload();
        await this._waitLoading();
    }
};