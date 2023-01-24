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
          <div class="x-list x-list--horizontal x-list--align-center">
            <span class="x-title3 x-list__item--expand">
              {{ query }}
              <span class="x-text1">({{ totalResults }})</span>
            </span>
            <BaseEventButton
              :events="getEvent(query)"
              class="x-button x-button-lead x-button-ghost"
              :class="{ 'x-uppercase': $x.device === 'mobile' }"
            >
              {{ $t('queryPreview.viewResults') }}
              <ChevronRightIcon />
            </BaseEventButton>
          </div>
        </div>
        <SlidingPanel
          :showButtons="$x.device !== 'mobile'"
          :resetOnContentChange="false"
          buttonClass="x-button-lead x-button-circle x-button-ghost x-padding--00"
          :scrollContainerClass="scrollContainerClasses"
          class="x-sliding-panel-show-buttons-on-hover"
        >
          <template #sliding-panel-left-button>
            <ChevronLeftIcon class="x-icon--l" />
          </template>
          <ul
            class="x-flex x-gap-16"
            :class="{ 'x-padding--left-05 x-padding--right-05': $x.device === 'mobile' }"
          >
            <li v-for="result in results" :key="result.id">
              <Result :result="result" class="x-query-preview__item" />
            </li>
          </ul>
          <template #sliding-panel-right-button>
            <ChevronRightIcon class="x-icon--l" />
          </template>
        </SlidingPanel>
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

  @Component({
    components: {
      QueryPreview,
      SlidingPanel,
      Result,
      BaseEventButton,
      ChevronLeftIcon,
      ChevronRightIcon
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

    protected get scrollContainerClasses(): string {
      return this.$x.device !== 'mobile' ? 'x-sliding-panel-fade' : '';
    }
  }
</script>

<style lang="scss" scoped>
  .x-query-preview__item {
    max-width: 216px;
  }
  .x-mobile {
    .x-query-preview__item {
      max-width: 142px;
    }
  }
</style>
