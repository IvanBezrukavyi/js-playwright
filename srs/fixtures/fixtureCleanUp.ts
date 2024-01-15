import { test as base } from '../fixtures/fixtureBase'
import { UploadAndDownload } from '../main/demoApp/uploadDownloadPage'

const fileName = '*.jpeg'
const DOWNLOAD_FILE_PATH = 'srs/resources/files/download'

type CleanUpFixtures = {
    removeDownloadedFiles: UploadAndDownload
}

export const test = base.extend<CleanUpFixtures>({
    removeDownloadedFiles: async ({ page }, use) => {
        const uploadAndDownload = new UploadAndDownload(page)

        await uploadAndDownload.removeDownloadedFile(fileName, DOWNLOAD_FILE_PATH)

        await use(uploadAndDownload)
    }
})
