//Difine and import module for dealing with tests
const { test } = require('@playwright/test');
const { expect } = require('@playwright/test');

//we have to use async function because this is JS and add browser parameter
test('Catch unshowing message and Verify text message', async ({ browser }) => {
    //ignore browser's plugin/cookies and run browser in incognito mode
    const context = await browser.newContext();
    //Open new browser page
    const page = await context.newPage();
    //Navigate to needed page
    const mainPage = await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const signInBtn = page.locator("[name='signin']");

    await userName.type('rahulshettyacademy1');
    await page.locator("[type='password']").type('learning');
    await signInBtn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');
});

test('Simpler than previous test', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    // Get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle(/.*DEMOQA/);
});

test('Verify presence of iphone X in product list', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const signInBtn = page.locator("[name='signin']");
    const cardTitle = page.locator(".card-body a");

    await userName.type('rahulshettyacademy');
    await page.locator("[type='password']").type('learning');
    await signInBtn.click();
    //Retrieve the first idex of array in different way
    //First option
    console.log(await cardTitle.first().textContent());
    //Second one
    console.log(await cardTitle.nth(0).textContent());
});

test.only('Retrive all card titles from home page', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const signInBtn = page.locator("[name='signin']");
    const cardTitle = page.locator(".card-body a");
    const cardTitles = page.locator(".card-body a");

    await userName.type('rahulshettyacademy');
    await page.locator("[type='password']").type('learning');
    await signInBtn.click();
    /* We need to check the presence at least 1 element before retriving a whole list
There is no mechanism to get all data immidiately*/
    console.log(await cardTitle.first().textContent());
    console.log(await cardTitles.allTextContents());
    await expect(cardTitles).toContainText(['iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry'])
});