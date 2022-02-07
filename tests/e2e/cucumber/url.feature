Feature: Url component

  Scenario Outline: 1. Navigating to a URL from the outside sets the url origin as "<origin>"
    Given a results API with query "<query>"
    And   a URL with query parameter "<query>" and "<view>" size view
    Then  search request contains the origin "url%3Aexternal" in the URL
    When  facets are shown if hidden on "<view>"
    And   "<sortOrder>" order is clicked
    And   facets are hidden if shown on "<view>"
    Then  search request contains the origin "url%3Aexternal" in the URL
    When  navigating back
    Then  search request contains the origin "url%3Aurl_history" in the URL

    Examples:
      | query | view        | sortOrder  |
      | shirt | macbook-13  | price desc |
      | shirt | iphone-7    | price desc |


