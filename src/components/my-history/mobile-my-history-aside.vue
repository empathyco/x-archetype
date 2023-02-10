<template>
  <div class="x-background--neutral-100 x-list__item--expand x-list x-list--vertical">
    <div class="x-list x-list--align-stretch x-border-color--neutral-10 x-background--neutral-10">
      <div class="x-list x-list--horizontal x-list--align-center x-padding--05">
        <BaseIdModalClose
          class="x-border-width--00 x-padding--00 x-padding--right-05 x-button-circle x-button-ghost hover:x-button-lead"
          modalId="my-history-aside"
        >
          <ArrowLeftIcon class="x-icon-lg x-text-neutral-0" />
        </BaseIdModalClose>
        <h1 class="x-margin--right-auto x-title2 x-title2-sm x-text-neutral-0">
          {{ $t('myHistory.title') }}
        </h1>
      </div>
    </div>
    <CustomMyHistory class="x-scroll x-list x-list__item--expand" />
  </div>
</template>

<script lang="ts">
  import { ArrowLeftIcon, BaseIdModalClose } from '@empathyco/x-components';
  import { Component, Vue } from 'vue-property-decorator';
  import CustomMyHistory from './custom-my-history.vue';

  @Component({
    components: {
      ArrowLeftIcon,
      BaseIdModalClose,
      CustomMyHistory
    }
  })
  export default class MobileMyHistoryAside extends Vue {}
</script>

<style lang="scss" scoped>
  .x-button {
    --x-size-height-button-default: auto;
  }
</style>
