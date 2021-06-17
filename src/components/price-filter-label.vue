<template>
  <BasePriceFilterLabel
    :filter="filter"
    format="i €"
    :lessThan="$t('priceFilter.lessThan')"
    :fromTo="$t('priceFilter.fromTo')"
    :from="$t('priceFilter.from')"
  />
</template>

<script lang="ts">
  import { Filter } from '@empathy/search-types';
  import { BasePriceFilterLabel } from '@empathy/x-components';
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
