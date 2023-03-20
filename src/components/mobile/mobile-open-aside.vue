<template>
  <BaseIdModalOpen
    data-test="toggle-facets-button"
    modalId="aside-modal"
    class="x-border-radius--20 x-padding--04 x-padding--right-05 x-padding--left-05 x-button-lead"
  >
    <FiltersIcon class="x-icon-lg" />
    <span>{{ $t('toggleAside.showAside') }}</span>
    <span
      v-if="$x.selectedFilters.length > 0"
      :class="{ 'x-badge-circle': $x.selectedFilters.length <= 9 }"
      class="x-badge x-badge-lead"
    >
      {{ $x.selectedFilters.length }}
    </span>
  </BaseIdModalOpen>
</template>

<script lang="ts">
  import { BaseIdModalOpen, FiltersIcon } from '@empathyco/x-components';
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: { BaseIdModalOpen, FiltersIcon }
  })
  export default class MobileOpenAside extends Vue {}
</script>
