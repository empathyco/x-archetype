<template>
  <div class="xds:relative xds:pb-8">
    <MaxDesktopWidthItem>
      <header class="xds:flex xds:items-center xds:gap-48 xds:pt-24">
        <Logo />

        <div class="xds:flex xds:flex-1 xds:flex-col xds:gap-16">
          <div class="xds:relative">
            <SearchBox />
          </div>
        </div>

        <CloseMainModal
          class="xds:button-circle xds:button-ghost xds:justify-self-end xds:button-lead"
        >
          <CrossIcon class="xds:icon-lg" />
        </CloseMainModal>
      </header>
    </MaxDesktopWidthItem>

    <LocationProvider location="predictive_layer">
      <PredictiveLayer class="xds:absolute xds:shadow-lg" />
    </LocationProvider>
  </div>
</template>

<script setup lang="ts">
import { CloseMainModal, CrossIcon, LocationProvider } from '@empathyco/x-components'
import Logo from '../logo.vue'
import MaxDesktopWidthItem from '../max-desktop-width-item.vue'
import PredictiveLayer from '../predictive-layer/predictive-layer.vue'
import SearchBox from '../search-box.vue'
</script>
