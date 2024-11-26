<template>
  <PartialResultsList class="x-mb-24 x-gap-40 desktop:x-gap-80">
    <template #default="{ partialResult }">
      <CustomSlidingPanel>
        <template #header>
          <PartialQueryButton
            :query="partialResult.query"
            class="x-button-lead x-button-tight x-button max-desktop:x-px-16"
          >
            {{ $t('partialResults.query', { query: partialResult.query }) }}
            {{ $t('partialResults.totalResults', { totalResults: partialResult.totalResults }) }}
            <ArrowRightIcon class="x-icon-lg" />
          </PartialQueryButton>
        </template>
        <ItemsList
          :items="partialResult.results"
          class="x-flex x-gap-16 x-pt-4 max-desktop:x-px-16"
        >
          <template #result="{ item: result }">
            <Result
              :result="result"
              class="x-w-[calc(38vw-16px)] x-min-w-[142px] desktop:x-w-[224px]"
              :show-description="isTabletOrGreater"
              show-compact-prices
            />
          </template>
        </ItemsList>
      </CustomSlidingPanel>
    </template>
  </PartialResultsList>
</template>

<script lang="ts">
  import { ArrowRightIcon, ItemsList } from '@empathyco/x-components';
  import { PartialQueryButton, PartialResultsList } from '@empathyco/x-components/search';
  import { defineComponent } from 'vue';
  import { useDevice } from '../../../composables/use-device.composable';
  import CustomSlidingPanel from '../../custom-sliding-panel.vue';
  import ResultComponent from '../../results/result.vue';

  export default defineComponent({
    components: {
      ArrowRightIcon,
      CustomSlidingPanel,
      ItemsList,
      Result: ResultComponent,
      PartialResultsList,
      PartialQueryButton
    },
    setup() {
      const { isTabletOrGreater } = useDevice();

      return { isTabletOrGreater };
    }
  });
</script>
