Feature: Facets component

  Scenario Outline: 1. Facets modal can be shown / hidden
    Given start page with "<view>" size view
    When  search bar is clicked
    And  "<query>" is searched
    Then  related results are displayed
    And   facets are displayed is false
    When  sort and filter button is clicked on "<view>"
    Then  facets are displayed is true
    When  "<closeMethod>" is clicked to close the modal
    Then  facets are displayed is false
    Examples:
      | query   | view        | closeMethod     |
      | shirt   | macbook-13  | close-modal-id  |
      | shirt   | macbook-13  | modal-overlay   |
      | shirt   | iphone-x    | close-modal-id  |
      | shirt   | iphone-x    | modal-overlay   |

  Scenario Outline: 2. Filters can be selected and deselected / cleared
    Given start page with "<view>" size view
    When  search bar is clicked
    And   "<query>" is searched
    Then  related results are displayed
    When  sort and filter button is clicked on "<view>"
    Then  facets are displayed is true
    When  facet "<facetName>" is unfolded
    And   filter <filterNumber> from facet "<facetName>" is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is true
    When  filter <filterNumber> from facet "<facetName>" is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is false
    When  filter <filterNumber> from facet "<facetName>" is clicked
    And   clear filters button is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is false
    Examples:
      | query | filterNumber | facetName | view        |
      | shirt | 1            | brand     | macbook-13  |
      | shirt | 1            | brand     | iphone-x    |

  Scenario Outline: 3. Multiple filters from the same facet can be selected
    Given start page with "<view>" size view
    When  search bar is clicked
    And   "<query>" is searched
    Then  related results are displayed
    When  sort and filter button is clicked on "<view>"
    Then  facets are displayed is true
    When  facet "<facetName>" is unfolded
    And   filter <filterNumber> from facet "<facetName>" is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is true
    When  filter <filterNumber2> from facet "<facetName>" is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is true
    And   filter <filterNumber2> from facet "<facetName>" is selected is true
    Examples:
      | query | filterNumber | facetName | filterNumber2 | view        |
      | shirt | 2            | brand     | 1             | macbook-13  |
      | shirt | 2            | brand     | 1             | iphone-x    |

  Scenario Outline: 4. Multiple filters from different facets can be selected
    Given start page with "<view>" size view
    When  search bar is clicked
    And   "<query>" is searched
    Then  related results are displayed
    When  sort and filter button is clicked on "<view>"
    Then  facets are displayed is true
    When  facet "<facetName>" is unfolded
    And   filter <filterNumber> from facet "<facetName>" is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is true
    When  facet "<facetName2>" is unfolded
    And   filter <filterNumber2> from facet "<facetName2>" is clicked
    Then  filter <filterNumber> from facet "<facetName>" is selected is true
    And   filter <filterNumber2> from facet "<facetName2>" is selected is true
    Examples:
      | query | filterNumber | facetName | filterNumber2 | facetName2 | view        |
      | shirt | 2            | brand     | 1             | fit     | macbook-13  |
      | shirt | 2            | brand     | 1             | fit     | iphone-x    |

    @skip
  # TODO: Resume once the response returns hierarchical filters
  Scenario Outline: 5. Hierarchical filters selection
    Given start page with "<view>" size view
    When  search bar is clicked
    And   "<query>" is searched
    Then  related results are displayed
    When  sort and filter button is clicked on "<view>"
    Then  facets are displayed is true
    When  facet "<facetName>" is unfolded
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
      | shirt  | 0                  | 0           | categoryPaths | iphone-x    |
