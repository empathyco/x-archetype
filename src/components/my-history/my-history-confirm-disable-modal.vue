<template>
  <BaseEventsModal
    @focusin.native.stop
    class="x-my-history-confirm-disable-modal x-z-10"
    :eventsToOpenModal="eventsToOpenModal"
    :eventsToCloseModal="eventsToCloseModal"
  >
    <div
      class="x-my-history-confirm-disable-modal-content x-flex x-max-w-[322px] x-flex-col x-gap-16 x-bg-neutral-0"
      :class="isTabletOrLess ? 'x-rounded-lg x-p-24 x-pb-8' : 'x-p-56'"
    >
      <h1 class="x-title3">{{ $t('myHistory.confirmDisableModal.title') }}</h1>
      <span class="x-text1 x-text1-lg x-text-neutral-75">
        {{ $t('myHistory.confirmDisableModal.message') }}
      </span>
      <div class="x-flex x-justify-end desktop:x-justify-center">
        <BaseEventButton class="x-button-ghost x-button" :events="dismissEvents">
          {{ $t('myHistory.confirmDisableModal.dismiss') }}
        </BaseEventButton>
        <BaseEventButton class="x-button-lead x-button-ghost x-button" :events="confirmEvents">
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
    &.x-modal {
      .x-modal__content {
        background: transparent;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
