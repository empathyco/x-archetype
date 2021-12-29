Feature: Banner component

  Scenario Outline: 1. Banner exists and has an image
    Given start page
    Then  start button is clicked
    When  a "<query>" is typed
    Then  banner is displayed
    Examples:
      | query |
      | shirt |
