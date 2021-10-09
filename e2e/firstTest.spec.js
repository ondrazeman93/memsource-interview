// For more info on how to write Detox tests, see the official docs:
// https://github.com/wix/Detox/blob/master/docs/README.md

const { reloadApp } = require('./reload');

describe('Example', () => {
    beforeEach(async () => {
        await reloadApp();
    });

    it('should have welcome Screen', async () => {
        await expect(element(by.id('WelcomeScreen'))).toBeVisible();
    });

    it('should go to next Screen after tap', async () => {
        await element(by.id('next-Screen-Button')).tap();
        await expect(element(by.id('DemoScreen'))).toBeVisible();
    });
});
