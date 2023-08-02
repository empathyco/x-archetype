<template>
  <div class="x-input-group x-input-group-lead x-rounded-sm">
    <SearchInput
      @input.prevent="resetExtraParams"
      :autofocus="false"
      :placeholder="$t('searchBox.placeholder')"
      :instant="true"
      class="desktop:x-pl-24"
    />

    <ClearSearchInput
      v-if="isDesktopOrGreater && $x.query.searchBox"
      @UserPressedClearSearchBoxButton="resetExtraParams"
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

    <ClearSearchInput
      v-else
      @UserPressedClearSearchBoxButton="resetExtraParams"
      class="x-input-group-button-primary"
    >
      <CrossTinyIcon class="x-icon-lg" />
    </ClearSearchInput>
  </div>
</template>

<script lang="ts">
  import { ClearSearchInput, SearchButton, SearchInput } from '@empathyco/x-components/search-box';
  import {
    CrossTinyIcon,
    SearchIcon,
    SnippetConfig,
    use$x,
    XEventsTypes
  } from '@empathyco/x-components';
  import { defineComponent, inject } from 'vue';
  import { Dictionary } from '@empathyco/x-utils';
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
      const $x = use$x();
      const snippetConfig: SnippetConfig = inject('snippetConfig') as SnippetConfig;
      const extraParamsToInclude = ['device', 'env', 'instance', 'lang', 'en', 'scope', 'scroll'];
      let initialParams: Dictionary = {};

      const resetExtraParams = (): XEventsTypes | void => {
        console.log('delete');
        console.log(snippetConfig);

        for (const k of Object.keys(snippetConfig)) {
          if (extraParamsToInclude.includes(k)) {
            initialParams[k] = snippetConfig[k];
          }
        }
        console.log(initialParams);
        return $x.emit('UserChangedExtraParams', { ...initialParams });
      };

      return {
        isDesktopOrGreater,
        resetExtraParams
      };
    }
  });
</script>
