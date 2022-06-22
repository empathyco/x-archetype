<template>
  <div class="x-background--neutral-100 x-list__item--expand x-list x-list--vertical">
    <div
      class="
        x-list x-list--horizontal x-list--align-center
        x-border-width--bottom-01
        x-border-color--neutral-10
        x-padding--08 x-padding--top-06 x-padding--bottom-06
      "
    >
      <span class="x-title2 x-font-color--neutral-10 x-font-weight--bold x-margin--right-auto">
        {{ $t('facetsPanel.title') }}
      </span>
      <BaseIdModalClose class="x-button--ghost x-button--ghost-end" modalId="right-aside">
        <CrossIcon class="x-icon--m x-font-color--neutral-10" />
      </BaseIdModalClose>
    </div>
    <div class="x-scroll x-list__item--expand x-padding--08">
      <Sort />
      <Facets
        v-if="$x.totalResults > 0"
        class="x-list--gap-06 x-list--padding-05 x-list--padding-top"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { BaseIdModalClose, CrossIcon } from '@empathyco/x-components';
  import { Component, Vue } from 'vue-property-decorator';
  import Facets from '../search/facets/facets.vue';
  import Sort from '../search/sort.vue';

  @Component({
    components: {
      Facets,
      Sort,
      BaseIdModalClose,
      CrossIcon
    }
  })
  export default class DesktopAside extends Vue {}
</script>

<style scoped></style>
