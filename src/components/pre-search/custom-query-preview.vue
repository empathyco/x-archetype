<template>
  <div v-if="!$x.query.searchBox && queriesPreviewInfo">
    <QueryPreview
      v-for="{ query, title } in queriesPreviewInfo"
      :key="query"
      :query="query"
      :queryFeature="queryFeature"
      #default="{ results, totalResults }"
    >
      <div class="x-mb-40 x-flex x-flex-col x-gap-2 desktop:x-mb-64 desktop:x-gap-16">
        <div class="max-desktop:x-px-16">
          <h1 class="max-desktop:x-title1-sm desktop:x-title1">
            {{ title }}
          </h1>
        </div>

        <CustomSlidingPanel>
          <template #header>
            <BaseEventButton
              :events="getEvent(query)"
              class="x-button x-button-tight max-desktop:x-px-16"
            >
              {{ query }}
              ({{ totalResults }})
              <ArrowRightIcon class="x-icon-lg" />
            </BaseEventButton>
          </template>
          <ItemsList :items="results" class="x-flex x-gap-16 x-pt-16 max-desktop:x-px-16">
            <template #result="{ item: result }">
              <Result :result="result" class="x-w-[142px] desktop:x-w-[216px]" />
            </template>
          </ItemsList>
        </CustomSlidingPanel>
      </div>
    </QueryPreview>
  </div>
</template>

<script lang="ts">
  import { Prop, Component, Vue } from 'vue-property-decorator';
  import { QueryPreview } from '@empathyco/x-components/queries-preview';
  import {
    BaseEventButton,
    ChevronLeftIcon,
    ChevronRightIcon,
    QueryFeature,
    QueryPreviewInfo,
    SlidingPanel,
    XEventsTypes,
    XInject,
    ItemsList,
    ArrowRightIcon
  } from '@empathyco/x-components';
  import { default as Result } from '../results/result.vue';
  import CustomSlidingPanel from '../custom-sliding-panel.vue';

  @Component({
    components: {
      CustomSlidingPanel,
      QueryPreview,
      SlidingPanel,
      Result,
      BaseEventButton,
      ChevronLeftIcon,
      ChevronRightIcon,
      ItemsList,
      ArrowRightIcon
    }
  })
  export default class CustomQueryPreview extends Vue {
    @Prop({ default: 'customer' })
    protected queryFeature!: QueryFeature;

    @XInject('queriesPreviewInfo')
    public queriesPreviewInfo!: QueryPreviewInfo[];

    getEvent(query: string): Partial<XEventsTypes> {
      return {
        UserAcceptedAQuery: query
      };
    }
  }
</script>
