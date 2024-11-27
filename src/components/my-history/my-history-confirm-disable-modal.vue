<template>
  <BaseEventsModal
    class="x-my-history-confirm-disable-modal x-z-10"
    :events-to-open-modal="eventsToOpenModal"
    :events-to-close-modal="eventsToCloseModal"
    @focusin.stop
  >
    <div
      class="x-my-history-confirm-disable-modal-content x-flex x-max-w-[322px] x-flex-col x-gap-16 x-bg-neutral-0 x-text-center"
      :class="isTabletOrLess ? 'x-rounded-lg x-p-24 x-pb-8' : 'x-p-56'"
    >
      <h1 class="x-title3">{{ $t('myHistory.confirmDisableModal.title') }}</h1>
      <span class="x-text1 x-text-neutral-75">
        {{ $t('myHistory.confirmDisableModal.message') }}
      </span>
      <div class="x-flex x-justify-end x-gap-24 desktop:x-justify-center">
        <BaseEventButton
          class="x-button x-button-lead x-button-outlined x-rounded-full"
          :events="dismissEvents"
        >
          {{ $t('myHistory.confirmDisableModal.dismiss') }}
        </BaseEventButton>
        <BaseEventButton class="x-button x-button-lead x-rounded-full" :events="confirmEvents">
          {{ $t('myHistory.confirmDisableModal.confirm') }}
        </BaseEventButton>
      </div>
    </div>
  </BaseEventsModal>
</template>

<script lang="ts">
import { BaseEventButton, BaseEventsModal } from '@empathyco/x-components'
import { defineComponent } from 'vue'
import { useDevice } from '../../composables/use-device.composable'

export default defineComponent({
  components: {
    BaseEventsModal,
    BaseEventButton,
  },
  setup() {
    const { isTabletOrLess } = useDevice()
    return {
      isTabletOrLess,
      eventsToOpenModal: ['UserClickedDisableHistoryQueries'],
      eventsToCloseModal: [
        'UserClickedConfirmDisableHistoryQueries',
        'UserClickedDismissDisableHistoryQueries',
      ],
      dismissEvents: { UserClickedDismissDisableHistoryQueries: undefined },
      confirmEvents: { UserClickedConfirmDisableHistoryQueries: undefined },
    }
  },
})
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
