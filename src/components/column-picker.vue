<template>
  <div class="x-list x-list--horizontal x-list--align-center x-list--gap-03">
    <span class="x-uppercase x-title4">{{ $t('columnPicker.message') }}</span>

    <!-- TODO: Remove the x-max-h and the tailwind important when removing the old DS styles -->
    <BaseColumnPickerList
      v-slot="{ column, isSelected }"
      :columns="valuesAndIcons.values"
      buttonClass="!x-button-sm x-button-lead x-button-square x-button-ghost x-max-h-32"
    >
      <component
        :is="valuesAndIcons.icons[column]"
        class="x-icon-lg"
        :class="isSelected ? 'x-text-neutral-90' : 'x-text-neutral-25'"
      />
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

  export default defineComponent({
    components: {
      BaseColumnPickerList,
      Grid1ColIcon,
      Grid2ColIcon,
      Grid4ColIcon
    },
    setup() {
      const { isMobile } = useDevice();
      const valuesAndIcons = computed(() =>
        isMobile.value
          ? { values: [2, 1], icons: { 2: 'Grid2ColIcon', 1: 'Grid1ColIcon' } }
          : { values: [4, 2], icons: { 4: 'Grid4ColIcon', 2: 'Grid2ColIcon' } }
      );

      return {
        valuesAndIcons
      };
    }
  });
</script>
