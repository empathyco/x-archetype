<template>
  <BaseEventsModal
    class="x-my-history-confirm-disable-modal x-layout__aside test"
    :eventsToOpenModal="['UserClickedDisableHistoryQueries']"
    :eventsToCloseModal="[
      'UserClickedDismissDisableHistoryQueries',
      'UserClickedConfirmDisableHistoryQueries'
    ]"
  >
    <div
      class="
        x-my-history-confirm-disable-modal-content
        x-background--neutral-100
        x-padding--10
        x-list x-list--gap-05
      "
    >
      <h1 class="x-title3 x-text--bold">Disable History Queries</h1>
      <span>Disabling History Queries you also clear all the history list</span>
      <div class="x-list x-list--horizontal x-list--justify-center">
        <BaseEventButton
          class="x-button x-button--ghost x-font-color--neutral-35"
          :events="{ UserClickedDismissDisableHistoryQueries: undefined }"
        >
          Cancel
        </BaseEventButton>
        <BaseEventButton
          class="x-button x-button--ghost"
          :events="{ UserClickedConfirmDisableHistoryQueries: undefined }"
        >
          Confirm
        </BaseEventButton>
      </div>
    </div>
  </BaseEventsModal>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { BaseEventsModal, BaseEventButton } from '@empathyco/x-components';

  @Component({
    components: {
      BaseEventsModal,
      BaseEventButton
    }
  })
  export default class MyHistoryConfirmDisableModal extends Vue {}
</script>

<style lang="scss">
  .x-my-history-confirm-disable-modal {
    --x-size-width-layout-aside: 100%;
    &-content {
      box-sizing: border-box;
      max-width: 332px;
    }
    .x-modal__content {
      justify-content: center;
      align-items: center;
    }
  }
</style>
