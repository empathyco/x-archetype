Feature: Tagging component

  Background:
    Given a query tagging API
    And   an add to cart tagging API

  Scenario Outline: 1. Check some actions trigger the query tagging.
    Given start page with "<view>" size view
    When  search bar is clicked
    And   "<query>" is searched
    Then  query tagging request should be triggered
    Given a URL with query parameter "<query>" and "<view>" size view
    Then  query tagging request should be triggered
    And   results page number 1 is loaded
    When  scrolls down to next page
    Then  results page number <pageNumber> is loaded
    And   query tagging request has been triggered
    And   page <pageNumber> query tagging request is triggered

    Examples:
      | query   | view        | pageNumber |
      | shirt   | macbook-13  | 2          |
      | shirt   | iphone-x    | 2          |

  Scenario Outline: 2. Check add to cart tagging.
    Given start page with "<view>" size view
    When  search bar is clicked
    And   "<query>" is searched
    And   pdp add to cart button is clicked
    Then  add product to cart tagging request has been triggered

    Examples:
      | query   | view        |
      | skirt   | macbook-13  |

