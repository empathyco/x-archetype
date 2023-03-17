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
        <NextQuery :suggestion="nextQuery" class="x-button x-button-tight max-desktop:x-px-16">
          {{ $t('nextQueryPreview.query', { query: suggestion.query }) }}
          {{ $t('nextQueryPreview.totalResults', { totalResults }) }}
          <ArrowRightIcon class="x-icon-lg" />
        </NextQuery>
      </template>
      <ItemsList
        :items="results"
        class="x-flex x-gap-16 x-pt-4 max-desktop:x-px-16 desktop:x-w-full"
        itemClass="x-flex-1"
      >
        <template #result="{ item: result }">
          <Result
            :result="result"
            class="desktop:x-min-w-0 x-w-[calc(38vw-16px)] desktop:x-w-auto"
          />
        </template>
      </ItemsList>
    </CustomSlidingPanel>
  </NextQueryPreview>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, toRefs } from 'vue';
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
    setup(props) {
      const { isTabletOrLess } = useDevice();
      return {
        ...toRefs(props),
        maxItemsToRender: computed(() => (isTabletOrLess.value ? undefined : 5))
      };
    }
  });
</script>

<style lang="scss">
  .x-mobile {
    .x-next-query-preview {
      // TODO: Change this when we migrate the grid component to the new XDS
      margin-left: calc(-1 * var(--x-size-padding-grid));
    }
  }
</style>
