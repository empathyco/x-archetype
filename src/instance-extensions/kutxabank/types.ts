import type { Result } from '@empathyco/x-types'

export interface KutxabankResult extends Result {
  text: string
  address: string
  phoneNumber: string
  place: string
  date: Record<string, string>[]
  store: string
  storeName: string
  officeType: string
}
