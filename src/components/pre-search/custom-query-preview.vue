<template>
  <div v-if="!$x.query.searchBox && queriesPreviewInfo">
    <QueryPreview
      v-for="{ query, title } in queriesPreviewInfo"
      :key="query"
      :query="query"
      :queryFeature="queryFeature"
      #default="{ results, totalResults }"
    >
      <div
        class="x-list"
        :class="
          $x.device === 'mobile'
            ? 'x-list--gap-01 x-margin--bottom-08'
            : 'x-list--gap-05 x-margin--bottom-11'
        "
      >
        <div :class="{ 'x-padding--left-05 x-padding--right-05': $x.device === 'mobile' }">
          <h1 class="x-title1" :class="{ 'x-title1-sm': $x.device === 'mobile' }">{{ title }}</h1>
        </div>

        <CustomSlidingPanel>
          <template #header>
            <component
              :is="results.length < totalResults ? slidingPanelHeaderComponent : 'div'"
              :events="getEvent(query)"
              :class="
                results.length < totalResults
                  ? 'x-button x-button-tight'
                  : 'x-text1-md x-py-8 x-font-bold'
              "
            >
              {{ query }}
              ({{ totalResults }})
              <ArrowRightIcon v-if="results.length < totalResults" class="x-icon-lg" />
            </component>
          </template>
          <ItemsList :items="results" class="x-flex x-gap-16 x-pt-16">
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
    public slidingPanelHeaderComponent = BaseEventButton;

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
