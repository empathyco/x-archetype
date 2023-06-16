<template>
  <QueryPreviewList
    v-if="!$x.query.searchBox && queriesPreviewInfo"
    :debounceTimeMs="250"
    :queries="queries"
    #default="{ query, totalResults, results }"
  >
    <div class="x-mb-40 x-flex x-flex-col x-gap-2 desktop:x-mb-64 desktop:x-gap-16">
      <h1 class="x-title1 max-desktop:x-title1-sm max-desktop:x-px-16">
        {{ getTitle(query) }}
      </h1>
      <CustomSlidingPanel>
        <template #header>
          <BaseEventButton
            :events="getEvent(query)"
            class="x-button-neutral x-button-tight x-button max-desktop:x-px-16"
          >
            {{ query }}
            ({{ totalResults }})
            <ArrowRightIcon class="x-icon-lg" />
          </BaseEventButton>
        </template>
        <DisplayClickProvider resultFeature="brand_recommendations">
          <div class="x-flex x-gap-16 x-pt-16 max-desktop:x-px-16">
            <Result
              v-for="result in results"
              :key="result.id"
              :result="result"
              class="x-w-[calc(38vw-16px)] desktop:x-w-[216px]"
            />
          </div>
        </DisplayClickProvider>
      </CustomSlidingPanel>
    </div>
  </QueryPreviewList>
</template>

<script lang="ts">
  import { Prop, Component, Vue } from 'vue-property-decorator';
  import { QueryPreview, QueryPreviewList } from '@empathyco/x-components/queries-preview';
  import {
    BaseEventButton,
    QueryFeature,
    QueryPreviewInfo,
    XEventsTypes,
    XInject,
    ItemsList,
    ArrowRightIcon
  } from '@empathyco/x-components';
  import { default as Result } from '../results/result.vue';
  import CustomSlidingPanel from '../custom-sliding-panel.vue';
  import DisplayClickProvider from '../search/display-click-provider.vue';

  @Component({
    components: {
      CustomSlidingPanel,
      DisplayClickProvider,
      QueryPreview,
      Result,
      BaseEventButton,
      ItemsList,
      ArrowRightIcon,
      QueryPreviewList
    }
  })
  export default class CustomQueryPreview extends Vue {
    @Prop({ default: 'customer' })
    protected queryFeature!: QueryFeature;

    @XInject('queriesPreviewInfo')
    public queriesPreviewInfo!: QueryPreviewInfo[];

    protected get queries(): string[] {
      return this.queriesPreviewInfo.map(item => item.query);
    }

    protected getTitle(query: string): string {
      return this.queriesPreviewInfo.find(item => item.query === query)?.title ?? '';
    }

    protected getEvent(query: string): Partial<XEventsTypes> {
      return {
        UserAcceptedAQuery: query
      };
    }
  }
</script>
