<script lang="ts">
  import { UrlParams, XOn } from '@empathyco/x-components';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class HasQueryMixin extends Vue {
    protected hasQuery = false;
    @XOn(['UserAcceptedAQuery', 'ParamsLoadedFromUrl'])
    open(payload: string | UrlParams): void {
      if (typeof payload === 'string' || payload.query.length > 0) {
        this.hasQuery = true;
      }
    }
  }
</script>
