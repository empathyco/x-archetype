import { namespacedWireCommit } from '@empathyco/x-components';

const moduleName = 'semanticQueries';

const wireCommit = namespacedWireCommit(moduleName);

export const mergeSemanticQueriesConfigWire = wireCommit('mergeConfig');
