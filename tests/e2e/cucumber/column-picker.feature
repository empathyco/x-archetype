Feature: Column picker component

  Scenario Outline: 1. Column picker component allows to select number of rows in the grid
    Given start page with "<view>" size view
    And   a results API with known results
    When  search bar is clicked
    And   "<query>" is searched
    Then  grid shows 4 results per row
    When  value <columns> from column picker list is clicked
    Then related results are displayed
    Then  column picker list value <columns> is selected
    And   grid shows <columns> results per row
    Examples:
      | query   | columns | view        |
      | shirt   | 2       | macbook-13  |
