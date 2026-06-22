import type { AiSuggestionQuery } from '@empathyco/x-types'
import { AiCarousel } from '@empathyco/x-components/ai'
import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CustomAiCarousel from './custom-ai-carousel.vue'

const aiStub: AiSuggestionQuery[] = [
  { query: 'laptop' } as AiSuggestionQuery,
  { query: 'mouse' } as AiSuggestionQuery,
  { query: 'keyboard' } as AiSuggestionQuery,
]

const useStateMock = vi.hoisted(() =>
  vi.fn(() => ({
    queries: ref(aiStub),
  })),
)

vi.mock('@empathyco/x-components', async importOriginal => {
  return {
    ...(await importOriginal<typeof import('@empathyco/x-components')>()),
    useState: useStateMock,
  }
})

function render() {
  const snippetConfig = { uiLang: 'en' }
  const wrapper = shallowMount(CustomAiCarousel, {
    global: {
      provide: {
        snippetConfig,
      },
    },
  })

  return {
    aiCarousel: wrapper.findComponent(AiCarousel),
  }
}

describe('customAiCarousel component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should generate title from the ai module queries', () => {
    const { aiCarousel } = render()

    expect(aiCarousel.props('title')).toBe('aiCarousel.title')
    expect(useI18n().t).toHaveBeenCalledWith('aiCarousel.title', {
      queryList: 'laptop, mouse, and keyboard',
    })
  })
})
