import type { Mock } from 'vitest'
import {
  BaseColumnPickerList,
  Grid1ColIcon,
  Grid2ColIcon,
  Grid4ColIcon,
} from '@empathyco/x-components'
import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import ColumnPicker from './column-picker.vue'
import GridListIcon from './icons/grid-list-icon.vue'

const defaultGridConfig = {
  columnSelector: [5, 3, 1],
  listMode: false,
}

const getControlMock = vi.hoisted<Mock<(key: string) => any>>(() =>
  vi.fn((key: string) => {
    if (key === 'gridConfig') {
      return { ...defaultGridConfig }
    }
    return undefined
  }),
)
vi.mock('../composables/use-experience-controls.composable', () => ({
  useExperienceControls: vi.fn(() => ({
    getControl: getControlMock,
  })),
}))

const isMobileStub = ref(false)
vi.mock('../composables/use-device.composable', () => ({
  useDevice: vi.fn(() => ({
    isMobile: isMobileStub,
  })),
}))

function render() {
  const wrapper = shallowMount(ColumnPicker, {
    global: {
      stubs: {
        BaseColumnPickerList: {
          template: `<div><slot name="divider"/>
                        <slot v-for="column in columns" :column="column"/></div>`,
          props: ['columns'],
        },
      },
    },
  })

  return {
    wrapper,
    message: wrapper.find('[data-test="column-picker-message"]'),
    baseColumnPickerList: wrapper.findComponent(BaseColumnPickerList),
    grid1ColIcon: wrapper.findComponent(Grid1ColIcon),
    grid2ColIcon: wrapper.findComponent(Grid2ColIcon),
    grid4ColIcon: wrapper.findComponent(Grid4ColIcon),
    gridListIcon: wrapper.findComponent(GridListIcon),
  }
}

describe('columnPicker component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
    isMobileStub.value = false
  })

  it('should render correctly by default (desktop)', () => {
    const sut = render()

    expect(sut.message.text()).toBe('columnPicker.message')
    expect(sut.baseColumnPickerList.props('columns')).toStrictEqual([5, 3, 1])
    expect(sut.grid1ColIcon.exists()).toBeTruthy()
    expect(sut.grid2ColIcon.exists()).toBeTruthy()
    expect(sut.grid4ColIcon.exists()).toBeTruthy()
    expect(sut.gridListIcon.exists()).toBeFalsy()
  })

  it('should render correctly in mobile', () => {
    isMobileStub.value = true
    const sut = render()

    expect(sut.baseColumnPickerList.props('columns')).toStrictEqual([2, 1])
    expect(sut.grid1ColIcon.exists()).toBeTruthy()
    expect(sut.grid2ColIcon.exists()).toBeTruthy()
    expect(sut.grid4ColIcon.exists()).toBeFalsy()
    expect(sut.gridListIcon.exists()).toBeFalsy()
  })

  it('should render list mode correctly in desktop', () => {
    getControlMock.mockImplementation((key: string) => {
      if (key === 'gridConfig') {
        return { columnSelector: [5, 3], listMode: true }
      }
      return undefined
    })
    const sut = render()

    expect(sut.baseColumnPickerList.props('columns')).toStrictEqual([5, 3, 1])
    expect(sut.grid1ColIcon.exists()).toBeFalsy()
    expect(sut.grid2ColIcon.exists()).toBeTruthy()
    expect(sut.grid4ColIcon.exists()).toBeTruthy()
    expect(sut.gridListIcon.exists()).toBeTruthy()
  })

  it('should not render list mode in mobile', () => {
    isMobileStub.value = true
    getControlMock.mockImplementation((key: string) => {
      if (key === 'gridConfig') {
        return { columnSelector: [5, 3, 1], listMode: true }
      }
      return undefined
    })
    const sut = render()

    expect(sut.baseColumnPickerList.props('columns')).toStrictEqual([2, 1])
    expect(sut.grid1ColIcon.exists()).toBeTruthy()
    expect(sut.grid2ColIcon.exists()).toBeTruthy()
    expect(sut.grid4ColIcon.exists()).toBeFalsy()
    expect(sut.gridListIcon.exists()).toBeFalsy()
  })
})
