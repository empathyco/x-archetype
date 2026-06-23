import type { PlatformResult } from '@empathyco/x-adapter-platform'
import type { Result } from '@empathyco/x-types'

export interface FroizResult extends Result {
  isBio: boolean
  isGlutenfree: boolean
  isLactosefree: boolean
  isRefrigerated: boolean
  isEco: boolean
  isFrozen: boolean
  measurementUnit: string
  measurementUnitRatio: number
  offerType?: 'C' | 'I' | '3'
  offerDescription?: string
  offerCode?: string
  offerLink?: string
  fractional?: boolean
  perUnit?: boolean
  perUnitUnit?: string
  perUnitWeight?: number
}

export interface FroizPlatformResult extends PlatformResult {
  isBio: boolean
  isGlutenfree: boolean
  isLactosefree: boolean
  isRefrigerated: boolean
  isEco: boolean
  isFrozen: boolean
  measurementUnit: string
  measurementUnitRatio: number
  offerType?: 'C' | 'I' | '3'
  offerDescription?: string
  offerCode?: string
  fractional?: boolean
  perUnit?: boolean
  perUnitUnit?: string
  perUnitWeight?: number
}
