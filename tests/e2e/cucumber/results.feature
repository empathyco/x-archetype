Feature: Results

  Scenario Outline: 1. Results are displayed and contain their expected elements
    Given start page with "<view>" size view
    Then  search bar is clicked
    When  "<query>" is searched
    Then  related results are displayed and contain expected elements
    Examples:
      | query | view        |
      | shirt | macbook-13  |
      | shirt | iphone-x    |
