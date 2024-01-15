import { test } from '@playwright/test'

test.describe('Teardown', () => {
    // eslint-disable-next-line playwright/expect-expect
    test('Include auth teardown', async ({}) => {
        await import('tests/auth.tearDown.spec.ts')
    })

    // eslint-disable-next-line playwright/expect-expect
    test('Include demoqa teardown', async ({}) => {
        await import('tests-demoqa/demoqa.tearDown.spec.ts')
    })
})
