// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  RootXStoreState,
  StatusState,
  XModulesTree,
  useStore as useXStore
} from '@empathyco/x-components';

/**
 * Provides access to the global store object or to the specific store module if it's provided.
 *
 * @param storeModule - The store module to access.
 * @returns A state object.
 */
export function useStore(storeModule?: keyof XModulesTree): RootXStoreState | StatusState {
  const store = useXStore();
  return storeModule ? store.state.x[storeModule] : store.state.x;
}
