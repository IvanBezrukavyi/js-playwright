import { test } from '@playwright/test'
import { deleteAsync } from 'del'
import { logger } from '../srs/logger/winston.config'

const downloadFile = 'srs/resources/files/download/*.jpeg'

test.describe('Teardown demoqa', () => {
    // eslint-disable-next-line playwright/expect-expect
    test('Remove ${downloadFile} after running demoqa tests', async ({}) => {
        try {
            await deleteAsync([downloadFile])
            logger.info(`Deleted ${downloadFile} successfully`)
        } catch (error) {
            logger.info(`Error deleting ${downloadFile}:${error.message}`)
        }
    })
})
