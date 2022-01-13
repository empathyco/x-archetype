<template>
  <BaseIdTogglePanelButton
    panelId="aside-panel"
    class="x-button x-button--ghost x-button--ghost-start"
    data-test="toggle-facets-button"
  >
    <template #default="{ isPanelOpen }">
      <FiltersIcon />
      <span v-if="isPanelOpen">{{ $t('toggleAside.hideAside') }}</span>
      <span v-else>{{ $t('toggleAside.showAside') }}</span>
    </template>
  </BaseIdTogglePanelButton>
</template>

<script lang="ts">
  import { BaseIdTogglePanelButton, FiltersIcon } from '@empathyco/x-components';
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: { BaseIdTogglePanelButton, FiltersIcon }
  })
  export default class DesktopToggleAside extends Vue {}
</script>
