module.exports = class Tools {
    constructor(element) {
        this.element = element;
    }


    async _handledTextInput(selector, value) {
        await this.element.locator(selector).fill(value);
        await this.element.locator(selector).press('Enter');
    }

    async _handledInnerText(selector) {
        const value = await this.element.locator(selector).innerText();
        return value;
    }

    async _handledInputValue(selector) {
        const value = await this.element.locator(selector).inputValue();
        return value;
    }
    async _handledButton(selector, wait = false) {
        await this.element.locator(selector).nth(0).click();
        if (wait) await this._waitLoading();
    }

    async _waitFor(selector){
        await this.element.locator(selector).waitFor();
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
        if (visible) await this.element.locator('//div[contains(text(),\'loaded\')]').waitFor({state:'hidden'});
    }

    async _reload() {
        await this.element.reload({ waitUntil: "networkidle" });
        await this._waitLoading();
    }
};