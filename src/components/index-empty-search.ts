import CustomMainModal from './custom-main-modal.vue'
import DesktopTeleport from './desktop/desktop-teleport.vue'
import MobileTeleport from './mobile/mobile-teleport.vue'
import PredictiveLayer from './predictive-layer/predictive-layer.vue'

/**
 * These are the components that trigger the empty search chunk.
 * They should be imported with defineAsyncComponent to avoid loading
 * the empty search chunk until one of them is needed.
 * Other components are just child components of this one and should be imported directly.
 */
export { CustomMainModal, DesktopTeleport, MobileTeleport, PredictiveLayer }
