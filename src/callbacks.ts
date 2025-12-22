import type { Result } from '@empathyco/x-types'

/**
 * Callback function to handle adding a result item to the cart:
 * Adds the item to the cart with the specified number of inputUnits,
 * or increments the existing quantity by the result's sellPackUnit.
 *
 * @param {object} result - The result item to be added to the cart.
 * @param {number} [metadata.inputValue] - The number of units to update the cart with.
 */
export function addToCartCallback(result: Result, metadata: { inputValue?: number }) {
  const cart = window.InterfaceX?.getSnippetConfig().cart ?? {}
  cart[result.id] = metadata.inputValue || (cart[result.id] ? cart[result.id] + 1 : 1)

  window.InterfaceX?.setSnippetConfig({
    cart: {
      ...cart,
    },
  })
}

/**
 * Callback function to handle removing a result item from the cart:
 * Removes the item from the cart, leaving it with the specified number of inputUnits,
 * or decrements the existing quantity by the result's sellPackUnit.
 *
 * @param {object} result - The result item to be removed from the cart.
 * @param {number} [metadata.inputValue] - The number of units to update the cart with.
 */
export function removeFromCartCallback(result: Result, metadata: { inputValue?: number }) {
  const cart = window.InterfaceX?.getSnippetConfig().cart ?? {}

  if (metadata.inputValue === 0) {
    delete cart[result.id]
  } else {
    cart[result.id] = metadata.inputValue || (cart[result.id] ? cart[result.id] - 1 : 0)
  }
  window.InterfaceX?.setSnippetConfig({
    cart: {
      ...cart,
    },
  })
}

/**
 * Callback function to handle adding or removing a result item from the wishlist:
 * Adds or removes the item id from the wishlist array.
 *
 * @param {object} result - The result item to be added or removed from the wishlist.
 */
export function wishlistCallback(result: Result) {
  const wishlist = window.InterfaceX?.getSnippetConfig().wishlist ?? []

  const index = wishlist.findIndex(i => i === result.id)
  if (index > -1) {
    wishlist.splice(index, 1)
  } else {
    wishlist.push(result.id)
  }
  window.InterfaceX?.setSnippetConfig({
    // eslint-disable-next-line ts/no-unsafe-assignment
    wishlist: [...wishlist],
  })
}
