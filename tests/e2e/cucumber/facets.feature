Feature: Facets component

  Scenario Outline: 1. Facets can be shown / hidden
    Given start page with "<view>" size view
    When  start button is clicked
    And  "<query>" is searched
    Then  facets are displayed is <areFacetsVisible>
    When  hide-show filters button is clicked on "<view>" after facets being displayed is <areFacetsVisible>
    Then  facets are displayed is <areFacetsVisibleAfterClick>
    When  hide-show filters button is clicked on "<view>" after facets being displayed is <areFacetsVisibleAfterClick>
    Then  facets are displayed is <areFacetsVisible>
    Examples:
      | query   | areFacetsVisible | areFacetsVisibleAfterClick | view        |
      | shirt   | true             | false                      | macbook-13  |
      | shirt   | false            | true                       | iphone-7    |

  Scenario Outline: 2. Filters can be selected and deselected / cleared
    Given start page with "<view>" size view
    When  start button is clicked
    And   "<query>" is searched
    And   facets are shown if hidden on "<view>"
    And   facet "<facetName>" is unfolded
    And   filter <filterNumber> from facet "<facetName>" is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is true
    When  filter <filterNumber> from facet "<facetName>" is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is false
    When  filter <filterNumber> from facet "<facetName>" is clicked
    And   clear filters button is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is false
    Examples:
      | query | filterNumber | facetName | view        |
      | shirt | 1            | price     | macbook-13  |
      | shirt | 1            | price     | iphone-7    |

  Scenario Outline: 3. Multiple filters from the same facet can be selected
    Given start page with "<view>" size view
    When  start button is clicked
    And   "<query>" is searched
    And   facets are shown if hidden on "<view>"
    And   facet "<facetName>" is unfolded
    And   filter <filterNumber> from facet "<facetName>" is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is true
    When  filter <filterNumber2> from facet "<facetName>" is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is true
    And   filter <filterNumber2> from facet "<facetName>" is selected is true
    Examples:
      | query | filterNumber | facetName | filterNumber2 | view        |
      | shirt | 2            | price     | 1             | macbook-13  |
      | shirt | 2            | price     | 1             | iphone-7    |

  Scenario Outline: 4. Multiple filters from different facets can be selected
    Given start page with "<view>" size view
    When  start button is clicked
    And   "<query>" is searched
    And   facets are shown if hidden on "<view>"
    And   facet "<facetName>" is unfolded
    And   filter <filterNumber> from facet "<facetName>" is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is true
    When  facet "<facetName2>" is unfolded
    And   filter <filterNumber2> from facet "<facetName2>" is clicked
    And   facet "<facetName>" is unfolded
    Then  filter <filterNumber> from facet "<facetName>" is selected is true
    And   filter <filterNumber2> from facet "<facetName2>" is selected is true
    Examples:
      | query | filterNumber | facetName | filterNumber2 | facetName2 | view        |
      | shirt | 2            | price     | 1             | gender     | macbook-13  |
      | shirt | 2            | price     | 1             | gender     | iphone-7    |

  Scenario Outline: 5. Hierarchical filters selection
    Given start page with "<view>" size view
    When  start button is clicked
    And   "<query>" is searched
    And   facets are shown if hidden on "<view>"
    And   facet "<facetName>" is unfolded
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
      | query  | hierarchicalFilter | childFilter | facetName     | view        |
      | shirt  | 0                  | 0           | categoryPaths | macbook-13  |
      | shirt  | 0                  | 0           | categoryPaths | iphone-7    |
