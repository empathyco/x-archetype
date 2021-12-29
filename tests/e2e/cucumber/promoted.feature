Feature: Promoted component

  Scenario Outline: 1. Promoted exists and has an image
    Given start page
    Then  start button is clicked
    When  a "<query>" is typed
    Then  promoted is displayed
    Examples:
      | query  |
      | sandal |
