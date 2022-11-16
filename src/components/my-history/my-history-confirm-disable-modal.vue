<template>
  <BaseEventsModal
    @focusin.native.stop
    class="x-my-history-confirm-disable-modal x-layout__aside"
    :eventsToOpenModal="eventsToOpenModal"
    :eventsToCloseModal="eventsToCloseModal"
  >
    <div
      class="
        x-my-history-confirm-disable-modal-content
        x-background--neutral-100
        x-list x-list--gap-05
      "
      :class="
        $x.device === 'mobile'
          ? 'x-padding--06 x-padding--bottom-03 x-border-radius--03'
          : 'x-padding--10'
      "
    >
      <h1 class="x-title3 x-text--bold">{{ $t('myHistory.confirmDisableModal.title') }}</h1>
      <span class="x-font-color--neutral-35">
        {{ $t('myHistory.confirmDisableModal.message') }}
      </span>
      <div
        class="x-list x-list--horizontal"
        :class="$x.device === 'mobile' ? 'x-list--justify-end' : 'x-list--justify-center'"
      >
        <BaseEventButton class="x-button x-button-ghost" :events="dismissEvents">
          {{ $t('myHistory.confirmDisableModal.dismiss') }}
        </BaseEventButton>
        <BaseEventButton class="x-button x-button-ghost x-button-lead" :events="confirmEvents">
          {{ $t('myHistory.confirmDisableModal.confirm') }}
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
  export default class MyHistoryConfirmDisableModal extends Vue {
    protected eventsToOpenModal = ['UserClickedDisableHistoryQueries'];
    protected eventsToCloseModal = [
      'UserClickedConfirmDisableHistoryQueries',
      'UserClickedDismissDisableHistoryQueries'
    ];
    protected dismissEvents = { UserClickedDismissDisableHistoryQueries: undefined };
    protected confirmEvents = { UserClickedConfirmDisableHistoryQueries: undefined };
  }
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
  .x-mobile {
    .x-my-history-confirm-disable-modal-content {
      max-width: 296px;
    }
  }
</style>
