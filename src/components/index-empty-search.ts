import CustomMainModal from './custom-main-modal.vue'
import CustomTeleport from './teleport/custom-teleport.vue'

/**
 * These are the components that trigger the empty search chunk.
 * They should be imported with defineAsyncComponent to avoid loading
 * the empty search chunk until one of them is needed.
 * Other components are just child components of this one and should be imported directly.
 */
export { CustomMainModal, CustomTeleport }
