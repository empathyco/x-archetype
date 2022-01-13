/**
 * Creates a PlatformPromoted stub.
 *
 * @returns Array of Promoted stub.
 *
 * @internal
 */
export function getPromotedsStub(): PlatformPromoted[] {
  return [createPromotedStub('1'), createPromotedStub('2')];
}

/**
 * Creates a promoted with a "unique" identifier.
 *
 * @param identifier - The promoted identifier.
 *
 * @returns The promoted.
 *
 * @internal
 */
export function createPromotedStub(identifier: string): PlatformPromoted {
  return {
    image_url: `https://picsum.photos/seed/${identifier}/100/100`,
    id: identifier,
    title: identifier,
    url: `#${identifier}`
  };
}

export interface PlatformPromoted {
  image_url: string;
  id: string;
  title: string;
  url: string;
}
