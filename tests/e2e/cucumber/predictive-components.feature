Feature: Predictive components

  Background:
    Given start page
    Then  start button is clicked

  Scenario Outline: 1. Predictive components are displayed as expected
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
      | query |
      | shirt |

  Scenario Outline: 2. Related tags interaction
    When  "<query>" is searched
    Then  related tags are displayed
    Given an intercepted search response
    When  related tag <relatedTagIndex> is clicked
    Then  search request contains the origin "related_tag" in the URL
    And   clicked related tag is shown in position 0 as selected
    When  related tag 0 is clicked
    Then  related tag <relatedTagIndex> is displayed as not selected
    Examples:
      | query   | relatedTagIndex |
      | shorts  | 1               |

  Scenario Outline: 3. Clear a history query
    Given a "<list>" of queries already searched
    When  search input is focused
    And   history query number <historyQueryItem> delete button is clicked
    Then  the deleted history query is removed from history queries
    Examples:
      | list               | historyQueryItem |
      | shirt, shoe, skirt | 0                |

  Scenario Outline: 4. Clear all history queries
    Given a "<list>" of queries already searched
    When  search input is focused
    And   clear history queries button is clicked
    Then  no history queries are displayed
    Examples:
      | list               |
      | shirt, shoe, skirt |
