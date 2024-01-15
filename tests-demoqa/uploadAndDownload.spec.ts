import * as path from 'path'
import { test } from '../srs/fixtures/fixtureCleanUp'
import { expect } from '../srs/fixtures/fixturePages'

const SINGLE_FILE_PATH = process.env.SINGLE_FILE_PATH || 'srs/resources/files/upload/Customer_Flight_Activity.csv'

const DOWNLOAD_FILE_PATH = 'srs/resources/files/download'
const fileName = '*.jpeg'

export const navigationUploadDownloadPage = async ({ navigationUploadDownloadPage }) => {
    await navigationUploadDownloadPage.goTo()
    await navigationUploadDownloadPage.selectElementsMenu()
    await navigationUploadDownloadPage.selectUploadAndDownloadMenu()
}

test.describe('@Demoqa Download and Upload tests', () => {
    test('TC_1: Verify downloading 1 file', async ({ navigationUploadDownloadPage, uploadDownload }) => {
        await navigationUploadDownloadPage({ navigationUploadDownloadPage })
        const customFileName = await uploadDownload.downloadFile()
        const actualFilePath = await uploadDownload.retrieveDownloadedFile(customFileName)

        expect(actualFilePath.filePath, 'Expected download file path').toBe(
            path.join(DOWNLOAD_FILE_PATH, customFileName)
        )
    })

    test('TC_2: Verify uploading 1 file', async ({ navigationUploadDownloadPage, uploadDownload }) => {
        await navigationUploadDownloadPage({ navigationUploadDownloadPage })
        await uploadDownload.selectAndUploadFile()
        const uploadedFilePath = await uploadDownload.getUploadedFilePath()
        expect(uploadedFilePath, 'Expected upload file path').toContain(path.basename(SINGLE_FILE_PATH))
    })
})

test.afterAll(`Remove downloaded file(s)`, async ({ removeDownloadedFiles }) => {
    removeDownloadedFiles.removeDownloadedFile(fileName, DOWNLOAD_FILE_PATH)
})
