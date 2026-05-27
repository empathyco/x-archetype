<template>
  <div class="xds:relative xds:pb-8">
    <div
      class="xds:layout-item xds:layout-max-width-md xds:desktop:layout-min-margin-32 xds:large:layout-max-width-lg xds:large:layout-min-margin-48"
    >
      <header class="xds:flex xds:items-center xds:gap-48 xds:pt-24">
        <BrandLogo />

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
    </div>

    <LocationProvider location="predictive_layer">
      <PredictiveLayer class="xds:absolute xds:shadow-lg" />
    </LocationProvider>
  </div>
</template>

<script setup lang="ts">
import { CloseMainModal, CrossIcon, LocationProvider } from '@empathyco/x-components'
import BrandLogo from '../brand-logo.vue'
import PredictiveLayer from '../predictive-layer/predictive-layer.vue'
import SearchBox from '../search-box.vue'
</script>
