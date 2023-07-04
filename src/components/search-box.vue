<template>
  <div class="x-input-group x-input-group-lead x-rounded-sm">
    <SearchInput
      :autofocus="false"
      :placeholder="$t('searchBox.placeholder')"
      :instant="true"
      class="desktop:x-pl-24"
    />

    <ClearSearchInput
      v-if="isDesktopOrGreater && $x.query.searchBox"
      class="x-input-group-button x-input-group-button-rectangle"
    >
      {{ $t('searchBox.clear') }}
    </ClearSearchInput>

    <SearchButton
      v-if="isDesktopOrGreater || !$x.query.searchBox"
      class="x-input-group-button-primary"
    >
      <SearchIcon class="x-icon-lg" />
    </SearchButton>

    <ClearSearchInput v-else class="x-input-group-button-primary">
      <CrossTinyIcon class="x-icon-lg" />
    </ClearSearchInput>
  </div>
</template>

<script lang="ts">
  import { ClearSearchInput, SearchButton, SearchInput } from '@empathyco/x-components/search-box';
  import { CrossTinyIcon, SearchIcon } from '@empathyco/x-components';
  import { defineComponent } from 'vue';
  import { useDevice } from '../composables/use-device.composable';

  export default defineComponent({
    components: {
      ClearSearchInput,
      CrossTinyIcon,
      SearchButton,
      SearchInput,
      SearchIcon
    },
    setup() {
      const { isDesktopOrGreater } = useDevice();
      return {
        isDesktopOrGreater
      };
    }
  });
</script>
