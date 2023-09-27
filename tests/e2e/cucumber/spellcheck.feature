Feature: Spellcheck component

  Scenario Outline: 1. Spellcheck component exists and contains the query
    Given start page with "<view>" size view
    When  search bar is clicked
    And   "<query>" is searched
    Then  spellcheck message is displayed
    Examples:
      | query  | view        |
      | ssirt   | macbook-13  |
      | ssirt   | iphone-x    |
