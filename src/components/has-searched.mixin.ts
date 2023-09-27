import { isStringEmpty, UrlParams, XOn } from '@empathyco/x-components';
import Vue from 'vue';
import Component from 'vue-class-component';
import { QueryPreviewInfo } from '@empathyco/x-components/queries-preview';

@Component
export default class HasSearchedMixin extends Vue {
  protected hasSearched = false;

  @XOn(['UserAcceptedAQuery', 'ParamsLoadedFromUrl', 'UserAcceptedAQueryPreview'])
  open(payload: string | UrlParams | QueryPreviewInfo): void {
    if (typeof payload === 'string' || !isStringEmpty(payload.query)) {
      this.hasSearched = true;
    }
  }
}
