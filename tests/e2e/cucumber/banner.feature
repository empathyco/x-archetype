Feature: Banner component

  Scenario Outline: 1. Banner exists and has an image
    Given start page
    And   a results API with a banner
    Then  start button is clicked
    When  a "<query>" is typed
    Then  banner is displayed
    Examples:
      | query |
      | shirt |
