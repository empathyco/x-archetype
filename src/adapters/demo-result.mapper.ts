import { EmpathyResult } from '@empathy/search-adapter';
import { Result } from '@empathy/search-types';

type CustomResult = {
  gender: string;
  color: string;
  year: string;
  categoryPaths: string[];
  usage: string;
  groupId: string;
  type: string;
  score: number;
  categoryIds: string[];
  size: string;
  season: string;
  categories: string[];
};

/**
 * This mapper adapts the response from the api to X Components.
 *
 * @param rawResult - This is the raw response form the API.
 * @param result - This is the Empathy result handle by the app.
 *
 * @returns A new object which can be handled by XComponents.
 */
export function resultMapper(
  rawResult: Result & CustomResult,
  result: EmpathyResult & CustomResult
): EmpathyResult {
  return Object.assign(result, {
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
    categoryPaths: rawResult.categoryPaths
  });
}
