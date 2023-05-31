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
  myHistory: {
    title: string;
    subtitle: string;
    message: {
      header: string;
      body: string;
      footer: string;
    };
    noHistory: string;
    openButton: string;
    suggestionResults: string;
    switch: {
      title: string;
      enable: string;
      disable: string;
    };
    confirmDisableModal: {
      title: string;
      message: string;
      dismiss: string;
      confirm: string;
    };
  };
  nextQueries: {
    title: string;
  };
  nextQueriesGroup: {
    message: string;
  };
  nextQueryPreview: {
    message: string;
    query: string;
    totalResults: string;
    viewResults: string;
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
    brand: string;
    fit: string;
  };
  facetsPanel: {
    title: string;
    viewResults: string;
  };
  filters: {
    all: string;
    showMore: string;
    showLess: string;
  };
  partialResults: {
    query: string;
    totalResults: string;
    viewResults: string;
  };
  priceFilter: {
    lessThan: string;
    fromTo: string;
    from: string;
  };
  toggleAside: {
    showAside: string;
  };
  totalResults: {
    message: string;
  };
  semanticQueries: {
    title: string;
  };
  sort: {
    label: string;
    values: {
      'price asc': string;
      'price desc': string;
      default: string;
    };
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
  columnPicker: {
    message: string;
  };
  queryPreview: {
    viewResults: string;
  };
}
