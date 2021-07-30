import { EmpathyPromoted } from '@empathyco/x-adapter';
import { Promoted } from '@empathyco/x-types';

interface CustomPromoted {
  /** Image of the promoted. */
  image_url: string;
}

declare module '@empathyco/x-adapter' {
  interface EmpathyPromoted extends CustomPromoted {}
}
/**
 * This mapper adapts the response from the api to X Components.
 *
 * @param rawPromoted - This is the raw response form the API.
 * @param promoted - This is the Empathy promoted handle by the app.
 *
 * @returns A new object which can be handled by XComponents.
 */
export function promotedMapper(rawPromoted: EmpathyPromoted, promoted: Promoted): Promoted {
  return Object.assign<Promoted, Partial<Promoted>>(promoted, {
    image: rawPromoted.image_url
  });
}
