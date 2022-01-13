Feature: Banner component

  Scenario Outline: 1. Banner exists and has an image
    Given start page
    And   a results API with a banner
    When  start button is clicked
    And   a "<query>" is typed
    Then  banner is displayed
    Examples:
      | query |
      | shirt |
