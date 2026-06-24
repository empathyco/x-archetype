import type { UiConfig } from '../../types'

export const ui: UiConfig = {
  header: {
    root: 'xds:bg-lead!',
    content: 'xds:desktop:pb-24',
    logo: 'xds:hidden',
    cartCount: 'xds:hidden',
    closeModal:
      'xds:text-neutral-0! xds:desktop:bg-warning xds:desktop:hover:bg-warning-75 xds:desktop:text-neutral-0 xds:desktop:hover:text-neutral-0',
  },
  searchBox: {
    icon: 'xds:ml-16!',
  },
  subHeader: {
    relatedTagsContainer: 'xds:block!',
    relatedTags: 'xds:py-8! xds:pl-0!',
  },
  aside: {
    header: 'xds:bg-warning xds:text-neutral-0',
    title: 'xds:text-neutral-0',
    closeModal:
      'xds:bg-warning xds:hover:bg-warning-75 xds:text-neutral-0 xds:hover:text-neutral-0',
  },
  scrollToTop: {
    root: 'xds:bg-warning xds:hover:bg-warning-75 xds:text-neutral-0 xds:hover:text-neutral-0 xds:border-warning',
  },
  toolbar: {
    badge: 'xds:bg-warning xds:text-neutral-0',
  },
}
