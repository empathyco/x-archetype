Feature: Scroll

  Scenario Outline: 1. Scroll position is kept in the URL and reset upon new search requests
    Given start page with "<view>" size view
    When  start button is clicked
    And   "<query>" is searched
    Then  related results are displayed
    When  scrolling down to result <resultIndex>
    Then  url is updated with result <resultIndex>
    When  sort and filter button is clicked on "<view>"
    And   "<sortOrder>" order is clicked in "<sortMenuName>"
    And   "close-modal-id" is clicked to close the modal
    Then  related results have changed
    And   scroll position is at top
    When  scrolling down to result <resultIndex>
    Then  url is updated with result <resultIndex>
    When  sort and filter button is clicked on "<view>"
    And   facet "<facetName>" is unfolded
    And   filter <filterIndex> from facet "<facetName>" is clicked
    And   "modal-overlay" is clicked to close the modal
    Then  related results have changed
    Then  scroll position is at top
    Examples:
      | query | view       | resultIndex | sortMenuName | sortOrder          | filterIndex | facetName |
      | tshirt | macbook-13 | 16          | Sort by      | Price: Low to High | 1           | price     |
      | tshirt | iphone-7   | 16          | Sort by      | Price: Low to High | 1           | price     |

