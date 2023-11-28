const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
});

test.describe('Planning', () => {
    test('Planning', async ({ page }) => {
        await page.getByTestId('NextPlanIcon').click();
        // await page.waitForTimeout(3000);
        const locator = page.locator('//div[text()=\'Planning\']');
        await expect(locator).toContainText('Planning');

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
            targetPosition: { x: 600, y: 400 }
        });

        await source2.dragTo(target, {
            targetPosition: { x: 760, y: 420 }
        });

        await source3.dragTo(target, {
            targetPosition: { x: 660, y: 440}
        });

        await source4.dragTo(target, {
            targetPosition: { x: 660, y: 460 }
        });

        await source5.dragTo(target, {
            targetPosition: { x: 700, y: 380 }
        });

        await page.waitForTimeout(3000);

    });
});