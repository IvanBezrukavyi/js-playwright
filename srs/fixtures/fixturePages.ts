import { test as base } from '../fixtures/fixtureBase'
import { expect } from 'playwright/test'
import { TextBoxMenuItems } from '../main/demoApp/textBoxMenuItems'
import { TextBoxPageWithMouseActions, TextBoxPageWithKeyboardShortcuts } from '../main/demoApp/textBoxPageNew'
import { UploadAndDownload } from '../main/demoApp/uploadDownloadPage'

type MyFixtures = {
    navigationTextBoxPage: TextBoxMenuItems
    textBoxPageWithMouseActions: TextBoxPageWithMouseActions
    textBoxPageWithKeyboardShortcuts: TextBoxPageWithKeyboardShortcuts
    navigationUploadDownloadPage: TextBoxMenuItems
    uploadDownload: UploadAndDownload
}
export const test = base.extend<MyFixtures>({
    navigationTextBoxPage: async ({ page }, use) => {
        const navigationTextBoxPage = new TextBoxMenuItems(page)
        await navigationTextBoxPage.goTo()
        await navigationTextBoxPage.selectElementsMenu()
        await navigationTextBoxPage.selectTextBoxMenu()
        await use(navigationTextBoxPage)
    },

    textBoxPageWithMouseActions: async ({ page }, use) => {
        await use(new TextBoxPageWithMouseActions(page))
    },

    textBoxPageWithKeyboardShortcuts: async ({ page }, use) => {
        await use(new TextBoxPageWithKeyboardShortcuts(page))
    },

    navigationUploadDownloadPage: async ({ page }, use) => {
        const navigationUploadDownloadPage = new TextBoxMenuItems(page)
        await navigationUploadDownloadPage.goTo()
        await navigationUploadDownloadPage.selectElementsMenu()
        await navigationUploadDownloadPage.selectUploadAndDownloadMenu()
        await use(navigationUploadDownloadPage)
    },

    uploadAndDownload: async ({ page }, use) => {
        await use(new UploadAndDownload(page))
    }
})

export { expect }
