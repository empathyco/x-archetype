Feature: Multiple interactions

  Scenario Outline: 1. Refine and filter
    Given start page with "<view>" size view
    When  start button is clicked
    And   "<query>" is searched
    Then  related results are displayed
    When  focus is set on the search input
    And   next query number <nextQueryItem> is clicked
    And   scroll down for two seconds
    Then  new related results are displayed
    And   new related results are different from previous ones
    When  facets are shown if hidden on "<view>"
    And   facet "<facetName>" is unfolded
    And   filter <filterNumber> from facet "<facetName>" is clicked
    And   facets are hidden if shown on "<view>"
    And   scroll down for two seconds
    Then  new related results are displayed
    And   new related results are different from previous ones
    When  search input is cleared
    And   "<queryWithRTs>" is searched
    Then  new related results are displayed
    And   new related results are different from previous ones
    When  related tag number <relatedTagItem> is clicked
    And   scroll down for two seconds
    Then  new related results are displayed
    And   new related results are different from previous ones

    Examples:
      | query   | view        | nextQueryItem | filterNumber | facetName | queryWithRTs | relatedTagItem |
      | shirt   | macbook-13  | 0             | 1            | price     | shorts       | 1              |
      | shirt   | iphone-7    | 0             | 1            | price     | shorts       | 1              |
