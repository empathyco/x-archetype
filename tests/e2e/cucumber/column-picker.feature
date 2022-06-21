Feature: Column picker component

  Scenario Outline: 1. Column picker component allows to select number of rows in the grid
    Given start page with "<view>" size view
    When  start button is clicked
    And   "<query>" is searched
    Then  grid shows 4 results per row
    When  value <columns> from column picker list is clicked
    Then  column picker list value <columns> is selected
    And   grid shows <columns> results per row
    Examples:
      | query   | columns | view        |
      | shirt   | 6       | macbook-13  |
