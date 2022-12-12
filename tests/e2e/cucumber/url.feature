Feature: Url component

  Scenario Outline: 1. Navigating to a URL from the outside sets the url origin
    Given a results API with query "<query>"
    And   a URL with query parameter "<query>" and "<view>" size view
    Then  search request contains the origin "url%3Aexternal" in the URL
    When  sort and filter button is clicked on "<view>"
    And   "<sortOrder>" order is clicked in "<sortMenuName>"
    Then  search request contains the origin "url%3Aexternal" in the URL
    When  navigating back
    Then  search request contains the origin "url%3Aurl_history" in the URL

    Examples:
      | query   | sortOrder          | sortMenuName | view       |
      | shirt   | Price: High to Low | Sort by      | macbook-13 |
      | shirt   | Price: High to Low | Sort by      | iphone-x   |


