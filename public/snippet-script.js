function getAllURLParameters() {
  var parameterRegex = /[?&]+([^=&;$]+)=([^&#;$]*)/gi;
  var parameters = {};

  while((regexMatch = parameterRegex.exec(window.location.href)) != null) {
    parameters[regexMatch[1]] = decodeParameterValue(regexMatch[2]);
  }

  return parameters;
}

function decodeParameterValue(parameterValue) {
  return (
    decodeURIComponent(
      parameterValue.replace(/\+/g, '%20')
    ) || null
  );
}

function popURLParameter(parametersDictionary, parameterKey) {
  if(parametersDictionary[parameterKey]) {
    const parameterValue = parametersDictionary[parameterKey];
    delete parametersDictionary[parameterKey];
    return parameterValue;
  }

  return undefined;
}

var URLParameters = getAllURLParameters();
var popFromURLParameters = popURLParameter.bind(this, URLParameters);

function getEnv() {
  const env = popFromURLParameters('env');
  const envsDict = {
    live: undefined,
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

var instance = popFromURLParameters('instance') || 'empathy';
var env = getEnv();
var scope = popFromURLParameters('scope') || 'desktop';
var lang = popFromURLParameters('lang') || 'en';
var device = popFromURLParameters('device') || 'mobile';
var uiLang = popFromURLParameters('uiLang') || lang;
var currency = popFromURLParameters('currency') || 'EUR';
var consent = popFromURLParameters('consent') !== 'false';
var documentDirection = popFromURLParameters('doc-dir') || 'ltr';
var store = popFromURLParameters('store') || undefined;

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
  ...URLParameters,
  queriesPreview: [
    {
      query: "backpack",
      title: "Back to School!",
    },
    {
      query: "watch",
      title: "Get on time!",
    },
    {
      query: "women boots",
      title: "Get comfy!",
    },
  ]
};
