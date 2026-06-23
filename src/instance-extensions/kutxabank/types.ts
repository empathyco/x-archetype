import type { PlatformResult } from '@empathyco/x-adapter-platform'
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

export interface KutxabankPlatformResult extends PlatformResult {
  latitud: string
  longitud: string
  textoFormat: string
  direccion: string
  codPostal: string
  provincia: string
  telefono: string
  lugar: string
  fecha: {
    startDate: string[]
    endDate: string[]
  }
  store: string
  storeName: string
  tipo: string
}
