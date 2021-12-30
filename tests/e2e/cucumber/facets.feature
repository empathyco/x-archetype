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
    Then  filter <filterNumber> from facet <facetNumber> is selected is "true"
    When  filter <filterNumber> from facet <facetNumber> is clicked
    Then  filter <filterNumber> from facet <facetNumber> is selected is "false"
    When  filter <filterNumber> from facet <facetNumber> is clicked
    And   clear filters button is clicked
    Then  filter <filterNumber> from facet <facetNumber> is selected is "false"
    Examples:
      | query | filterNumber | facetNumber |
      | shirt | 1            | 1           |

  Scenario Outline: 3. Multiple filters from the same facet can be selected
    When  a "<query>" is typed
    And   filter <filterNumber> from facet <facetNumber> is clicked
    And   filter <filterNumber2> from facet <facetNumber> is clicked
    Then  filter <filterNumber> from facet <facetNumber> is selected is "true"
    And   filter <filterNumber2> from facet <facetNumber> is selected is "true"
    Examples:
      | query | filterNumber | facetNumber | filterNumber2 |
      | shirt | 2            | 1           | 1             |

  Scenario Outline: 4. Multiple filters from different facets can be selected
    When  a "<query>" is typed
    And   filter <filterNumber> from facet <facetNumber> is clicked
    And   facet <facetNumber> is "folded"
    And   filter <filterNumber2> from facet <facetNumber2> is clicked
    And   facet <facetNumber> is "unfolded"
    Then  filter <filterNumber> from facet <facetNumber> is selected is "true"
    And   filter <filterNumber2> from facet <facetNumber2> is selected is "true"
    Examples:
      | query | filterNumber | facetNumber | filterNumber2 | facetNumber2 |
      | shirt | 2            | 1           | 1             | 2            |

  Scenario Outline: 5. Hierarchical filters selection
    When  a "<query>" is typed
    And   filter <hierarchicalFilter> from facet <facetNumber> is clicked
    And   child filter <childFilter> from parent filter <hierarchicalFilter> in <facetNumber> is clicked
    Then  selection status of child filter <childFilter> from parent filter <hierarchicalFilter> in facet <facetNumber> is "true"
    And   selection status of filter number <hierarchicalFilter> in facet <facetNumber> is "true"
    When  child filter <childFilter> from parent filter <hierarchicalFilter> in <facetNumber> is clicked
    Then  selection status of child filter <childFilter> from parent filter <hierarchicalFilter> in facet <facetNumber> is "false"
    And   selection status of filter number <hierarchicalFilter> in facet <facetNumber> is "true"
    When  child filter <childFilter> from parent filter <hierarchicalFilter> in <facetNumber> is clicked
    And   filter <hierarchicalFilter> from facet <facetNumber> is clicked
    Then  selection status of child filter <childFilter> from parent filter <hierarchicalFilter> in facet <facetNumber> is "false"
    And   selection status of filter number <hierarchicalFilter> in facet <facetNumber> is "false"
    Examples:
      | query  | hierarchicalFilter | childFilter | facetNumber |
      | shirt  | 0                  | 0           | 0           |
