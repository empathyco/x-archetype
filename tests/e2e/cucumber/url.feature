Feature: Url component

  Scenario Outline: 1. Navigating to a URL from the outside sets the url origin
    Given a results API with query "<query>"
    And   a URL with query parameter "<query>" and "<view>" size view
    And   an intercepted search response from "url:external"
    And   an intercepted search response from "url:url_history"
    Then  a search request from "url:external" is done
    When  sort and filter button is clicked on "<view>"
    And   "<sortOrder>" order is clicked in "<sortMenuName>"
    Then  a search request from "url:external" is done
    When  navigating back
    Then  a search request from "url:url_history" is done

    Examples:
      | query   | sortOrder          | sortMenuName | view       |
      | shirt   | Price: High to Low | Sort by      | macbook-13 |
      | shirt   | Price: High to Low | Sort by      | iphone-x   |


