import type { QueryPreviewInfo } from '@empathyco/x-components/queries-preview'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import PreSearchManager from './pre-search-manager.vue'
import PreSearchQueryPreviewList from './pre-search-query-preview-list.vue'

const use$xStub = {
  query: {
    searchBox: '',
  },
}

const popularSearchesStub: QueryPreviewInfo[] = []

const use$xMock = vi.hoisted(() => vi.fn(() => use$xStub))
const useStateMock = vi.hoisted(() =>
  vi.fn(() => ({
    popularSearches: ref(popularSearchesStub),
  })),
)

vi.mock('@empathyco/x-components', async importOriginal => {
  const actual = await importOriginal<typeof import('@empathyco/x-components')>()
  return {
    ...actual,
    use$x: use$xMock,
    useState: useStateMock,
  }
})

function render(options?: { maxPopularSearchesToRender?: number }) {
  const wrapper = mount(PreSearchManager, {
    props: options,
    global: {
      stubs: {
        PreSearchQueryPreviewList: true,
      },
    },
  })

  return {
    wrapper,
    title: wrapper.find('[data-test="pre-search-manager-title"]'),
    queryPreviewList: wrapper.findComponent(PreSearchQueryPreviewList),
  }
}

describe('preSearchManager component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    use$xStub.query.searchBox = ''
    popularSearchesStub.length = 0
  })

  it('should not render when searchBox query is not empty', () => {
    use$xStub.query.searchBox = 'test query'
    popularSearchesStub.push(
      { query: 'dress', isCurated: false },
      { query: 'shoes', isCurated: false },
    )

    const sut = render()

    expect(sut.title.exists()).toBeFalsy()
    expect(sut.queryPreviewList.exists()).toBeFalsy()
  })

  it('should not render when there are no popular searches', () => {
    use$xStub.query.searchBox = ''

    const sut = render()

    expect(sut.title.exists()).toBeFalsy()
    expect(sut.queryPreviewList.exists()).toBeFalsy()
  })

  it('should render title and query preview list when popularSearches exist', () => {
    popularSearchesStub.push(
      { query: 'dress', isCurated: false },
      { query: 'shoes', isCurated: false },
      { query: 'bags', isCurated: false },
    )

    const sut = render()

    expect(sut.title.exists()).toBeTruthy()
    expect(sut.title.text()).toBe('popularSearches.title')
    expect(sut.queryPreviewList.props('queriesPreviewInfo')).toEqual(
      popularSearchesStub.map(popularSearch => ({ query: popularSearch.query })),
    )
    expect(sut.queryPreviewList.exists()).toBeTruthy()
  })

  it('should limit popular searches to maxPopularSearchesToRender prop (default 4)', () => {
    popularSearchesStub.push(
      { query: 'dress', isCurated: false },
      { query: 'shoes', isCurated: false },
      { query: 'bags', isCurated: false },
      { query: 'jackets', isCurated: false },
      { query: 'sunglasses', isCurated: false },
      { query: 'hats', isCurated: false },
    )

    const sut = render()

    expect(sut.wrapper.props('maxPopularSearchesToRender')).toBe(4)
    const expectedPopularSearches = popularSearchesStub
      .map(popularSearch => ({ query: popularSearch.query }))
      .slice(0, 4)
    expect(sut.queryPreviewList.props('queriesPreviewInfo')).toEqual(expectedPopularSearches)
    expect(sut.queryPreviewList.props('queriesPreviewInfo')).toHaveLength(4)
  })

  it('should respect custom maxPopularSearchesToRender prop', () => {
    popularSearchesStub.push(
      { query: 'dress', isCurated: false },
      { query: 'shoes', isCurated: false },
      { query: 'bags', isCurated: false },
      { query: 'jackets', isCurated: false },
      { query: 'sunglasses', isCurated: false },
    )

    const sut = render({ maxPopularSearchesToRender: 2 })

    const expectedPopularSearches = popularSearchesStub
      .map(popularSearch => ({ query: popularSearch.query }))
      .slice(0, 2)
    expect(sut.queryPreviewList.props('queriesPreviewInfo')).toEqual(expectedPopularSearches)
    expect(sut.queryPreviewList.props('queriesPreviewInfo')).toHaveLength(2)
  })
})
