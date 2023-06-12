import { expect } from 'chai';
import { By, Key, Builder, until } from 'selenium-webdriver';

require('chromedriver');

/**
 * @author Madelief van Slooten
 * Creating a post E2E tests.
 */
describe('Post E2E tests', async function () {
    this.timeout(30000);

    it('Creates a post by first logging in, going to create post and filling everything in.', async () => {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get('http://localhost:4200/login');
            let email = await driver.findElement(By.id('email'));
            email.clear();
            email.sendKeys('Admin@Test.com');
            let password = await driver.findElement(By.id('password'));
            password.clear();
            password.sendKeys('Admin123!');
            await driver.findElement(By.id('loginButton')).click();
            await driver.sleep(2000);
            await driver.findElement(By.id('create-post')).click();

            let description = await driver.findElement(By.id('description'));
            description.clear();
            description.sendKeys('E2E Test Post');

            let title = await driver.findElement(By.id('title'));
            title.clear();
            title.sendKeys('E2E Test Post Title');

            let area = await driver.findElement(By.id('areaOfExpertise'));
            let sdg = await driver.findElement(By.id('sdg'));

            await area.click();
            const areaOption = await driver.findElement(By.css('#areaOfExpertise option:nth-child(5)'));
            await areaOption.click();

            await sdg.click();
            const sdgOption = await driver.findElement(By.css('#sdg option:nth-child(5)'));
            await sdgOption.click();

            await driver.sleep(1000);

            await driver.findElement(By.id('createPostButton')).click();

            await driver.sleep(3000);
        } finally {
            await driver.quit();
        }
    });

    it('Does not create a post when fields are still empty', async () => {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get('http://localhost:4200/login');
            let email = await driver.findElement(By.id('email'));
            email.clear();
            email.sendKeys('Admin@Test.com');
            let password = await driver.findElement(By.id('password'));
            password.clear();
            password.sendKeys('Admin123!');
            await driver.findElement(By.id('loginButton')).click();
            await driver.sleep(2000);
            await driver.findElement(By.id('create-post')).click();

            let description = await driver.findElement(By.id('description'));
            description.clear();
            description.sendKeys('');

            let title = await driver.findElement(By.id('title'));
            title.clear();
            title.sendKeys('');

            await driver.sleep(1000);

            let submit = await driver.findElement(By.id('createPostButton'));

            expect(await submit.isEnabled()).to.be.false;
        } finally {
            await driver.quit();
        }
    });
});
