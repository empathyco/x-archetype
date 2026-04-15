<template>
  <MaxDesktopWidthItem class="xds:pb-8">
    <header class="xds:grid xds:grid-cols-6 xds:items-center xds:gap-12 xds:pt-24">
      <Logo />

      <div class="xds:col-span-4 xds:flex xds:flex-col xds:gap-16">
        <div class="xds:relative">
          <SearchBox />
          <LocationProvider location="predictive_layer">
            <PredictiveLayer class="xds:absolute xds:shadow-lg" />
          </LocationProvider>
        </div>
      </div>

      <CloseMainModal
        class="xds:button-circle xds:button-ghost xds:justify-self-end xds:button-lead"
      >
        <CrossIcon class="xds:icon-lg" />
      </CloseMainModal>
    </header>
  </MaxDesktopWidthItem>
</template>

<script setup lang="ts">
import { CloseMainModal, CrossIcon, LocationProvider } from '@empathyco/x-components'
import Logo from '../logo.vue'
import MaxDesktopWidthItem from '../max-desktop-width-item.vue'
import PredictiveLayer from '../predictive-layer/predictive-layer.vue'
import SearchBox from '../search-box.vue'
</script>
