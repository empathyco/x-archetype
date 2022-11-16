<template>
  <div class="x-background--neutral-100 x-list__item--expand x-list x-list--vertical">
    <div class="x-list x-list--align-stretch x-border-color--neutral-10 x-background--neutral-10">
      <div class="x-list x-list--horizontal x-list--align-center x-padding--07">
        <h1 class="x-title2 x-font-color--neutral-100 x-font-weight--bold x-margin--right-auto">
          {{ $t('myHistory.title') }}
        </h1>
        <!-- TODO: Adapt hover color for ghost button when available -->
        <BaseIdModalClose
          class="
            x-button-circle x-button-ghost
            x-padding--top-00 x-padding--bottom-00
            x-border-width--00
            hover:x-button-lead
          "
          modalId="my-history-aside"
        >
          <CrossIcon class="x-icon--l x-font-color--neutral-100" />
        </BaseIdModalClose>
      </div>
    </div>
    <CustomMyHistory class="x-list x-list__item--expand" />
  </div>
</template>

<script lang="ts">
  import { BaseIdModalClose, CrossIcon } from '@empathyco/x-components';
  import { Component, Vue } from 'vue-property-decorator';
  import CustomMyHistory from './custom-my-history.vue';

  @Component({
    components: {
      BaseIdModalClose,
      CrossIcon,
      CustomMyHistory
    }
  })
  export default class DesktopMyHistoryAside extends Vue {
    mounted(): void {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement.classList.contains('x-search-input')) {
        activeElement.blur();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .x-button {
    --x-size-height-button-default: auto;
  }
</style>
