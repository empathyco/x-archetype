import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import CartCount from './cart-count.vue'

function render(cart: Record<string, number> = { '1': 2, '2': 3 }) {
  const snippetConfig = { cart }
  const wrapper = mount(CartCount, {
    global: {
      provide: {
        snippetConfig,
      },
      stubs: {
        BaseEventButton: {
          template: '<button><slot /></button>',
          props: ['events'],
        },
      },
    },
  })

  return {
    wrapper,
    counter: wrapper.find('[data-test="cart-count"]'),
  }
}

describe('cartCount component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  it('should render correctly with products in cart', () => {
    const sut = render({ 'product-1': 2, 'product-2': 3 })

    expect(sut.wrapper.exists()).toBeTruthy()
    expect(sut.counter.exists()).toBeTruthy()
    expect(sut.counter.text()).toBe('5')
  })

  it('should render correctly with one product in cart', () => {
    const sut = render({ 'product-1': 1 })

    expect(sut.counter.text()).toBe('1')
  })

  it('should not render counter when cart is empty', () => {
    const sut = render({})

    expect(sut.counter.exists()).toBeFalsy()
  })

  it('should handle null snippetConfig gracefully', () => {
    const snippetConfig = {}
    const wrapper = mount(CartCount, {
      global: {
        provide: {
          snippetConfig,
        },
        stubs: {
          BaseEventButton: {
            template: '<button><slot /></button>',
            props: ['events'],
          },
        },
      },
    })

    const counter = wrapper.find('[data-test="cart-count"]')
    expect(counter.exists()).toBeFalsy()
  })
})
