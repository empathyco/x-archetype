Feature: Predictive components

  Scenario Outline: 1. Predictive components are displayed as expected
    Given start page with "<view>" size view
    When  start button is clicked
    Then  recommendations are displayed
    And   search input is focused
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
      | query | view        |
      | belt | macbook-13  |
      | belt | iphone-7    |

  Scenario Outline: 2. Related tags interaction
    Given start page with "<view>" size view
    When  start button is clicked
    And   "<query>" is searched
    Then  related tags are displayed
    Given an intercepted search response
    When  related tag <relatedTagIndex> is clicked
    Then  search request contains the origin "related_tag" in the URL
    And   clicked related tag is shown in position 0 as selected
    When  related tag 0 is clicked
    Then  related tag <relatedTagIndex> is displayed as not selected
    Examples:
      | query   | relatedTagIndex | view        |
      | shorts  | 1               | macbook-13  |
      | shorts  | 1               | iphone-7    |

  Scenario Outline: 3. Clear a history query
    Given start page with "<view>" size view
    When  start button is clicked
    Given a "<list>" of queries already searched
    When  search input is focused
    And   history query number <historyQueryItem> delete button is clicked
    Then  the deleted history query is removed from history queries
    Examples:
      | list               | historyQueryItem | view        |
      | shirt, shoe, skirt | 0                | macbook-13  |
      | shirt, shoe, skirt | 0                | iphone-7    |

  Scenario Outline: 4. Clear all history queries
    Given start page with "<view>" size view
    When  start button is clicked
    Given a "<list>" of queries already searched
    When  search input is focused
    And   clear history queries button is clicked
    Then  no history queries are displayed
    Examples:
      | list               | view        |
      | shirt, shoe, skirt | macbook-13  |
      | shirt, shoe, skirt | iphone-7    |
