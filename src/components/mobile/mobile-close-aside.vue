<template>
  <BaseIdModalClose modalId="aside-modal" class="x-button x-button--pill">
    <FiltersIcon />
    <span>{{ $t('toggleAside.hideAside') }}</span>
  </BaseIdModalClose>
</template>

<script lang="ts">
  import { BaseIdModalClose, FiltersIcon } from '@empathyco/x-components';
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: { BaseIdModalClose, FiltersIcon }
  })
  export default class MobileCloseAside extends Vue {}
</script>
