import type { ComponentMountingOptions } from '@vue/test-utils'
import { CollapseHeight, LocationProvider } from '@empathyco/x-components'
import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import RelatedTags from '../search/related-tags.vue'
import DesktopSubHeader from './desktop-sub-header.vue'
import DesktopToolbar from './desktop-toolbar.vue'

const use$xStub = {
  relatedTags: ['tag1', 'tag2'],
}
const use$xMock = vi.hoisted(() => vi.fn(() => use$xStub))
vi.mock('@empathyco/x-components', async importOriginal => {
  return {
    ...(await importOriginal<typeof import('@empathyco/x-components')>()),
    use$x: use$xMock,
  }
})

const useHasScrollPastThresholdMock = vi.hoisted(() =>
  vi.fn(() => ({ hasScrolledPastThreshold: ref(false) })),
)
vi.mock('../../composables/use-has-scroll-past-threshold.composable', () => ({
  useHasScrollPastThreshold: useHasScrollPastThresholdMock,
}))

function render(options: ComponentMountingOptions<typeof DesktopSubHeader> = {}) {
  const wrapper = shallowMount(DesktopSubHeader, {
    props: {
      isFullPredictive: false,
      ...options.props,
    },
    ...options,
    global: {
      stubs: {
        CollapseHeight: {
          template: '<div><slot /></div>',
        },
        LocationProvider: {
          template: '<div><slot /></div>',
          props: ['location'],
        },
      },
    },
    attachTo: document.body,
  })

  return {
    wrapper,
    collapseHeight: wrapper.findComponent(CollapseHeight),
    desktopSubHeader: wrapper.find('[data-test="desktop-sub-header"]'),
    relatedTagsContainer: wrapper.find('[data-test="desktop-sub-header-related-tags-container"]'),
    locationProvider: wrapper.findComponent(LocationProvider),
    relatedTags: wrapper.findComponent(RelatedTags),
    desktopToolbar: wrapper.findComponent(DesktopToolbar),
  }
}

describe('desktopSubHeader component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  it('should render correctly by default', () => {
    const sut = render()

    expect(sut.collapseHeight.exists()).toBeTruthy()
    expect(sut.desktopSubHeader.isVisible()).toBeTruthy()
    expect(sut.relatedTagsContainer.classes()).toContain('xds:grid')
    expect(sut.locationProvider.props('location')).toBe('predictive_layer')
    expect(sut.relatedTags.exists()).toBeTruthy()
    expect(sut.desktopToolbar.exists()).toBeTruthy()
  })

  it('should hide content when scrolled past threshold', () => {
    useHasScrollPastThresholdMock.mockReturnValue({ hasScrolledPastThreshold: ref(true) })
    const sut = render()

    expect(sut.desktopSubHeader.isVisible()).toBeFalsy()
  })

  it('should not render related tags if there are no related tags', () => {
    use$xMock.mockReturnValue({ relatedTags: [] })
    const sut = render()

    expect(sut.relatedTags.exists()).toBeFalsy()
  })

  it('should not apply grid classes when in full predictive mode', () => {
    const sut = render({ props: { isFullPredictive: true } })

    const html = sut.wrapper.html()
    expect(html).not.toContain('xds:grid')
    expect(html).not.toContain('xds:grid-cols-6')
  })
})
