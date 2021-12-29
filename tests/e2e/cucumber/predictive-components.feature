Feature: Predictive components

  Scenario Outline: 1. Predictive components are displayed as expected
    Given start page
    Then  start button is clicked
    And   recommendations are displayed
    And   search input is focused
    And   popular searches are displayed
    When  a "<query>" is typed
    Then  query suggestions are displayed
    When  focus is set on the search input
    Then  next queries are displayed
    When  search input is cleared
    Then  history queries are displayed
    Examples:
      | query |
      | shirt |
