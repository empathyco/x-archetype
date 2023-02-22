Feature: Scroll

  Background:
    Given a results API with known results

  Scenario Outline: 1. Scroll position is kept in the URL and reset upon new search requests
    Given start page with "<view>" size view
    When  search bar is clicked
    And   "<query>" is searched
    Then  related results are displayed
    When  scrolling down to result "<resultId>"
    And   result "<resultId>" is visible
    Then  url is updated with result "<resultId>"
    When  the page is reloaded
    And   result "<resultId>" is visible
    Then  url is updated with result "<resultId>"
    When  scroll to top is clicked
    Then  result "result-0" is visible
    And   scroll position is at top
    When  scrolling down to result "<resultId>"
    And   related tag number 0 is clicked
    Then  scroll position is at top

    Examples:
      | query | view        | resultId     |
      | shirt | macbook-13  | result-12    |
      | shirt | iphone-x    | result-12    |
