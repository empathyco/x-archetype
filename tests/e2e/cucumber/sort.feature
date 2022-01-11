Feature: Sort component

  Scenario Outline: 1. Sorting orders the results
    Given start page with "<view>" size view
    Then  start button is clicked
    When  "<query>" is searched
    And   facets are shown if hidden on "<view>"
    Then  results are ordered by "Default"
    Given an intercepted search response
    When  "<sortOrder>" order is clicked
    Then  results are ordered by "<sortOrder>"
    And   search request contains the selected sort "<sortOrder>"

    Examples:
      | query   | sortOrder  | view        |
      | skirt   | price asc  | macbook-13  |
      | skirt   | price desc | iphone-7    |
