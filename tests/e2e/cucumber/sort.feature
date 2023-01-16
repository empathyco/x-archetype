Feature: Sort component

  Scenario Outline: 1. Sorting orders the results
    Given start page with "<view>" size view
    Then  search bar is clicked
    When  "<query>" is searched
    Then  related results are displayed
    When  sort and filter button is clicked on "<view>"
    Then  results are ordered by "Relevancy"
    Given an intercepted search response
    And   "<sortOrder>" order is clicked in "<sortMenuName>"
    And   "close-modal-id" is clicked to close the modal
    Then  results are ordered by "<sortOrder>"
    And   search request contains the selected sort "<sortURL>"
    Examples:
      | query   | sortOrder          | sortMenuName | sortURL    | view       |
      | skirt   | Price: High to Low | Sort by      | price desc | macbook-13 |
      | skirt   | Price: High to Low | Sort by      | price desc | iphone-x   |
