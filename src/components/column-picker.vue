<template>
  <div class="x-flex x-items-center x-gap-8">
    <span class="x-title4">{{ $t('columnPicker.message') }}</span>
    <BaseColumnPickerList
      :columns="values"
      buttonClass="x-button-sm x-button-circle x-button-ghost x-text-neutral-90"
    >
      <template #divider>
        <span class="x-button-group-divider x-mx-8 x-text-neutral-25" />
      </template>
      <template #default="{ column }">
        <component :is="icons[column]" class="x-icon-lg" />
      </template>
    </BaseColumnPickerList>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import {
    BaseColumnPickerList,
    Grid1ColIcon,
    Grid2ColIcon,
    Grid4ColIcon
  } from '@empathyco/x-components';
  import { useDevice } from '../composables/use-device.composable';
  import { useXControlsHelpers } from '../composables/use-experience-controls.composable';

  export default defineComponent({
    components: {
      BaseColumnPickerList,
      Grid1ColIcon,
      Grid2ColIcon,
      Grid4ColIcon
    },
    setup() {
      const { isMobile } = useDevice();
      const columns = useXControlsHelpers({
        path: 'layout.columnSelector',
        defaultValue: [4, 2]
      });

      return {
        values: computed(() => (isMobile.value ? [2, 1] : columns)),
        icons: { 1: 'Grid1ColIcon', 2: 'Grid2ColIcon', 4: 'Grid4ColIcon' }
      };
    }
  });
</script>
