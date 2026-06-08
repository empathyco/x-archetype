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

const gridConfigStub = {
  columnSelector: ['5', '3', '1'],
  listMode: false,
}
const getControlFromPathMock = vi.hoisted(() => vi.fn(() => ref(gridConfigStub)))
vi.mock('../composables/use-experience-controls.composable', () => ({
  useExperienceControls: vi.fn(() => ({
    getControlFromPath: getControlFromPathMock,
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
          setup() {
            return { columns: isMobileStub.value ? ['2', '1'] : gridConfigStub.columnSelector }
          },
        },
      },
    },
  })

  return {
    wrapper,
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

    expect(sut.baseColumnPickerList.props('columns')).toStrictEqual(
      gridConfigStub.columnSelector.map(Number),
    )
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
    getControlFromPathMock.mockReturnValueOnce(ref({ columnSelector: ['5', '3'], listMode: true }))
    const sut = render()

    expect(sut.baseColumnPickerList.props('columns')).toStrictEqual([5, 3, 1])
    expect(sut.grid1ColIcon.exists()).toBeFalsy()
    expect(sut.grid2ColIcon.exists()).toBeTruthy()
    expect(sut.grid4ColIcon.exists()).toBeTruthy()
    expect(sut.gridListIcon.exists()).toBeTruthy()
  })

  it('should not render list mode in mobile', () => {
    isMobileStub.value = true
    getControlFromPathMock.mockReturnValueOnce(ref({ ...gridConfigStub, listMode: true }))
    const sut = render()

    expect(sut.baseColumnPickerList.props('columns')).toStrictEqual([2, 1])
    expect(sut.grid1ColIcon.exists()).toBeTruthy()
    expect(sut.grid2ColIcon.exists()).toBeTruthy()
    expect(sut.grid4ColIcon.exists()).toBeFalsy()
    expect(sut.gridListIcon.exists()).toBeFalsy()
  })
})
