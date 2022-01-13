/**
 * Creates a {@link @empathyco/x-types#Banner | banners} stub.
 *
 * @returns Array of banners stub.
 *
 * @internal
 */
export function getBannersStub(): PlatformBanner[] {
  return [createBannerStub('1'), createBannerStub('2')];
}

/**
 * Creates a banner with a "unique" identifier.
 *
 * @param identifier - The banner identifier.
 *
 * @returns The banner.
 *
 * @internal
 */
export function createBannerStub(identifier: string): PlatformBanner {
  return {
    image_url: `https://picsum.photos/seed/${identifier}/100/100`,
    id: identifier,
    title: identifier,
    url: `#${identifier}`
  };
}

export interface PlatformBanner {
  image_url: string;
  id: string;
  title: string;
  url: string;
}
