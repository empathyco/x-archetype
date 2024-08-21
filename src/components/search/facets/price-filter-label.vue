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
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    components: {
      BasePriceFilterLabel
    },
    props: {
      filter: Object as PropType<Filter>
    }
  });
</script>
