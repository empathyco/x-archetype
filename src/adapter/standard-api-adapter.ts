import {
  FacetsConfig,
  facetsConfig,
  numberFilterSchema,
  platformAdapter,
  resultSchema
} from '@empathyco/x-adapter-platform';
import { Result } from '@empathyco/x-types';

export const adapter = platformAdapter;

/* Code sample about how to extend the result mapper with more fields. */

interface EmpathyDemoPlatformResult {
  __id: string;
  __name: string;
  __images: string[];
  __url: string;
  __externalId: string;
  __prices: {
    current: {
      value: number;
    };
    previous?: {
      value: number;
    };
  };
  tagging: {
    add2cart: string;
    checkout: string;
    click: string;
  };
}

declare module '@empathyco/x-types' {
  export interface Result {}
}

resultSchema.$override<EmpathyDemoPlatformResult, Partial<Result>>({
  id: '__id',
  name: '__name',
  images: '__images',
  url: '__url',
  identifier: {
    value: '__externalId'
  },
  price: {
    value: '__prices.current.value',
    originalValue: ({ __prices: rawPrices }) =>
      rawPrices.previous?.value ?? rawPrices.current.value,
    hasDiscount: ({ __prices: rawPrices }) =>
      rawPrices.current.value < (rawPrices.previous?.value ?? rawPrices.current.value)
  }
});

Object.assign<FacetsConfig, FacetsConfig>(facetsConfig, {
  // TODO: Rename to currentPrice
  '__prices.current.value': {
    modelName: 'NumberRangeFacet',
    schema: numberFilterSchema
  },
  // TODO: Rename to previousPrice
  '__prices.original.value': {
    modelName: 'NumberRangeFacet',
    schema: numberFilterSchema
  }
});
