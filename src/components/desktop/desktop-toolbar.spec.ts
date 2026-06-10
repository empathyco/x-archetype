import type { Mock } from 'vitest'
import { BaseIdModalOpen, FiltersIcon } from '@empathyco/x-components'
import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Translation } from 'vue-i18n'
import ColumnPicker from '../column-picker.vue'
import DesktopToolbar from './desktop-toolbar.vue'

const use$xStub = {
  totalResults: 10,
  spellcheckedQuery: 'mocked spellcheckedQuery',
  selectedFilters: [1, 2],
}
const useGetterStub = {
  query: 'mocked query',
}
const use$xMock = vi.hoisted(() => vi.fn(() => use$xStub))
const useGetterMock = vi.hoisted(() => vi.fn(() => useGetterStub))
vi.mock('@empathyco/x-components', async importOriginal => {
  return {
    ...(await importOriginal<typeof import('@empathyco/x-components')>()),
    use$x: use$xMock,
    useGetter: useGetterMock,
  }
})

const getControlMock = vi.hoisted<Mock<(key: string) => any>>(() =>
  vi.fn((key: string) => {
    if (key === 'gridConfig.columnPicker') return true
    if (key === 'facetsPanelOverlay') return true
    return undefined
  }),
)
vi.mock('../../composables/use-experience-controls.composable', () => ({
  useExperienceControls: vi.fn(() => ({
    getControl: getControlMock,
  })),
}))

function render() {
  const wrapper = shallowMount(DesktopToolbar, {
    global: {
      stubs: {
        'i18n-t': {
          template: `<span><slot name="totalResults" /><slot name="query" /></span>`,
          props: ['keypath', 'scope', 'tag', 'plural'],
        },
        BaseIdModalOpen: {
          template: '<div><slot /></div>',
          props: ['modalId'],
        },
      },
    },
  })

  return {
    wrapper: wrapper.find('[data-test="desktop-toolbar"]'),
    totalResults: wrapper.findComponent(Translation),
    columnPicker: wrapper.findComponent(ColumnPicker),
    baseIdModalOpen: wrapper.findComponent(BaseIdModalOpen),
    filterText: wrapper.find('[data-test="desktop-toolbar-filter-text"]'),
    selectedFiltersBadge: wrapper.find('[data-test="desktop-toolbar-selected-filters-badge"]'),
    filtersIcon: wrapper.findComponent(FiltersIcon),
  }
}

describe('desktopToolbar component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  it('should render correctly by default', () => {
    const sut = render()

    expect(sut.wrapper.exists()).toBeTruthy()
    expect(sut.totalResults.props('keypath')).toBe('totalResults.message')
    expect(sut.totalResults.props('scope')).toBe('global')
    expect(sut.totalResults.props('tag')).toBe('span')
    expect(sut.totalResults.props('plural')).toBe(use$xStub.totalResults)
    expect(sut.totalResults.text()).toContain(use$xStub.totalResults.toString())
    expect(sut.totalResults.text()).toContain(use$xStub.spellcheckedQuery)
    expect(sut.totalResults.text()).not.toContain(useGetterStub.query)
    expect(sut.columnPicker.exists()).toBeTruthy()
    expect(sut.baseIdModalOpen.exists()).toBeTruthy()
    expect(sut.baseIdModalOpen.props('modalId')).toBe('right-aside')
    expect(sut.filterText.text()).toBe('toggleAside.showAside')
    expect(sut.selectedFiltersBadge.exists()).toBeTruthy()
    expect(sut.selectedFiltersBadge.text()).toBe(use$xStub.selectedFilters.length.toString())
    expect(sut.selectedFiltersBadge.classes()).toContain('xds:badge-circle')
    expect(sut.filtersIcon.exists()).toBeTruthy()
  })

  it('should not render if there are no results', () => {
    use$xMock.mockReturnValue({ ...use$xStub, totalResults: 0 })
    const sut = render()

    expect(sut.wrapper.exists()).toBeFalsy()
  })

  it('should not render the column picker if the control is disabled', () => {
    getControlMock.mockImplementation((key: string) => {
      if (key === 'gridConfig.columnPicker') return false
      if (key === 'facetsPanelOverlay') return true
      return undefined
    })
    const sut = render()

    expect(sut.columnPicker.exists()).toBeFalsy()
  })

  it('should render the query from the getter if there is no spellchecked query', () => {
    use$xMock.mockReturnValue({ ...use$xStub, spellcheckedQuery: '' })
    const sut = render()

    expect(sut.totalResults.text()).toContain(useGetterStub.query)
    expect(sut.totalResults.text()).not.toContain(use$xStub.spellcheckedQuery)
  })

  it('should not render the badge if there are no selected filters', () => {
    use$xMock.mockReturnValue({ ...use$xStub, selectedFilters: [] })
    const sut = render()

    expect(sut.selectedFiltersBadge.exists()).toBeFalsy()
  })

  it('should not render the badge with circle class if there are more than 9 selected filters', () => {
    use$xMock.mockReturnValue({ ...use$xStub, selectedFilters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] })
    const sut = render()

    expect(sut.selectedFiltersBadge.exists()).toBeTruthy()
    expect(sut.selectedFiltersBadge.classes()).not.toContain('xds:badge-circle')
  })

  it('should not render BaseIdModalOpen if the facetsPanelOverlay control is disabled', () => {
    getControlMock.mockImplementation((key: string) => {
      if (key === 'gridConfig.columnPicker') return true
      if (key === 'facetsPanelOverlay') return false
      return undefined
    })
    const sut = render()

    expect(sut.baseIdModalOpen.exists()).toBeFalsy()
  })
})
