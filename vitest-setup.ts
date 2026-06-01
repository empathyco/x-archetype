import { vi } from 'vitest'
import { ref } from 'vue'

const i18nTMock = vi.fn((key: string, ..._args: unknown[]) => key)
const i18nNMock = vi.fn((value: number, ..._args: unknown[]) => `${value}`)

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    locale: ref('en'),
    t: i18nTMock,
    n: i18nNMock,
  }),
}))

window.xCSSInjector = {
  addStyle: vi.fn(),
}
