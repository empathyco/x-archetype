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
    message: string;
    noHistory: string;
    openButton: string;
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
  recommendations: {
    title: string;
  };
  facets: {
    gender: string;
    categoryPaths: string;
    price: string;
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
    message: string;
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
}
