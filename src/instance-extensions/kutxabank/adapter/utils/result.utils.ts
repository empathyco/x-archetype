import type { KutxabankPlatformResult } from '../adapter'

/**
 * Joins some result's response properties related to a location.
 *
 * @param rawResult - The result to map the address from.
 * @returns A string with the full address containing street, postal code and province.
 */
export function mapAdress(rawResult: KutxabankPlatformResult): string {
  return `${rawResult.direccion}, ${rawResult.codPostal}, ${rawResult.provincia}`
}

/**
 * Parse the coordenate to use "." instead of ",".
 *
 * @param coordenate - The coordenate to parse.
 * @returns A string with the parsed coordenate.
 */
function parseCoordenate(coordenate: string): string {
  return coordenate.replace(',', '.')
}

/**
 * Maps the result url to be used either linking to an inner page or to a Google's maps url.
 * The "direction" is a unique field that belongs to an office card type,
 * so it's used to distinguish between internal/external links.
 *
 * @param rawResult - The result to map the url from.
 * @returns A string with the product's url.
 */
export function mapUrl(rawResult: KutxabankPlatformResult): string {
  const gMapsUrl = 'https://www.google.com/maps/search/?api=1&query='
  return rawResult.direccion !== ''
    ? `${gMapsUrl}${parseCoordenate(rawResult.latitud)},${parseCoordenate(rawResult.longitud)}`
    : rawResult.__url
}

/**
 * Maps the date fields from the raw result to a structured object.
 *
 * @param rawResult - The raw result to map the date from.
 * @returns An array of objects, each containing the start and end dates as strings.
 * Each object in the array corresponds to a date range from the raw result.
 * If the dates are not present in the raw result, it returns an empty array.
 */
export function mapDate(
  rawResult: KutxabankPlatformResult,
): { startDate?: string; endDate?: string }[] {
  const startDate = rawResult.fecha.startDate ?? []
  const endDate = rawResult.fecha.endDate ?? []

  return startDate.map((date, index) => {
    const dateObject: { startDate: string; endDate?: string } = { startDate: date }
    if (endDate[index] && endDate[index] !== '') {
      dateObject.endDate = endDate[index]
    }
    return dateObject
  })
}
