/**
 * Checks if the user is on an iOS device (iPhone, iPad, or iPod).
 * @returns {boolean} `true` if the user is on iOS, `false` otherwise.
 */

export const isIOS = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(userAgent) && !/windows phone/.test(userAgent)
}
