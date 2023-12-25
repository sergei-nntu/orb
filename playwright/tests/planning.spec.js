const { test, expect } = require('@playwright/test');

test.beforeEach('Planning',async ({ page }) => {
    await page.goto('http://localhost:3000', {waitUntil: 'networkidle'});
    await page.getByTestId('NextPlanIcon').click();
    const locator = page.locator('//div[text()=\'Planning\']');
    await expect(locator).toContainText('Planning');
});
test.describe('Planning', () => {
    test.describe.configure({ mode: 'serial' });
    test('Delete blocks', async ({ page }) => {
        await page.mouse.click(600, 100, { button: 'right' });
        const blocks = await page.locator('//div[contains(text(),\'Delete\')]').isEnabled();
        if(blocks){
            console.log("Delete blocks");
            page.on('dialog', async dialog => {
                console.log(dialog.message());
                await dialog.accept();
            });
            await page.locator('//div[contains(text(),\'Delete\')]').click();
            console.log("Saving changes");
            await page.locator("//button[text()=\'SAVE\']").click();
            await page.locator('//div[contains(text(),\'The program state has been saved!\')]').waitFor({state:'visible'});
        }
    });
    test('Drag and Drop Blocks', async ({ page }) => {
        console.log("Drag and Drop Blocks");
        const source1 = page.locator('g.blocklyBlockCanvas > rect:nth-child(8)');
        const source2 = page.locator('g.blocklyBlockCanvas > g:nth-child(13)');
        const source3 = page.locator('g.blocklyBlockCanvas > g:nth-child(15)');
        const source4 = page.locator('g.blocklyBlockCanvas > g:nth-child(17)');
        const source5 = page.locator('g.blocklyBlockCanvas > g:nth-child(5)');
        const target = page.locator('div > svg.blocklySvg > g');
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
        await page.locator("//button[text()=\'SAVE\']").click();
        await page.locator('//div[contains(text(),\'The program state has been saved!\')]').waitFor({state:'visible'});
    });
    test('Editing block values', async ({ page }) => {
        console.log("Editing block values");
        await page.locator('g:nth-child(5) > g:nth-child(6)').click();
        await page.locator('div.blocklyWidgetDiv.geras-renderer.classic-theme > input').fill("0.1");
        await page.locator('div.blocklyWidgetDiv.geras-renderer.classic-theme > input').press("Enter");

        await page.locator('g:nth-child(8) > g:nth-child(8)').click();
        await page.locator('div.blocklyWidgetDiv.geras-renderer.classic-theme > input').fill("0.2");
        await page.locator('div.blocklyWidgetDiv.geras-renderer.classic-theme > input').press("Enter");

        await page.locator('g:nth-child(8) > g:nth-child(10)').click();
        await page.locator('div.blocklyWidgetDiv.geras-renderer.classic-theme > input').fill("0.1");
        await page.locator('div.blocklyWidgetDiv.geras-renderer.classic-theme > input').press("Enter");

        await page.locator('g:nth-child(8) > g:nth-child(12)').click();
        await page.locator('div.blocklyWidgetDiv.geras-renderer.classic-theme > input').fill("0.1");
        await page.locator('div.blocklyWidgetDiv.geras-renderer.classic-theme > input').press("Enter");

        await page.locator('g:nth-child(8) > g:nth-child(14)').click();
        await page.locator('div.blocklyWidgetDiv.geras-renderer.classic-theme > input').fill("0.1");
        await page.locator('div.blocklyWidgetDiv.geras-renderer.classic-theme > input').press("Enter");

        await page.locator('g:nth-child(8) > g:nth-child(16)').click();
        await page.locator('div.blocklyWidgetDiv.geras-renderer.classic-theme > input').fill("0.2");
        await page.locator('div.blocklyWidgetDiv.geras-renderer.classic-theme > input').press("Enter");

        await page.locator('g:nth-child(8) > g.blocklyDraggable > g.blocklyDraggable > g.blocklyEditableText').click();
        await page.locator('div.blocklyWidgetDiv.geras-renderer.classic-theme > input').fill("20");
        await page.locator('div.blocklyWidgetDiv.geras-renderer.classic-theme > input').press("Enter");

        await page.locator("//button[text()=\'SAVE\']").click();
        await page.locator('//div[contains(text(),\'The program state has been saved!\')]').waitFor({state:'visible'});
    });
    test('Running the program', async ({ page }) => {
        console.log("Running the program");
        await page.locator('g:nth-child(5) > g.blocklyDraggable > g.blocklyDraggable').click();
        await page.getByTestId('PlayArrowIcon').click();
        await page.locator('div > div.MuiAlert-message').waitFor({state:'visible'});
        let message;
        message =  await page.locator('div > div.MuiAlert-message').innerText();
        console.log("message = ", message);
        if(message === "The program is already running!"){
            await page.locator('div > div.MuiAlert-message').waitFor({state:'hidden'});
            await page.getByTestId('StopIcon').click();
            await page.locator('div > div.MuiAlert-message').waitFor({state:'visible'});
            await page.getByTestId('PlayArrowIcon').click();
            await page.locator('div > div.MuiAlert-message').waitFor({state:'visible'});
            message =  await page.locator('div > div.MuiAlert-message').innerText();
        }
        await expect(message).toBe("The program has been running!");
        // await page.locator('//div[contains(text(),\'The program has been running!\')]').waitFor({state:'visible'});

        const checkActiveBlock = async(page) => {
            try {
                await page.locator('g:nth-child(8) > g.blocklyDraggable > g.blocklyDraggable > path[style="display: inline;"]').waitFor({state:'visible'});
            }
            catch (e){
                console.log("Active block not found!");
            }
            console.log("Stopped the program");
            await page.locator('g:nth-child(8) > g.blocklyDraggable > g.blocklyDraggable > path[style="display: inline;"]').waitFor({state:'hidden'});
            await page.getByTestId('StopIcon').click();
            await page.locator('div > div.MuiAlert-message').waitFor({state:'visible'});
            message =  await page.locator('div > div.MuiAlert-message').innerText();
            console.log("message = ", message);
            return message;
        };

        message = await checkActiveBlock(page);
        if(message === "The program isn't running now!"){
            await page.locator('div > div.MuiAlert-message').waitFor({state:'hidden'});
            await page.getByTestId('PlayArrowIcon').click();
            await page.locator('div > div.MuiAlert-message').waitFor({state:'visible'});
            message = await checkActiveBlock(page);
        }
        await expect(message).toBe("The program has been stopped!");
        // await page.locator('//div[contains(text(),\'The program has been stopped!\')]').waitFor({state:'visible'});
    });
    test('Saving changes', async ({ page }) => {
        console.log("Saving changes");
        await page.locator("//button[text()=\'SAVE\']").click();
        await page.locator('//div[contains(text(),\'The program state has been saved!\')]').waitFor({state:'visible'});
    });
});
