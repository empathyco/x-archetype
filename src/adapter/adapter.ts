import { platformAdapter, PlatformResult, resultSchema } from '@empathyco/x-adapter-platform';
import { Result } from '@empathyco/x-types';

export const adapter = platformAdapter;

/* Code sample about how to extend the result mapper with more fields. */

interface EmpathyDemoPlatformResult extends PlatformResult {
  season: string;
}

declare module '@empathyco/x-types' {
  export interface Result {
    season: string;
  }
}

resultSchema.$override<EmpathyDemoPlatformResult, Partial<Result>>({
  season: 'season'
});
