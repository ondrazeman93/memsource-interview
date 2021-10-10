const { reloadApp } = require('./reload');

describe('Login', () => {
    beforeEach(async () => {
        await reloadApp();
    });

    it('should have login screen', async () => {
        await expect(element(by.id('LoginScreen'))).toBeVisible();
    });

    it('wrong password', async () => {
        await element(by.id('usernameInput')).typeText('name');
        await element(by.id('passwordInput')).typeText('pass');
        await element(by.text('loginButton')).tap();

        await expect(element(by.text('responseError'))).toBeVisible();
    });

    it('correct password', async () => {
        await element(by.id('usernameInput')).typeText('ondra.zeman.93');
        await element(by.id('passwordInput')).typeText('N87pO0u%9Aq2M7hU$wvP');
        await element(by.text('loginButton')).tap();

        await expect(element(by.text('ProjectListScreen'))).toBeVisible();
    });
});
