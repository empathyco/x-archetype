import { Dictionary } from '@empathyco/x-components';

/**
 * Iterates over every non-undefined property of the object calling the callback passed as
 * parameter.
 *
 * @param obj - The object to iterate through each property.
 * @param callbackFn - The callback function to call for each property.
 * @public
 */
export function forEach<T extends Dictionary>(
  obj: T | undefined | null,
  callbackFn: (key: keyof T, value: Exclude<T[keyof T], undefined>, index: number) => void
): void {
  if (obj == null) {
    return;
  }

  let index = 0;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined) {
      callbackFn(key, obj[key], index++);
    }
  }
}
