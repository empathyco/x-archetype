<template>
  <div
    class="xds:layout-item xds:pb-8 xds:layout-max-width-md xds:desktop:layout-min-margin-32 xds:large:layout-max-width-lg xds:large:layout-min-margin-48"
  >
    <header class="xds:grid xds:grid-cols-6 xds:items-center xds:gap-12 xds:pt-24">
      <BrandLogo />

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
  </div>
</template>

<script setup lang="ts">
import { CloseMainModal, CrossIcon, LocationProvider } from '@empathyco/x-components'
import BrandLogo from '../brand-logo.vue'
import PredictiveLayer from '../predictive-layer/predictive-layer.vue'
import SearchBox from '../search-box.vue'
</script>
