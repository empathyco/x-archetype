export interface XControlsState {
  controls: {
    aiSearchFallback: boolean
    fullPredictiveLayer: boolean
    facetsPanelOverlay: boolean
    logo: string
    gridConfig: {
      columnPicker: boolean
      listMode: boolean
      columnSelector: string[]
    }
    colors: {
      lead: string
      auxiliary: string
      font: string
    }
    styles: {
      [key: string]: string
    }
  }
}

export const xControlsState: XControlsState = {
  controls: {
    aiSearchFallback: true,
    fullPredictiveLayer: false,
    facetsPanelOverlay: true,
    logo: 'https://empathy.co/assets/media/logo/logo-text-black.svg',
    gridConfig: {
      columnPicker: true,
      listMode: true,
      columnSelector: ['5', '2'],
    },
    colors: {
      lead: '#5e7782',
      auxiliary: '#0086b2',
      font: '#5f717b',
    },
    styles: {
      'font-family-main': 'inherit',
      'font-weight-light': '200',
      'font-weight-regular': '400',
      'font-weight-bold': '700',
    },
  },
}
