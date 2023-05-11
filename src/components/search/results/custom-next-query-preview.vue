<template>
  <NextQueryPreview
    #default="{ results, totalResults, suggestion }"
    class="x-flex x-flex-col x-gap-4 x-bg-neutral-10 x-py-24 desktop:x-px-24"
    :suggestion="nextQuery"
    :maxItemsToRender="maxItemsToRender"
  >
    <i18n class="x-text1 x-text1-lg max-desktop:x-px-16" tag="span" path="nextQueryPreview.message">
      <template #query>
        <span class="x-title3">{{ $x.query.nextQueries }}</span>
      </template>
    </i18n>
    <CustomSlidingPanel>
      <template #header>
        <NextQuery :suggestion="nextQuery" class="x-button-tight x-button max-desktop:x-px-16">
          {{ $t('nextQueryPreview.query', { query: suggestion.query }) }}
          {{ $t('nextQueryPreview.totalResults', { totalResults }) }}
          <ArrowRightIcon class="x-icon-lg" />
        </NextQuery>
      </template>
      <ItemsList
        :items="results"
        class="x-flex x-gap-16 x-pt-4 max-desktop:x-px-16 desktop:x-w-full"
        itemClass="x-flex-shrink-0"
      >
        <template #result="{ item: result }">
          <Result :result="result" class="x-w-[calc(38vw-16px)] desktop:x-max-w-[265px]" />
        </template>
      </ItemsList>
    </CustomSlidingPanel>
  </NextQueryPreview>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';
  import { ArrowRightIcon, ItemsList } from '@empathyco/x-components';
  import { NextQuery, NextQueryPreview } from '@empathyco/x-components/next-queries';
  import { NextQuery as NextQueryModel } from '@empathyco/x-types';
  import { useDevice } from '../../../composables/use-device.composable';
  import Result from '../../results/result.vue';
  import CustomSlidingPanel from '../../custom-sliding-panel.vue';

  export default defineComponent({
    components: {
      CustomSlidingPanel,
      NextQuery,
      Result,
      ArrowRightIcon,
      ItemsList,
      NextQueryPreview
    },
    props: {
      nextQuery: { type: Object as PropType<NextQueryModel>, required: true }
    },
    setup() {
      const { isTabletOrLess } = useDevice();
      const maxItemsToRender = computed(() => (isTabletOrLess.value ? undefined : 5));
      return {
        maxItemsToRender
      };
    }
  });
</script>

<style lang="scss">
  .x-mobile {
    .x-next-query-preview {
      margin-left: calc(-1 * var(--x-margin-left));
    }
  }
</style>
