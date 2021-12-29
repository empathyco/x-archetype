Feature: Spellcheck component

  Scenario Outline: 1. Spellcheck component exists and contains the query
    Given start page
    Then  start button is clicked
    When  a "<query>" is typed
    Then  spellcheck message is displayed
    Examples:
      | query  |
      | sirt   |
