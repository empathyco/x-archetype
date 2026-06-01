import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { Translation } from 'vue-i18n'
import ColumnPicker from '../column-picker.vue'
import MobileToolbar from './mobile-toolbar.vue'

const getControlFromPathMock = vi.hoisted(() => vi.fn(() => ref({ columnPicker: true })))
vi.mock('../composables/use-experience-controls.composable', () => ({
  useExperienceControls: vi.fn(() => ({
    getControlFromPath: getControlFromPathMock,
  })),
}))

const use$xStub = {
  totalResults: 10,
  spellcheckedQuery: 'mocked spellcheckedQuery',
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

function render() {
  const wrapper = shallowMount(MobileToolbar, {
    global: {
      stubs: {
        'i18n-t': {
          template: `<span><slot name="totalResults" /><slot name="query" /></span>`,
          props: ['keypath', 'scope', 'tag'],
        },
      },
    },
  })

  return {
    wrapper: wrapper.find('[data-test="mobile-toolbar"]'),
    totalResults: wrapper.findComponent(Translation),
    columnPicker: wrapper.findComponent(ColumnPicker),
  }
}

describe('mobileToolbar component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  it('should render correctly by default', () => {
    const sut = render()

    expect(sut.wrapper.exists()).toBeTruthy()
    expect(sut.totalResults.text()).toContain(use$xStub.totalResults.toString())
    expect(sut.totalResults.text()).toContain(use$xStub.spellcheckedQuery)
    expect(sut.totalResults.text()).not.toContain(useGetterStub.query)
    expect(sut.columnPicker.exists()).toBeTruthy()
  })

  it('should not render if there are no results', () => {
    use$xMock.mockReturnValue({ ...use$xStub, totalResults: 0 })
    const sut = render()

    expect(sut.wrapper.exists()).toBeFalsy()
  })

  it('should not render the column picker if the control is disabled', () => {
    getControlFromPathMock.mockReturnValue(ref({ columnPicker: false }))
    const sut = render()

    expect(sut.columnPicker.exists()).toBeFalsy()
  })

  it('should render the query from the getter if there is no spellchecked query', () => {
    use$xMock.mockReturnValue({ ...use$xStub, spellcheckedQuery: '' })
    const sut = render()

    expect(sut.totalResults.text()).toContain(useGetterStub.query)
    expect(sut.totalResults.text()).not.toContain(use$xStub.spellcheckedQuery)
  })
})
