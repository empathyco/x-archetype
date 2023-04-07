<template>
  <div
    class="x-scroll x-flex x-min-h-0 x-flex-1 x-flex-col x-bg-neutral-0 desktop:x-overflow-hidden"
  >
    <div
      class="x-sticky x-top-0 x-z-10 x-flex x-flex-row x-items-center x-gap-16 x-bg-neutral-90 x-p-16 desktop:x-p-32"
    >
      <BaseIdModalClose
        class="x-button-circle x-button-ghost hover:x-button-lead desktop:x-order-1 desktop:x-ml-auto"
        modalId="my-history-aside"
      >
        <ArrowLeftIcon v-if="isTabletOrLess" class="x-icon-lg x-text-neutral-0" />
        <CrossIcon v-else class="x-icon-lg x-text-neutral-0" />
      </BaseIdModalClose>
      <h1 class="desktop:x-title-md x-title2 x-title2-sm x-text-neutral-0">
        {{ $t('myHistory.title') }}
      </h1>
    </div>

    <div class="x-flex x-justify-end x-bg-neutral-90 x-px-16 desktop:x-justify-center">
      <MyHistoryIcon v-if="$x.isHistoryQueriesEnabled" class="x-w-256" />
      <MyHistoryIconBw v-else class="x-w-256" />
    </div>

    <div
      class="x-flex x-flex-col x-divide-y-1 x-divide-neutral-10 desktop:x-flex-1 desktop:x-overflow-auto desktop:x-scroll"
    >
      <section class="x-flex x-flex-col x-gap-16 x-px-16 x-pt-24 x-pb-32 desktop:x-pl-32">
        <h2 class="x-title3 x-mb-8">{{ $t('myHistory.subtitle') }}</h2>
        <p class="x-text1 x-text1-lg x-text-neutral-75">{{ $t('myHistory.message.header') }}</p>
        <p class="x-text1 x-text1-lg x-text-neutral-75">{{ $t('myHistory.message.body') }}</p>
        <p class="x-title3 x-text-neutral-75">{{ $t('myHistory.message.footer') }}</p>
      </section>

      <section
        class="x-flex x-items-center x-justify-between x-px-16 x-pt-24 x-pb-32 desktop:x-pl-32"
      >
        <div class="x-flex x-flex-col x-gap-4">
          <span class="x-title3">{{ $t('myHistory.switch.title') }}</span>
          <span class="x-text1 x-text1-lg x-text-neutral-75">
            {{
              $x.isHistoryQueriesEnabled
                ? $t('myHistory.switch.disable')
                : $t('myHistory.switch.enable')
            }}
          </span>
        </div>
        <HistoryQueriesSwitch />
      </section>

      <CustomMyHistory />
    </div>
  </div>
</template>

<script lang="ts">
  import { ArrowLeftIcon, BaseIdModalClose, CrossIcon } from '@empathyco/x-components';
  import { HistoryQueriesSwitch } from '@empathyco/x-components/history-queries';
  import { defineComponent, onMounted } from 'vue';
  import { useDevice } from '../../composables/use-device.composable';
  import CustomMyHistory from './custom-my-history.vue';
  import MyHistoryIconBw from './my-history-icon-bw.vue';
  import MyHistoryIcon from './my-history-icon.vue';

  export default defineComponent({
    components: {
      ArrowLeftIcon,
      CrossIcon,
      BaseIdModalClose,
      CustomMyHistory,
      HistoryQueriesSwitch,
      MyHistoryIcon,
      MyHistoryIconBw
    },
    setup() {
      const { isTabletOrLess } = useDevice();
      onMounted(() => {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement.classList.contains('x-search-input')) {
          activeElement.blur();
        }
      });

      return {
        isTabletOrLess
      };
    }
  });
</script>
