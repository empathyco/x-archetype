import { LocationProvider } from '@empathyco/x-components'
import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import CustomRelatedPrompts from '../related-prompts/custom-related-prompts.vue'
import CustomRecommendations from '../results/custom-recommendations.vue'
import CustomSemanticQueries from './custom-semantic-queries.vue'
import PartialResults from './results/partial-results.vue'
import SearchFallback from './search-fallback.vue'

const xStub = {
  noResults: false,
  partialResults: [] as unknown[],
  semanticQueries: [] as unknown[],
  results: [] as unknown[],
  totalResults: 0,
}

const stateStub = {
  relatedPrompts: [] as unknown[],
  search: { config: { pageSize: 24 } },
}

const use$xMock = vi.hoisted(() => vi.fn(() => xStub))
const useStateMock = vi.hoisted(() =>
  vi.fn((module: string) => {
    if (module === 'relatedPrompts') {
      return { relatedPrompts: { value: stateStub.relatedPrompts } }
    }
    if (module === 'search') {
      return { config: { value: stateStub.search.config } }
    }
    return {}
  }),
)

vi.mock('@empathyco/x-components', async importOriginal => {
  const actual = await importOriginal<typeof import('@empathyco/x-components')>()
  return {
    ...actual,
    use$x: use$xMock,
    useState: useStateMock,
  }
})

function render() {
  const wrapper = shallowMount(SearchFallback, {
    global: {
      stubs: {
        LocationProvider: {
          template: '<div><slot /></div>',
          props: ['location'],
        },
      },
    },
  })
  return {
    wrapper,
    locationProviders: wrapper.findAllComponents(LocationProvider),
    relatedPrompts: wrapper.findComponent(CustomRelatedPrompts),
    semanticQueries: wrapper.findComponent(CustomSemanticQueries),
    partialResults: wrapper.findComponent(PartialResults),
    recommendations: wrapper.findComponent(CustomRecommendations),
  }
}

describe('searchFallback component', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    xStub.noResults = false
    xStub.partialResults = []
    xStub.semanticQueries = []
    xStub.results = []
    xStub.totalResults = 100
    stateStub.relatedPrompts = []
    stateStub.search.config.pageSize = 24
  })

  it('should render related prompts and low_results location when total results are below page size', () => {
    xStub.totalResults = 10
    xStub.results = [{}]
    stateStub.relatedPrompts = [{}]

    const sut = render()

    expect(sut.relatedPrompts.exists()).toBeTruthy()
    expect(sut.semanticQueries.exists()).toBeFalsy()
    expect(sut.partialResults.exists()).toBeFalsy()
    expect(sut.recommendations.exists()).toBeFalsy()

    expect(sut.locationProviders).toHaveLength(1)
    expect(sut.locationProviders[0].props('location')).toBe('low_results')
  })

  it('should render semantic queries when no results and semantic queries exist', () => {
    xStub.noResults = true
    xStub.semanticQueries = [{}]
    stateStub.relatedPrompts = []
    const sut = render()

    expect(sut.relatedPrompts.exists()).toBeFalsy()
    expect(sut.semanticQueries.exists()).toBeTruthy()
    expect(sut.partialResults.exists()).toBeFalsy()
    expect(sut.recommendations.exists()).toBeFalsy()

    expect(sut.locationProviders).toHaveLength(1)
    expect(sut.locationProviders[0].props('location')).toBe('no_results')
  })

  it('should render partial results when no results, without semantic queries and without related prompts', () => {
    xStub.noResults = true
    xStub.semanticQueries = []
    stateStub.relatedPrompts = []
    xStub.partialResults = [{}]

    const sut = render()

    expect(sut.relatedPrompts.exists()).toBeFalsy()
    expect(sut.semanticQueries.exists()).toBeFalsy()
    expect(sut.partialResults.exists()).toBeTruthy()
    expect(sut.recommendations.exists()).toBeFalsy()

    expect(sut.locationProviders).toHaveLength(1)
    expect(sut.locationProviders[0].props('location')).toBe('no_results')
  })

  it('should render recommendations when no results, without partials and without semantic queries', () => {
    xStub.noResults = true
    xStub.partialResults = []
    xStub.semanticQueries = []
    stateStub.relatedPrompts = []
    const sut = render()

    expect(sut.relatedPrompts.exists()).toBeFalsy()
    expect(sut.semanticQueries.exists()).toBeFalsy()
    expect(sut.partialResults.exists()).toBeFalsy()
    expect(sut.recommendations.exists()).toBeTruthy()

    expect(sut.locationProviders).toHaveLength(1)
    expect(sut.locationProviders[0].props('location')).toBe('no_results')
  })

  it('should render related prompts and semantic queries together when both conditions are met', () => {
    xStub.noResults = true
    xStub.semanticQueries = [{}]
    stateStub.relatedPrompts = [{}]

    const sut = render()

    expect(sut.relatedPrompts.exists()).toBeTruthy()
    expect(sut.semanticQueries.exists()).toBeTruthy()
    expect(sut.partialResults.exists()).toBeFalsy()
    expect(sut.recommendations.exists()).toBeFalsy()

    expect(sut.locationProviders).toHaveLength(2)
    expect(sut.locationProviders[0].props('location')).toBe('no_results')
    expect(sut.locationProviders[1].props('location')).toBe('no_results')
  })
})
