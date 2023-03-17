<template>
  <BaseEventsModal
    @focusin.native.stop
    class="x-my-history-confirm-disable-modal x-layout__aside"
    :eventsToOpenModal="eventsToOpenModal"
    :eventsToCloseModal="eventsToCloseModal"
  >
    <div
      class="x-my-history-confirm-disable-modal-content x-background--neutral-100 x-list x-list--gap-05"
      :class="
        isTabletOrLess ? 'x-padding--06 x-padding--bottom-03 x-border-radius--03' : 'x-padding--10'
      "
    >
      <h1 class="x-title3">{{ $t('myHistory.confirmDisableModal.title') }}</h1>
      <span class="x-text1 x-text1-lg x-text-neutral-75">
        {{ $t('myHistory.confirmDisableModal.message') }}
      </span>
      <div
        class="x-list x-list--horizontal"
        :class="isTabletOrLess ? 'x-list--justify-end' : 'x-list--justify-center'"
      >
        <BaseEventButton class="x-button x-button-ghost" :events="dismissEvents">
          {{ $t('myHistory.confirmDisableModal.dismiss') }}
        </BaseEventButton>
        <BaseEventButton class="x-button x-button-lead x-button-ghost" :events="confirmEvents">
          {{ $t('myHistory.confirmDisableModal.confirm') }}
        </BaseEventButton>
      </div>
    </div>
  </BaseEventsModal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BaseEventsModal, BaseEventButton } from '@empathyco/x-components';
  import { useDevice } from '../../composables/use-device.composable';

  export default defineComponent({
    components: {
      BaseEventsModal,
      BaseEventButton
    },
    setup() {
      const { isTabletOrLess } = useDevice();
      return {
        isTabletOrLess,
        eventsToOpenModal: ['UserClickedDisableHistoryQueries'],
        eventsToCloseModal: [
          'UserClickedConfirmDisableHistoryQueries',
          'UserClickedDismissDisableHistoryQueries'
        ],
        dismissEvents: { UserClickedDismissDisableHistoryQueries: undefined },
        confirmEvents: { UserClickedConfirmDisableHistoryQueries: undefined }
      };
    }
  });
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
