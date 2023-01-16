Feature: Promoted component

  Scenario Outline: 1. Promoted exists and has an image
    Given start page with "<view>" size view
    And   a results API with a promoted
    When  search bar is clicked
    And   "<query>" is searched
    Then  promoted is displayed
    Examples:
      | query  | view        |
      | sandal | macbook-13  |
      | sandal | iphone-x    |
