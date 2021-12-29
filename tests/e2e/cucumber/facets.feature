Feature: Facets component

  Background:
    Given start page
    Then  start button is clicked

  Scenario Outline: 1. Facets can be shown / hidden
    When  a "<query>" is typed
    Then  facets are displayed
    When  hide-show filters button is clicked
    Then  facets are not displayed
    When  hide-show filters button is clicked
    Then  facets are displayed


    Examples:
      | query   |
      | shirt   |

  Scenario Outline: 2. Filters can be selected and deselected / cleared
    When  a "<query>" is typed
    And   filter <filterNumber> from facet <facetNumber> is clicked
    Then  filter <filterNumber> from facet <facetNumber> is selected
    When  filter <filterNumber> from facet <facetNumber> is clicked
    Then  filter <filterNumber> from facet <facetNumber> is deselected
    When  filter <filterNumber> from facet <facetNumber> is deselected
    And   clear filters button is clicked
    Then  filter <filterNumber> from facet <facetNumber> is deselected
    Examples:
      | query | filterNumber | facetNumber |
      | shirt | 1            | 1           |
