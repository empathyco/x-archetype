Feature: Spellcheck component

  Scenario Outline: 1. Spellcheck component exists and contains the query
    Given start page
    When  start button is clicked
    And   a "<query>" is typed
    Then  spellcheck message is displayed
    Examples:
      | query  |
      | sirt   |
