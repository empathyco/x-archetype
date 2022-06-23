<template>
  <BaseIdModalOpen modalId="aside-modal" class="x-button x-button--pill">
    <FiltersIcon />
    <span>{{ $t('toggleAside.showAside') }}</span>
    <span
      v-if="$x.selectedFilters.length > 0"
      class="
        x-background--neutral-100
        x-font-color--neutral-10
        x-border-radius--20
        x-padding--01 x-padding--right-03 x-padding--left-03
      "
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
