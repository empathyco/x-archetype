<template>
  <div v-if="!$x.query.searchBox && queriesPreviewInfo">
    <QueryPreview
      v-for="queryPreviewInfo in queriesPreviewInfo"
      :key="queryPreviewInfo.query"
      :query="queryPreviewInfo.query"
      #default="{ results, totalResults }"
    >
      <div class="x-list x-list--gap-03 x-margin--bottom-05">
        <h1>{{ queryPreviewInfo.title }}</h1>
        <div class="x-list x-list--horizontal">
          <h3 class="x-list__item--expand">{{ queryPreviewInfo.query }}({{ totalResults }})</h3>
          <BaseEventButton
            :events="getEvent(queryPreviewInfo.query)"
            class="x-button x-button--ghost x-button--ghost-end"
          >
            {{ $t('queryPreview.viewResults') }}
            <ChevronRightIcon />
          </BaseEventButton>
        </div>
        <SlidingPanel :resetOnContentChange="false" :buttonClass="'x-button--ghost x-padding--00'">
          <template #sliding-panel-left-button>
            <ChevronLeftIcon class="x-icon--l" />
          </template>
          <div class="x-list x-list--gap-05">
            <Result
              v-for="result in results"
              :key="result.id"
              :result="result"
              class="x-query-preview__item"
            />
          </div>
          <template #sliding-panel-right-button>
            <ChevronRightIcon class="x-icon--l" />
          </template>
        </SlidingPanel>
      </div>
    </QueryPreview>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { QueryPreview } from '@empathyco/x-components/queries-preview';
  import {
    BaseEventButton,
    ChevronLeftIcon,
    ChevronRightIcon,
    QueryPreviewInfo,
    SlidingPanel,
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
    @XInject('queriesPreviewInfo')
    public queriesPreviewInfo: QueryPreviewInfo[] | undefined;

    getEvent(query: string): any {
      return {
        UserAcceptedAQuery: query
      };
    }
  }
</script>

<style lang="scss" scoped>
  .x-query-preview__item {
    max-width: 216px;
  }
</style>
