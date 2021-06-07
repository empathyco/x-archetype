function getURLParameter(name) {
  return decodeURIComponent(
    (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href) || [, ''])[1].replace(/\+/g, '%20')) || null;
}

var instance = getURLParameter('instance') || 'platform';
var env = getURLParameter('env') || undefined;
var scope = getURLParameter('scope') || 'desktop';
var lang = getURLParameter('lang') || 'en';
var device = getURLParameter('device') || 'mobile';
var searchLang = getURLParameter('searchLang') || lang;
var currency = getURLParameter('currency') || 'EUR';
var consent = getURLParameter('consent') === 'true' || false;
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

