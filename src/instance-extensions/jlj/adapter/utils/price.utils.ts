import type { ResultPrice } from '@empathyco/x-types'
import type { JLJPlatformResult } from '../../types'

/**
 * Maps the price.
 *
 * @param rawResult - The result to map the price from.
 * @returns The mapped price.
 */
export function mapPrice(rawResult: JLJPlatformResult): ResultPrice {
  const value: number = rawResult.__prices?.current?.value ?? rawResult.price
  const originalValue: number = rawResult.__prices?.previous?.value ?? rawResult.price

  return {
    value,
    originalValue,
    hasDiscount: value < originalValue,
  }
}
