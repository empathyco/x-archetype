Feature: Banner component

  Scenario Outline: 1. Banner exists and has an image
    Given start page with "<view>" size view
    And   a results API with a banner
    When  search bar is clicked
    And   "<query>" is searched
    Then  banner is displayed
    Examples:
      | query | view        |
      | shirt | macbook-13  |
      | shirt | iphone-x    |
