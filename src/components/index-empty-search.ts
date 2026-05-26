// import { ExperienceControls } from '@empathyco/x-components/experience-controls'
import CustomMainModal from './custom-main-modal.vue'
import MyHistoryAside from './my-history/my-history-aside.vue'
import MyHistoryConfirmDisableModal from './my-history/my-history-confirm-disable-modal.vue'
import PreSearchManager from './pre-search/pre-search-manager.vue'
import PredictiveLayer from './predictive-layer/predictive-layer.vue'

/**
 * These are the components that trigger the empty search chunk.
 * They should be imported with defineAsyncComponent to avoid loading
 * the empty search chunk until one of them is needed.
 * Other components are just child components of this one and should be imported directly.
 */
export {
  CustomMainModal,
  // ExperienceControls,
  MyHistoryAside,
  MyHistoryConfirmDisableModal,
  PredictiveLayer,
  PreSearchManager,
}
