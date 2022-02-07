Feature: Scroll

  Background:
    Given a results API with known results

  Scenario Outline: 1. Scroll position is kept in the URL and reset upon new search requests
    Given start page with "<view>" size view
    When  start button is clicked
    And   "<query>" is searched
    And   scrolling down to result "<resultId>"
    Then  url is updated with result "<resultId>"
    When  facets are shown if hidden on "<view>"
    And   "<sortOrder>" order is clicked
    And   facets are hidden if shown on "<view>"
    Then  scroll position is at top
    When  scrolling down to result "<resultId>"
    Then  url is updated with result "<resultId>"
    And   facets are shown if hidden on "<view>"
    And   facet "<facetName>" is unfolded
    And   filter <filterIndex> from facet "<facetName>" is clicked
    Then  scroll position is at top
    Examples:
      | query | view        | resultId     | sortOrder  | filterIndex | facetName |
      | shirt | macbook-13  | result-16    | price asc  | 1           | price     |
      | shirt | iphone-7    | result-16    | price asc  | 1           | price     |

