import { test, expect } from 'playwright/test'
import { UserDataGeneration } from '../Utils/userDataGeneration'
import { PageActions, KeyboardShortcuts, PageLocators } from '../srs/main/demoApp/textBoxPage copy'

interface UserData {
    fullName: string
    email: string
    currentAddress: string
    permanentAddress: string
}

function getUserData(userData: UserData): Pick<UserData, 'fullName' | 'email' | 'currentAddress' | 'permanentAddress'> {
    return {
        fullName: userData.fullName,
        email: userData.email,
        currentAddress: userData.currentAddress,
        permanentAddress: userData.permanentAddress
    }
}

test.describe('@Demoqa Text Box Tests', () => {
    let pageActions: PageActions
    let keyboardShortcuts: KeyboardShortcuts
    let pageLocators: PageLocators
    let userTestData: UserData

    test.beforeEach(async ({ page }) => {
        pageActions = new PageActions(page, pageLocators)
        keyboardShortcuts = new KeyboardShortcuts(page, pageLocators)
        userTestData = UserDataGeneration.generateUserData()

        await pageActions.goTo()
        await pageActions.selectElementsMenu()
        await pageActions.selectTextBoxMenu()
    })

    test('TC 2: E2E. Enter and remove data from input text fields and via keys and shortcuts and cycle', async () => {
        const userData = getUserData(userTestData)

        await test.step('Step 1. Fill inputs by valid data', async () => {
            await pageActions.fillInputsByValues(
                userData.fullName,
                userData.email,
                userData.currentAddress,
                userData.permanentAddress
            )

            const inputData = await pageActions.getEnteredData()

            await expect(inputData.expFullName, 'Expected the entered full name').toMatch(userData.fullName)
            await expect(inputData.expEmail, 'Expected the entered email').toMatch(userData.email)
            await expect(inputData.expCurrentAddress, 'Expected the entered current address').toMatch(
                userData.currentAddress
            )
            await expect(inputData.expPermanentAddress, 'Expected the entered permanent address').toMatch(
                userData.permanentAddress
            )
        })

        await test.step('Step 2. Click Submit button and Verify submitted data', async () => {
            await pageActions.submitTextBoxForm()

            const submittedData = await pageActions.getEnteredData()

            await expect(submittedData.expFullName, 'Expected the submitted full name').toContain(userData.fullName)
            await expect(submittedData.expEmail, 'Expected the submitted email').toContain(userData.email)
            await expect(submittedData.expCurrentAddress, 'Expected the submitted current address').toContain(
                userData.currentAddress
            )
            await expect(submittedData.expPermanentAddress, 'Expected the submitted permanent address').toContain(
                userData.permanentAddress
            )
        })

        await test.step('Step 3. Remove data from All inputs', async () => {
            const inputLocators = [
                pageActions.inputs.fullName,
                pageActions.inputs.email,
                pageActions.inputs.currentAddress,
                pageActions.inputs.permanentAddress
            ]
            await pageActions.removeInputContent(inputLocators)
        })

        await test.step('Step 4. Click Submit button and Verify absence data after removing it', async () => {
            await pageActions.submitTextBoxForm()
            const removedInputContent = await pageActions.getRemovedInputContent()
            expect(removedInputContent.fullName, 'Expected empty Full Name input field').toBe('')
            expect(removedInputContent.email, 'Expected empty Email input field').toBe('')
            expect(removedInputContent.currentAddress, 'Expected empty Current Address input field').toBe('')
            expect(removedInputContent.permanentAddress, 'Expected empty Permanent Address input field').toBe('')
        })
    })

    test('TC 3: E2E. Enter and remove data from input text fields and via keys and shortcuts', async () => {
        const userData = getUserData(userTestData)

        await test.step('Step 1. Fill inputs by valid data', async () => {
            await keyboardShortcuts.fillInputsByShortcuts(
                userTestData.fullName,
                userTestData.email,
                userTestData.currentAddress,
                userTestData.permanentAddress
            )
            const inputData = await pageActions.getEnteredData()

            await expect(inputData.expFullName, 'Expected the entered full name').toMatch(userData.fullName)
            await expect(inputData.expEmail, 'Expected the entered email').toMatch(userData.email)
            await expect(inputData.expCurrentAddress, 'Expected the entered current address').toMatch(
                userData.currentAddress
            )
            await expect(inputData.expPermanentAddress, 'Expected the entered permanent address').toMatch(
                userData.permanentAddress
            )
        })

        await test.step('Step 2. Click Submit button', async () => {
            await keyboardShortcuts.submitTextBoxFormByEnter()

            const submittedData = await keyboardShortcuts.getSubmittedData()

            await expect(submittedData.expFullName, 'Expected the submitted full name').toContain(userData.fullName)
            await expect(submittedData.expEmail, 'Expected the submitted email').toContain(userData.email)
            await expect(submittedData.expCurrentAddress, 'Expected the submitted current address').toContain(
                userData.currentAddress
            )
            await expect(submittedData.expPermanentAddress, 'Expected the submitted permanent address').toContain(
                userData.permanentAddress
            )
        })

        await test.step('Step 3. Select all data in row and remove it', async () => {
            await keyboardShortcuts.removeContentViaShortcuts(keyboardShortcuts.fullName)
            await keyboardShortcuts.removeContentViaShortcuts(keyboardShortcuts.email)
            await keyboardShortcuts.removeContentViaShortcuts(keyboardShortcuts.currentAddress)
            await keyboardShortcuts.removeContentViaShortcuts(keyboardShortcuts.permanentAddress)
        })

        await test.step('Step 4. Click Submit button and Verify absence data after removing it', async () => {
            await keyboardShortcuts.submitTextBoxFormByEnter()
            const removedInputContent = await keyboardShortcuts.getRemovedInputContent()
            expect(removedInputContent.fullName, 'Expected empty Full Name input field').toBe('')
            expect(removedInputContent.email, 'Expected empty Email input field').toBe('')
            expect(removedInputContent.currentAddress, 'Expected empty Current Address input field').toBe('')
            expect(removedInputContent.permanentAddress, 'Expected empty Permanent Address input field').toBe('')
        })
    })
})
