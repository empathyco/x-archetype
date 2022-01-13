Feature: Facets component

  Background:
    Given start page
    Then  start button is clicked

  Scenario Outline: 1. Facets can be shown / hidden
    When  a "<query>" is typed
    Then  facets are displayed is <areFacetsVisible>
    When  hide-show filters button is clicked
    Then  facets are displayed is <areFacetsVisibleAfterClick>
    When  hide-show filters button is clicked
    Then  facets are displayed is <areFacetsVisible>
    Examples:
      | query   | areFacetsVisible | areFacetsVisibleAfterClick |
      | shirt   | true             | false                      |

  Scenario Outline: 2. Filters can be selected and deselected / cleared
    When  a "<query>" is typed
    And   facet "<facetName>" is "unfolded"
    And   filter <filterNumber> from facet "<facetName>" is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is true
    When  filter <filterNumber> from facet "<facetName>" is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is false
    When  filter <filterNumber> from facet "<facetName>" is clicked
    And   clear filters button is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is false
    Examples:
      | query | filterNumber | facetName |
      | shirt | 1            | price     |

  Scenario Outline: 3. Multiple filters from the same facet can be selected
    When  a "<query>" is typed
    And   facet "<facetName>" is "unfolded"
    And   filter <filterNumber> from facet "<facetName>" is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is true
    When  filter <filterNumber2> from facet "<facetName>" is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is true
    And   filter <filterNumber2> from facet "<facetName>" is selected is true
    Examples:
      | query | filterNumber | facetName | filterNumber2 |
      | shirt | 2            | price     | 1             |

  Scenario Outline: 4. Multiple filters from different facets can be selected
    When  a "<query>" is typed
    And   facet "<facetName>" is "unfolded"
    And   filter <filterNumber> from facet "<facetName>" is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is true
    When  facet "<facetName2>" is "unfolded"
    And   filter <filterNumber2> from facet "<facetName2>" is clicked
    And   facet "<facetName>" is "unfolded"
    Then  filter <filterNumber> from facet "<facetName>" is selected is true
    And   filter <filterNumber2> from facet "<facetName2>" is selected is true
    Examples:
      | query | filterNumber | facetName | filterNumber2 | facetName2 |
      | shirt | 2            | price     | 1             | gender     |

  Scenario Outline: 5. Hierarchical filters selection
    When  a "<query>" is typed
    And   facet "<facetName>" is "unfolded"
    And   filter <hierarchicalFilter> from facet "<facetName>" is clicked
    Then  selection status of filter number <hierarchicalFilter> in facet "<facetName>" is true
    When  child filter <childFilter> from parent filter <hierarchicalFilter> in "<facetName>" is clicked
    Then  selection status of child filter <childFilter> from parent filter <hierarchicalFilter> in facet "<facetName>" is true
    And   selection status of filter number <hierarchicalFilter> in facet "<facetName>" is true
    When  child filter <childFilter> from parent filter <hierarchicalFilter> in "<facetName>" is clicked
    Then  selection status of child filter <childFilter> from parent filter <hierarchicalFilter> in facet "<facetName>" is false
    And   selection status of filter number <hierarchicalFilter> in facet "<facetName>" is true
    When  child filter <childFilter> from parent filter <hierarchicalFilter> in "<facetName>" is clicked
    Then  selection status of child filter <childFilter> from parent filter <hierarchicalFilter> in facet "<facetName>" is true
    When  filter <hierarchicalFilter> from facet "<facetName>" is clicked
    Then  selection status of child filter <childFilter> from parent filter <hierarchicalFilter> in facet "<facetName>" is false
    And   selection status of filter number <hierarchicalFilter> in facet "<facetName>" is false
    Examples:
      | query  | hierarchicalFilter | childFilter | facetName     |
      | shirt  | 0                  | 0           | categoryPaths |
