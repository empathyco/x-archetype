<template>
  <BaseIdModalOpen
    modalId="aside-modal"
    class="x-border-radius--20 x-padding--04 x-padding--right-05 x-padding--left-05 x-button-lead"
  >
    <FiltersIcon />
    <span>{{ $t('toggleAside.showAside') }}</span>
    <span
      v-if="$x.selectedFilters.length > 0"
      class="x-background--neutral-100 x-border-radius--20 x-padding--01 x-padding--right-03 x-padding--left-03 x-text-lead-50"
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
