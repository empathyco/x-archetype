<template>
  <BaseEventsModal
    class="x-my-history-confirm-disable-modal xds:z-50! xds:items-center! xds:justify-center!"
    :events-to-open-modal="eventsToOpenModal"
    :events-to-close-modal="eventsToCloseModal"
    @focusin.stop
  >
    <div
      class="x-my-history-confirm-disable-modal-content xds:flex xds:max-w-80.5 xds:flex-col xds:gap-16 xds:bg-neutral-0 xds:text-center"
      :class="isTabletOrLess ? 'xds:rounded-lg xds:p-24 xds:pb-8' : 'xds:p-56'"
    >
      <h1 class="xds:title3">{{ $t('myHistory.confirmDisableModal.title') }}</h1>
      <span class="xds:text1 xds:text-neutral-75">
        {{ $t('myHistory.confirmDisableModal.message') }}
      </span>
      <div class="xds:flex xds:justify-end xds:gap-24 xds:desktop:justify-center">
        <BaseEventButton
          class="xds:button xds:button-outlined xds:rounded-full xds:button-lead"
          :events="dismissEvents"
        >
          {{ $t('myHistory.confirmDisableModal.dismiss') }}
        </BaseEventButton>
        <BaseEventButton
          class="xds:button xds:rounded-full xds:button-lead"
          :events="confirmEvents"
        >
          {{ $t('myHistory.confirmDisableModal.confirm') }}
        </BaseEventButton>
      </div>
    </div>
  </BaseEventsModal>
</template>

<script setup lang="ts">
import type { XEventsTypes } from '@empathyco/x-components'
import { BaseEventButton, BaseEventsModal } from '@empathyco/x-components'
import { useDevice } from '../../composables/use-device.composable'

const { isTabletOrLess } = useDevice()
const eventsToOpenModal: (keyof XEventsTypes)[] = ['UserClickedDisableHistoryQueries']
const eventsToCloseModal: (keyof XEventsTypes)[] = [
  'UserClickedConfirmDisableHistoryQueries',
  'UserClickedDismissDisableHistoryQueries',
]
const dismissEvents: Partial<XEventsTypes> = {
  UserClickedDismissDisableHistoryQueries: undefined,
}
const confirmEvents: Partial<XEventsTypes> = {
  UserClickedConfirmDisableHistoryQueries: undefined,
}
</script>

<style>
.x-my-history-confirm-disable-modal {
  &.x-modal .x-modal__content {
    background-color: transparent !important;
    justify-content: center;
    align-items: center;
  }
}
</style>
