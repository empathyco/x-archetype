import { EmpathyResult } from '@empathyco/x-adapter';
import { Result } from '@empathyco/x-types';

/**
 * Custom platform result which extends the base {@link Result}.
 */
interface CustomResult {
  /** Gender of the result. */
  gender?: string;
  /** Color of the result. */
  color?: string;
  /** Year of the result. */
  year?: string;
  /** List of category paths of the result. */
  categoryPaths?: string[];
  /** Usage of the result. */
  usage?: string;
  /** Group ID of the result. */
  groupId?: string;
  /** Type of the result. */
  type?: string;
  /** Score of the result. */
  score?: number;
  /** List of category ids of the result. */
  categoryIds?: string[];
  /** Size of the result. */
  size?: string;
  /** Season of the result. */
  season: string;
  /** List of categories of the result. */
  categories?: string[];
}

declare module '@empathyco/x-types' {
  interface Result extends CustomResult {}
}

declare module '@empathyco/x-adapter' {
  interface EmpathyResult extends CustomResult {}
}

/**
 * This mapper adapts the response from the api to X Components.
 *
 * @param rawResult - This is the raw response form the API.
 * @param result - This is the Empathy result handle by the app.
 *
 * @returns A new object which can be handled by XComponents.
 */
export function resultMapper(rawResult: EmpathyResult, result: Result): Result {
  return Object.assign<Result, Partial<Result>>(result, {
    gender: rawResult.gender,
    color: rawResult.color,
    year: rawResult.year,
    usage: rawResult.usage,
    groupId: rawResult.groupId,
    type: rawResult.type,
    score: rawResult.score,
    size: rawResult.size,
    season: rawResult.season,
    categories: rawResult.categories,
    categoryIds: rawResult.categoryIds,
    categoryPaths: rawResult.categoryPaths,
    identifier: {
      value: rawResult.id
    }
  });
}
