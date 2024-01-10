const { test, expect } = require('@playwright/test');
const Bot = require("./bot");

test.beforeEach('Planning',async ({ page }) => {
    const bot = new Bot(page);
    await bot.tools.element.goto('http://localhost:3000', {waitUntil: 'networkidle'});
    await bot.tools._handledButtonByTestId('NextPlanIcon');
    const locator = bot.tools.element.locator('//div[text()=\'Planning\']');
    await expect(locator).toContainText('Planning');
});
test.describe('Planning', () => {
    test.describe.configure({ mode: 'serial' });
    test('Delete blocks', async ({ page }) => {
        const bot = new Bot(page);
        await bot.tools.element.mouse.click(600, 100, { button: 'right' });
        const blocks = await bot.tools.element.locator('//div[contains(text(),\'Delete\')]').isEnabled();
        if(blocks){
            console.log("Delete blocks");
            bot.tools.element.on('dialog', async dialog => {
                console.log(dialog.message());
                await dialog.accept();
            });
            await bot.tools.element.locator('//div[contains(text(),\'Delete\')]').click();
            console.log("Saving changes");
            await bot.tools._handledButton("//button[text()=\'SAVE\']");
            await bot.tools._waitFor('//div[contains(text(),\'The program state has been saved!\')]', 'visible');
        }
    });
    test('Drag and Drop Blocks', async ({ page }) => {
        console.log("Drag and Drop Blocks");
        const bot = new Bot(page);
        const source1 = bot.tools.element.locator('g.blocklyBlockCanvas > rect:nth-child(8)');
        const source2 = bot.tools.element.locator('g.blocklyBlockCanvas > g:nth-child(13)');
        const source3 = bot.tools.element.locator('g.blocklyBlockCanvas > g:nth-child(15)');
        const source4 = bot.tools.element.locator('g.blocklyBlockCanvas > g:nth-child(17)');
        const source5 = bot.tools.element.locator('g.blocklyBlockCanvas > g:nth-child(5)');
        // const source6 = page.locator('g.blocklyBlockCanvas > g:nth-child(13)');
        // const source7 = page.locator('g.blocklyBlockCanvas > g:nth-child(15)');
        // const source8 = page.locator('g.blocklyBlockCanvas > g:nth-child(17)');
        const target = bot.tools.element.locator('div > svg.blocklySvg > g');
        // const box = await source5.boundingBox();
        // console.log("box-w = ", box.width);
        // console.log("box-h = ", box.height);
        // const x0 = 600;
        // const y0 = 400;
        await source1.dragTo(target, {
            targetPosition: { x: 600, y: 200 }
        });
        await source2.dragTo(target, {
            targetPosition: { x: 760, y: 220 }
        });
        await source3.dragTo(target, {
            targetPosition: { x: 660, y: 240}
        });
        await source4.dragTo(target, {
            targetPosition: { x: 660, y: 260 }
        });
        await source5.dragTo(target, {
            targetPosition: { x: 700, y: 180 }
        });
        // await source6.dragTo(target, {
        //     targetPosition: { x: 760, y: 280 }
        // });
        // await source7.dragTo(target, {
        //     targetPosition: { x: 660, y: 300 }
        // });
        // await source8.dragTo(target, {
        //     targetPosition: { x: 660, y: 320 }
        // });
        await bot.tools._handledButton("//button[text()=\'SAVE\']");
        await bot.tools._waitFor('//div[contains(text(),\'The program state has been saved!\')]', 'visible');
    });
    test('Editing block values', async ({ page }) => {
        console.log("Editing block values");
        const bot = new Bot(page);
        await bot.tools._handledButton('g:nth-child(5) > g:nth-child(6)');
        await bot.tools._handledTextInput('div.blocklyWidgetDiv.geras-renderer.classic-theme > input', '0.1');

        await bot.tools._handledButton('g:nth-child(8) > g:nth-child(8)');
        await bot.tools._handledTextInput('div.blocklyWidgetDiv.geras-renderer.classic-theme > input', '0.2');

        await bot.tools._handledButton('g:nth-child(8) > g:nth-child(10)');
        await bot.tools._handledTextInput('div.blocklyWidgetDiv.geras-renderer.classic-theme > input', '0.1');

        await bot.tools._handledButton('g:nth-child(8) > g:nth-child(12)');
        await bot.tools._handledTextInput('div.blocklyWidgetDiv.geras-renderer.classic-theme > input', '0.1');

        await bot.tools._handledButton('g:nth-child(8) > g:nth-child(14)');
        await bot.tools._handledTextInput('div.blocklyWidgetDiv.geras-renderer.classic-theme > input', '0.1');

        await bot.tools._handledButton('g:nth-child(8) > g:nth-child(16)');
        await bot.tools._handledTextInput('div.blocklyWidgetDiv.geras-renderer.classic-theme > input', '0.2');

        await bot.tools._handledButton('g:nth-child(8) > g.blocklyDraggable > g.blocklyDraggable > g.blocklyEditableText');
        await bot.tools._handledTextInput('div.blocklyWidgetDiv.geras-renderer.classic-theme > input', '20');

        await bot.tools._handledButton("//button[text()=\'SAVE\']");
        await bot.tools._waitFor('//div[contains(text(),\'The program state has been saved!\')]', 'visible');
    });
    test('Running the program', async ({ page }) => {
        console.log("Running the program");
        const bot = new Bot(page);
        await bot.tools._handledButton('g:nth-child(5) > g.blocklyDraggable > g.blocklyDraggable');
        await bot.tools._handledButtonByTestId('PlayArrowIcon');
        await bot.tools._waitFor('div > div.MuiAlert-message', 'visible');
        let message;
        message =  await bot.tools._handledInnerText('div > div.MuiAlert-message');
        console.log("message = ", message);
        if(message === "The program is already running!"){
            await bot.tools._waitFor('div > div.MuiAlert-message', 'hidden');
            await bot.tools._handledButtonByTestId('StopIcon');
            await bot.tools._waitFor('div > div.MuiAlert-message', 'visible');
            await bot.tools._handledButtonByTestId('PlayArrowIcon');
            await bot.tools._waitFor('div > div.MuiAlert-message', 'visible');
            message =  await bot.tools._handledInnerText('div > div.MuiAlert-message');
        }
        await expect(message).toBe("The program has been running!");
        // await page.locator('//div[contains(text(),\'The program has been running!\')]').waitFor({state:'visible'});

        const checkActiveBlock = async() => {
            try {
                await bot.tools._waitFor('g:nth-child(8) > g.blocklyDraggable > g.blocklyDraggable > path[style="display: inline;"]', 'visible');
            }
            catch (e){
                console.log("Active block not found!");
            }
            console.log("Stopped the program");
            await bot.tools._waitFor('g:nth-child(8) > g.blocklyDraggable > g.blocklyDraggable > path[style="display: inline;"]', 'hidden');
            await bot.tools._handledButtonByTestId('StopIcon');
            await bot.tools._waitFor('div > div.MuiAlert-message', 'visible');
            message =  await bot.tools._handledInnerText('div > div.MuiAlert-message');
            console.log("message = ", message);
            return message;
        };

        message = await checkActiveBlock();
        if(message === "The program isn't running now!"){
            await bot.tools._waitFor('div > div.MuiAlert-message', 'hidden');
            await bot.tools._handledButtonByTestId('PlayArrowIcon');
            await bot.tools._waitFor('div > div.MuiAlert-message', 'visible');
            message = await checkActiveBlock();
        }
        await expect(message).toBe("The program has been stopped!");
    });
    test('Saving changes', async ({ page }) => {
        console.log("Saving changes");
        const bot = new Bot(page);
        await bot.tools._handledButton("//button[text()=\'SAVE\']");
        await bot.tools._waitFor('//div[contains(text(),\'The program state has been saved!\')]', 'visible');
    });
});
