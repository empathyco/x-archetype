Feature: Sort component

  Scenario Outline: 1. Sorting orders the results
    Given start page
    Then  start button is clicked
    When  a "<query>" is typed
    Then  results are ordered by "Default"
    Given an intercepted search response
    When  "<sortOrder>" order is clicked
    Then  results are ordered by "<sortOrder>"
    And   search request contains the selected sort "<sortOrder>"

    Examples:
      | query   | sortOrder  |
      | skirt   | price asc  |
      | skirt   | price desc |
