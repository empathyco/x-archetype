Feature: No-results component

  Scenario Outline: 1. No results message exists and contains the query
    Given start page
    Then  start button is clicked
    When  a "<query>" is typed
    Then  no results message is displayed
    And   there are no results
    Examples:
      | query    |
      | asdfgh   |
