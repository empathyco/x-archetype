Feature: Multiple interactions

  @skip
  # Needs a refactor since next query fallback are changing in benefit of related prompts
  Scenario Outline: 1. Refine and filter
    Given start page with "<view>" size view
    When  search bar is clicked
    And   "<query>" is searched
    Then  related results are displayed
    When  focus is set on the search input
    And   next query number <nextQueryItem> is clicked
    Then  related results have changed
    When  scroll down for two seconds
    And   sort and filter button is clicked on "<view>"
    Then  facets are displayed is true
    When  facet "<facetName>" is unfolded
    And   filter <filterNumber> from facet "<facetName>" is clicked
    And   "modal-overlay" is clicked to close the modal
    Then  related results have changed
    When  scroll down for two seconds
    And   search input is cleared
    And   "<queryWithRTs>" is searched
    Then  related results have changed
    When  related tag number <relatedTagItem> is clicked
    And   scroll down for two seconds
    Then  related results have changed

    Examples:
      | query    | view        | nextQueryItem | filterNumber | facetName | queryWithRTs | relatedTagItem |
      | tshirt   | macbook-13  | 1             | 1            | gender     | tshirt       | 1              |
      | tshirt   | iphone-x    | 1             | 1            | gender     | tshirt       | 1              |
