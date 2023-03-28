Feature: Predictive components

  Scenario Outline: 1. Predictive components are displayed as expected
    Given start page with "<view>" size view
    When  search bar is clicked
    And   focus is set on the search input
    Then  recommendations are displayed
    And   popular searches are displayed
    When  a "<query>" is typed
    Then  query suggestions are displayed
    When  search input is cleared
    And   "<query>" is searched
    And   focus is set on the search input
    Then  next queries are displayed
    When  search input is cleared
    Then  history queries are displayed
    Examples:
      | query  | view        |
      | dress  | macbook-13  |
      | dress  | iphone-x    |

  Scenario Outline: 2. Related tags interaction
    Given start page with "<view>" size view
    When  search bar is clicked
    And   "<query>" is searched
    Then  related tags are displayed
    Given an intercepted search response from "related_tag"
    When  related tag <relatedTagIndex> is clicked
    Then  a search request from "related_tag" is done
    And   clicked related tag is shown in position 0 as selected
    When  related tag 0 is clicked
    Then  a search request from "related_tag" is done
    And  related tag <relatedTagIndex> is displayed as not selected
    Examples:
      | query   | relatedTagIndex | view        |
      | dress   | 1               | macbook-13  |
      | dress   | 1               | iphone-x    |

  Scenario Outline: 3. Clear a history query
    Given start page with "<view>" size view
    When  search bar is clicked
    Given a "<list>" of queries already searched
    And   an empty search-box
    When  focus is set on the search input
    And   history queries are displayed
    And   history query number <historyQueryItem> delete button is clicked
    Then  the deleted history query is removed from history queries
    Examples:
      | list               | historyQueryItem | view        |
      | shirt, shoe, skirt | 0                | macbook-13  |
      | shirt, shoe, skirt | 0                | iphone-x    |

  Scenario Outline: 4. Clear all history queries
    Given start page with "<view>" size view
    When  search bar is clicked
    Given a "<list>" of queries already searched
    And   an empty search-box
    When  focus is set on the search input
    And   clear history queries button is clicked
    Then  no history queries are displayed
    Examples:
      | list               | view        |
      | shirt, shoe, skirt | macbook-13  |
      | shirt, shoe, skirt | iphone-x    |
