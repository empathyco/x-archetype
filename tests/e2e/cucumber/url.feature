Feature: Url component

  Scenario Outline: 1. Navigating to a URL from the outside sets the url origin in mobile view
    Given a results API with query "<query>"
    And   a URL with query parameter "<query>" and "<view>" size view
    And   an intercepted search response from "url:external"
    And   an intercepted search response from "url:url_history"
    Then  a search request from "url:external" is done
    When  sort and filter button is clicked on "<view>"
    And   "<sortOrder>" order is clicked in "<sortMenuName>" in mobile
    Then  a search request from "url:external" is done
    When  navigating back
    Then  a search request from "url:url_history" is done

    Examples:
      | query   | sortOrder          | sortMenuName | view       |
      | shirt   | Price: High to Low | Sort by      | iphone-x   |

  Scenario Outline: 2. Navigating to a URL from the outside sets the url origin in desktop view
    Given a results API with query "<query>"
    And   a URL with query parameter "<query>" and "<view>" size view
    And   an intercepted search response from "url:external"
    And   an intercepted search response from "url:url_history"
    Then  a search request from "url:external" is done
    And   "<sortOrder>" order is clicked in "<sortMenuName>"
    When  navigating back
    Then  a search request from "url:url_history" is done

    Examples:
      | query   | sortOrder          | sortMenuName | view       |
      | shirt   | Price: High to Low | Sort by      | macbook-13 |


