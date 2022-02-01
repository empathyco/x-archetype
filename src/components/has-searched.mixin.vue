<script lang="ts">
  import { UrlParams, XOn } from '@empathyco/x-components';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class HasSearchedMixin extends Vue {
    protected hasSearched = false;
    @XOn(['UserAcceptedAQuery', 'ParamsLoadedFromUrl'])
    open(payload: string | UrlParams): void {
      if (typeof payload === 'string' || payload.query.length > 0) {
        this.hasSearched = true;
      }
    }
  }
</script>
