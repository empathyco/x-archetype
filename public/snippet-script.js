function getAllURLParameters() {
  const parameterRegex = /[?&]+([^=&;$]+)=([^&#;$]*)/gi
  const parameters = {}

  while ((regexMatch = parameterRegex.exec(window.location.href)) !== null) {
    parameters[regexMatch[1]] = decodeParameterValue(regexMatch[2])
  }

  return parameters
}

function decodeParameterValue(parameterValue) {
  return decodeURIComponent(parameterValue.replace(/\+/g, '%20')) || null
}

function popURLParameter(parametersDictionary, parameterKey) {
  const parameterValue = parametersDictionary[parameterKey]

  if (parameterValue) {
    delete parametersDictionary[parameterKey]
    return parameterValue
  }
}

/**
 * Callback function to handle adding a result item to the cart:
 * Adds the item to the cart with the specified number of inputUnits,
 * or increments the existing quantity by the result's sellPackUnit.
 *
 * @param {object} result - The result item to be added to the cart.
 * @param {number} [metadata.inputValue] - The number of units to update the cart with.
 */
function addToCartCallback(result, metadata) {
  cart[result.id] = metadata.inputValue || (cart[result.id] ? cart[result.id] + 1 : 1)

  InterfaceX.setSnippetConfig({
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
function removeFromCartCallback(result, metadata) {
  if (metadata.inputValue === 0) {
    delete cart[result.id]
  } else {
    cart[result.id] = metadata.inputValue || (cart[result.id] ? cart[result.id] - 1 : 0)
  }
  InterfaceX.setSnippetConfig({
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
function wishlistCallback(result) {
  const index = wishlist.findIndex(i => i === result.id)
  if (index > -1) {
    wishlist.splice(index, 1)
  } else {
    wishlist.push(result.id)
  }
  InterfaceX.setSnippetConfig({
    wishlist: [...wishlist],
  })
}

const URLParameters = getAllURLParameters()
const popFromURLParameters = popURLParameter.bind(this, URLParameters)

function getEnv() {
  const env = popFromURLParameters('env')
  const envsDict = {
    live: '',
    staging: 'staging',
    test: 'test',
  }

  if (env) {
    return envsDict[env]
  }

  if (!!document.location.host.match(/localhost|\.test\.|\.staging\./)) {
    return 'staging'
  }

  return undefined
}

function getIsolationStrategy() {
  const isolation = popFromURLParameters('isolation')

  return isolation === undefined ? undefined : isolation === 'true'
}

const instance = popFromURLParameters('instance') || 'vtex'
const env = getEnv()
const scope = popFromURLParameters('scope') || 'desktop'
const lang = popFromURLParameters('lang') || 'es'
const device = popFromURLParameters('device') || undefined
const uiLang = popFromURLParameters('uiLang') || lang
const currency = popFromURLParameters('currency') || 'EUR'
const consent = popFromURLParameters('consent') !== 'false'
const documentDirection = popFromURLParameters('doc-dir') || 'ltr'
const store = popFromURLParameters('store') || undefined
const viewMode = popFromURLParameters('viewMode') || 'embedded'
const isolate = getIsolationStrategy()
var cart = {}
var wishlist = []
popFromURLParameters('query') // prevent the query from be included as extra param
popFromURLParameters('filter') // Prevent the filters to be included as extra param

window.__enableVueDevtools__ = true
window.initX = {
  instance,
  env,
  scope,
  lang,
  device,
  uiLang,
  currency,
  consent,
  documentDirection,
  store,
  viewMode,
  isolate,
  ...URLParameters,
  callbacks: {
    UserClickedResultAddToCart: addToCartCallback,
    UserClickedResultRemoveFromCart: removeFromCartCallback,
    UserClickedResultWishlist: wishlistCallback,
    UserClickedResultVariantAddToCart: addToCartCallback,
    UserClickedResultVariantRemoveFromCart: removeFromCartCallback,
  },
  queriesPreview: [
    {
      query: 'dress',
      title: 'Autumn dresses by Marni',
      filters: ['brand:marni', 'categoryIds:12fad53d7'],
    },
    {
      query: 'belted legging',
      filters: ['categoryIds:1b5f82125'],
      title: 'Belted leggings',
    },
    {
      query: 'bags',
      extraParams: {
        sort: 'price desc',
      },
      title: 'Exclusive bags',
    },
    {
      query: 'sunglasses',
      title: 'Sunshine ready',
    },
    {
      query: 'woven hat',
      title: 'Elegant Sunshield',
    },
  ],
}

window.addEventListener('load', () => {
  window.wysiwyg?.setConfig({
    auth: {
      baseUrl: 'https://iam.empathy.co',
      clientId: 'wysiwyg',
    },
    analytics: {
      baseUrl: 'https://api.staging.empathy.co/statistics/v2',
    },
    conversational: {
      baseUrl: 'https://gplay-rag.internal.test.empathy.co',
    },
    search: {
      baseUrl: 'https://api.staging.empathy.co/search/v1',
    },
    chatBot: {
      baseUrl: 'https://mcp-client-assistant.prod.empathy.co',
    },
    instance,
    lang,
    audience: 'enterprise',
    playboardUrl: `https://playboard-platform.staging.empathy.co/${instance}`,
    appContainerSelector: '.x-root-container',
    searchLayerSelector: '.x',
  })
})
