<template>
  <BasePriceFilterLabel
    :filter="filter"
    :lessThan="$t('priceFilter.lessThan')"
    :fromTo="$t('priceFilter.fromTo')"
    :from="$t('priceFilter.from')"
  />
</template>

<script lang="ts">
  import { Filter } from '@empathyco/x-types';
  import { BasePriceFilterLabel } from '@empathyco/x-components';
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      BasePriceFilterLabel
    }
  })
  export default class ResultComponent extends Vue {
    @Prop()
    public filter!: Filter;
  }
</script>
