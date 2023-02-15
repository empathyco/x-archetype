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
          <!--          <div class="x-list x-list&#45;&#45;horizontal x-list&#45;&#45;align-center">-->
          <!--            <span class="x-list__item&#45;&#45;expand x-title3">-->
          <!--              {{ query }}-->
          <!--              <span class="x-text1">({{ totalResults }})</span>-->
          <!--            </span>-->
          <!--            <BaseEventButton-->
          <!--              :events="getEvent(query)"-->
          <!--              class="x-button x-button-lead x-button-ghost"-->
          <!--              :class="{ 'x-uppercase': $x.device === 'mobile' }"-->
          <!--            >-->
          <!--              {{ $t('queryPreview.viewResults') }}-->
          <!--              <ChevronRightIcon />-->
          <!--            </BaseEventButton>-->
          <!--          </div>-->
        </div>

        <CustomSlidingPanel
          :results="results"
          resultClass="x-query-preview__item"
          :queryComponent="queryComponent"
          :events="getEvent(query)"
          :totalResults="totalResults"
        >
          <template #header>
            {{ query }}
            ({{ totalResults }})
          </template>
        </CustomSlidingPanel>

        <!--        <SlidingPanel-->
        <!--          :showButtons="$x.device !== 'mobile'"-->
        <!--          :resetOnContentChange="false"-->
        <!--          buttonClass="x-button-lead x-button-circle x-button-ghost x-padding&#45;&#45;00"-->
        <!--          scrollContainerClass="desktop:x-sliding-panel-fade-sm"-->
        <!--          class="x-sliding-panel-show-buttons-on-hover"-->
        <!--        >-->
        <!--          <template #sliding-panel-left-button>-->
        <!--            <ChevronLeftIcon class="x-icon-lg" />-->
        <!--          </template>-->
        <!--          <ul-->
        <!--            class="x-list x-list&#45;&#45;horizontal x-list&#45;&#45;gap-05"-->
        <!--            :class="{ 'x-padding&#45;&#45;left-05 x-padding&#45;&#45;right-05': $x.device === 'mobile' }"-->
        <!--          >-->
        <!--            <li v-for="result in results" :key="result.id">-->
        <!--              <Result :result="result" class="x-query-preview__item" />-->
        <!--            </li>-->
        <!--          </ul>-->
        <!--          <template #sliding-panel-right-button>-->
        <!--            <ChevronRightIcon class="x-icon-lg" />-->
        <!--          </template>-->
        <!--        </SlidingPanel>-->
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
    XInject
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
      ChevronRightIcon
    }
  })
  export default class CustomQueryPreview extends Vue {
    public queryComponent = BaseEventButton;

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

<style lang="scss">
  .x-query-preview__item {
    max-width: 216px;
  }
  .x-mobile {
    .x-query-preview__item {
      max-width: 142px;
    }
  }
</style>
