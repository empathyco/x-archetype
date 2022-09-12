function getURLParameter(name) {
  return (
    decodeURIComponent(
      (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href) || [
        ,
        ''
      ])[1].replace(/\+/g, '%20')
    ) || null
  );
}

function getEnv() {
  const env = getURLParameter('env');
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

var instance = getURLParameter('instance') || 'empathy';
var env = getEnv();
var scope = getURLParameter('scope') || 'desktop';
var lang = getURLParameter('lang') || 'en';
var device = getURLParameter('device') || 'mobile';
var searchLang = getURLParameter('searchLang') || lang;
var currency = getURLParameter('currency') || 'EUR';
var consent = getURLParameter('consent') !== 'false';
var documentDirection = getURLParameter('doc-dir') || 'ltr';

window.initX = {
  instance,
  env,
  scope,
  lang,
  device,
  searchLang,
  currency,
  consent,
  documentDirection
};
