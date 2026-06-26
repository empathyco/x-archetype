import type { QueryPreviewInfo } from '@empathyco/x-components/queries-preview'
import type { InitialQueryPreview } from './initial-query-previews'
import { describe, expect, it } from 'vitest'
import { transformInitialQueryPreviews } from './initial-query-previews'

describe('transformInitialQueryPreviews', () => {
  it('transforms an array into an object keyed by language', () => {
    const enPreviews = [{ query: 'iphone' }, { query: 'ipad' }] as QueryPreviewInfo[]

    const esPreviews = [{ query: 'móvil' }] as QueryPreviewInfo[]

    const input: InitialQueryPreview[] = [
      {
        lang: 'en',
        initialQueryPreviewsByLang: enPreviews,
      },
      {
        lang: 'es',
        initialQueryPreviewsByLang: esPreviews,
      },
    ]

    expect(transformInitialQueryPreviews(input)).toEqual({
      en: enPreviews,
      es: esPreviews,
    })
  })

  it('returns an empty object when the input is empty', () => {
    expect(transformInitialQueryPreviews([])).toEqual({})
  })

  it('overwrites previous values when the same language appears multiple times', () => {
    const first = [{ query: 'iphone' }] as QueryPreviewInfo[]
    const second = [{ query: 'ipad' }] as QueryPreviewInfo[]

    const input: InitialQueryPreview[] = [
      {
        lang: 'en',
        initialQueryPreviewsByLang: first,
      },
      {
        lang: 'en',
        initialQueryPreviewsByLang: second,
      },
    ]

    expect(transformInitialQueryPreviews(input)).toEqual({
      en: second,
    })
  })
})
