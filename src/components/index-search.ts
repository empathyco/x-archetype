import DesktopAside from './desktop/desktop-aside.vue'
import DesktopSubHeader from './desktop/desktop-sub-header.vue'
import Main from './main.vue'
import MobileAside from './mobile/mobile-aside.vue'
import MobileOpenAside from './mobile/mobile-open-aside.vue'
import MobileSubHeader from './mobile/mobile-sub-header.vue'
import PredictiveNextQueries from './predictive-layer/predictive-next-queries.vue'
import FallbackDisclaimerMessage from './search/fallback-disclaimer-message.vue'
import NoResultsMessage from './search/no-results-message.vue'
import SpellcheckMessage from './search/spellcheck-message.vue'

/**
 * These are the search components that trigger the search chunk.
 * They should be imported with defineAsyncComponent to avoid loading
 * the search chunk until one of them is needed.
 * Other search components are just child components of this one, and should be imported directly.
 */
export {
  DesktopAside,
  DesktopSubHeader,
  FallbackDisclaimerMessage,
  Main,
  MobileAside,
  MobileOpenAside,
  MobileSubHeader,
  NoResultsMessage,
  PredictiveNextQueries,
  SpellcheckMessage,
}
