import { EmpathyBanner } from '@empathyco/x-adapter';
import { Banner } from '@empathyco/x-types';

interface CustomBanner {
  /** Image of the banner. */
  image_url: string;
}

declare module '@empathyco/x-adapter' {
  interface EmpathyBanner extends CustomBanner {}
}
/**
 * This mapper adapts the response from the api to X Components.
 *
 * @param rawBanner - This is the raw response form the API.
 * @param banner - This is the Empathy banner handle by the app.
 *
 * @returns A new object which can be handled by XComponents.
 */
export function bannerMapper(rawBanner: EmpathyBanner, banner: Banner): Banner {
  return Object.assign<Banner, Partial<Banner>>(banner, {
    image: rawBanner.image_url
  });
}
