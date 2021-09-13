<template>
  <BaseIdModalOpen modalId="aside-modal" class="x-button x-button--pill">
    <FiltersIcon />
    <span>{{ $t('toggleAside.showAside') }}</span>
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
