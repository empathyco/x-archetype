import type { QueryPreviewInfo } from '@empathyco/x-components/queries-preview'

export interface InitialQueryPreview {
  lang: string
  initialQueryPreviewsByLang: QueryPreviewInfo[]
}

type TransformedQueryPreviews = Record<string, QueryPreviewInfo[]>

export function transformInitialQueryPreviews(
  initialQueryPreviews: InitialQueryPreview[],
): TransformedQueryPreviews {
  return initialQueryPreviews.reduce<TransformedQueryPreviews>((acc, item) => {
    acc[item.lang] = item.initialQueryPreviewsByLang
    return acc
  }, {})
}
