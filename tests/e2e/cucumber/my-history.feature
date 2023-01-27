Feature: My History component

  Scenario Outline: 1. Click on a history query closes the modal and searches that query
    Given start page with "<view>" size view
    When  search bar is clicked
    And   a "<list>" of queries already searched
    And   search input is cleared
    Then  my history button is clicked
    And   my history queries are displayed
    And   my history query number 1 delete button is clicked
    And   my history is visible
    When  my history query number 0 is clicked
    Then  my history is not visible
    And   related results are displayed


    Examples:
      | view       | list           |
      | macbook-13 | tshirt, jacket |