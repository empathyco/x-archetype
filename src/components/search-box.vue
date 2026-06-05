<template>
  <div class="xds:input-group xds:input-group-line xds:rounded-sm xds:input-group-lead">
    <SearchIcon class="xds:ml-0! xds:icon-lg" />

    <SearchInput
      ref="searchInputRef"
      :autofocus="false"
      :placeholder="$t('searchBox.placeholder')"
      :instant="!!isDesktopOrGreater"
      class="xds:input xds:desktop:pl-24!"
    />

    <ClearSearchInput
      v-if="isDesktopOrGreater && x.query.searchBox"
      class="xds:input-group-button xds:input-group-button-rectangle xds:hover:bg-neutral-10"
    >
      {{ $t('searchBox.clear') }}
    </ClearSearchInput>

    <ClearSearchInput
      v-if="!isDesktopOrGreater && x.query.searchBox"
      class="xds:input-group-button-primary xds:input-group-button"
    >
      <CrossTinyIcon class="xds:icon-lg" />
    </ClearSearchInput>
  </div>
</template>

<script setup lang="ts">
import { CrossTinyIcon, SearchIcon, use$x } from '@empathyco/x-components'
import { ClearSearchInput, SearchInput } from '@empathyco/x-components/search-box'
import { ref } from 'vue'
import { useDevice } from '../composables/use-device.composable'

const { isDesktopOrGreater } = useDevice()
const x = use$x()
const searchInputRef = ref<InstanceType<typeof SearchInput>>(null as any)
</script>
