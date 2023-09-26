function getAllURLParameters() {
  const parameterRegex = /[?&]+([^=&;$]+)=([^&#;$]*)/gi;
  const parameters = {};

  while ((regexMatch = parameterRegex.exec(window.location.href)) !== null) {
    parameters[regexMatch[1]] = decodeParameterValue(regexMatch[2]);
  }

  return parameters;
}

function decodeParameterValue(parameterValue) {
  return decodeURIComponent(parameterValue.replace(/\+/g, '%20')) || null;
}

function popURLParameter(parametersDictionary, parameterKey) {
  const parameterValue = parametersDictionary[parameterKey];

  if (parameterValue) {
    delete parametersDictionary[parameterKey];
    return parameterValue;
  }
}

const URLParameters = getAllURLParameters();
const popFromURLParameters = popURLParameter.bind(this, URLParameters);

function getEnv() {
  const env = popFromURLParameters('env');
  const envsDict = {
    live: '',
    staging: 'staging',
    test: 'staging'
  };

  if (env) {
    return envsDict[env];
  }

  if (!!document.location.host.match(/localhost|\.test\.|\.staging\./)) {
    return 'staging';
  }

  return undefined;
}

function getIsolationStrategy() {
  const isolation = popFromURLParameters('isolation');

  return isolation === undefined ? undefined : isolation === 'true';
}

const instance = popFromURLParameters('instance') || 'empathy';
const env = getEnv();
const scope = popFromURLParameters('scope') || 'desktop';
const lang = popFromURLParameters('lang') || 'en';
const device = popFromURLParameters('device') || undefined;
const uiLang = popFromURLParameters('uiLang') || lang;
const currency = popFromURLParameters('currency') || 'EUR';
const consent = popFromURLParameters('consent') !== 'false';
const documentDirection = popFromURLParameters('doc-dir') || 'ltr';
const store = popFromURLParameters('store') || undefined;
const isolate = getIsolationStrategy();
popFromURLParameters('query'); // prevent the query from be included as extra param
popFromURLParameters('filter'); // Prevent the filters to be included as extra param

window.__enableVueDevtools__ = true;
window.initX = {
  instance,
  env,
  scope,
  lang,
  device,
  uiLang,
  currency,
  consent,
  documentDirection,
  store,
  isolate,
  ...URLParameters,
  queriesPreview: [
    {
      query: 'summer dress',
      title: 'Summer dresses by Marni',
      filters: ['brand:marni']
    },
    {
      query: 'belted legging',
      filters: ['categoryIds:1b5f82125'],
      title: 'Belted leggings'
    },
    {
      query: 'bags',
      extraParams: {
        sort: 'price desc'
      },
      title: 'Exclusive bags'
    },
    {
      query: 'sunglasses',
      title: 'Sunshine ready'
    },
    {
      query: 'woven hat',
      title: 'Elegant Sunshield'
    }
  ]
};
