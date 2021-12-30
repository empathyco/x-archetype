Feature: Results

  Scenario Outline: 1. Predictive components are displayed as expected
    Given start page
    Then  start button is clicked
    When  "<query>" is searched
    Then  related results are displayed and contain expected elements
    Examples:
      | query |
      | shirt |
