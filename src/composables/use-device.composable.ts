import { createUseDevice } from '@empathyco/x-components'

export const breakpoints = {
  mobile: 0,
  tablet: 744,
  desktop: 1280,
  large: 2560,
}

export const useDevice = createUseDevice(breakpoints)
