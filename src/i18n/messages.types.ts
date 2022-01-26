/* Define your messages types here so you don't forget to add a translation for a locale */

export interface Messages {
  searchBox: {
    clear: string;
    placeholder: string;
  };
  popularSearches: {
    title: string;
  };
  historyQueries: {
    clear: string;
    removeLabel: string;
    title: string;
  };
  querySuggestions: {
    title: string;
  };
  nextQueries: {
    title: string;
  };
  nextQueriesGroup: {
    title: string;
    message: string;
  };
  identifierResults: {
    title: string;
  };
  recommendations: {
    title: string;
  };
  facets: {
    gender: string;
    categoryPaths: string;
    price: string;
    usage: string;
    season: string;
  };
  filters: {
    all: string;
  };
  priceFilter: {
    lessThan: string;
    fromTo: string;
    from: string;
  };
  filtersSearch: {
    placeholder: string;
  };
  toggleAside: {
    hideAside: string;
    showAside: string;
  };
  totalResults: {
    message: string;
  };
  sort: {
    label: string;
  };
  selectedFilters: {
    clear: string;
  };
  result: {
    addToCart: string;
  };
  spellcheck: {
    message: string;
  };
  noResults: {
    message: string;
  };
}
