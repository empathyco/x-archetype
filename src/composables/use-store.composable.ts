import { getCurrentInstance } from 'vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RootXStoreState, StatusState, XModuleName, XModulesTree } from '@empathyco/x-components';

/**
 * Provides access to the global store object or to the specific store module if it's provided.
 *
 * @param storeModule - The {@link XModuleName}.
 * @returns A state object.
 */
export function useStore(storeModule?: keyof XModulesTree): RootXStoreState | StatusState {
  return storeModule
    ? getCurrentInstance()!.proxy.$root.$store.state.x[storeModule]
    : getCurrentInstance()!.proxy.$root.$store.state.x;
}
