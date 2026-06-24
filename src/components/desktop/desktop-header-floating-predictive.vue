<template>
  <div
    class="xds:layout-item xds:pb-8 xds:layout-max-width-md xds:desktop:layout-min-margin-32 xds:large:layout-max-width-lg xds:large:layout-min-margin-48"
    :class="ui('header')?.root"
  >
    <header
      class="xds:grid xds:grid-cols-6 xds:items-center xds:gap-12 xds:pt-24"
      :class="ui('header')?.content"
    >
      <BrandLogo :class="ui('header')?.logo" />

      <div class="xds:col-span-4 xds:flex xds:flex-col xds:gap-16">
        <div class="xds:relative">
          <SearchBox />
          <LocationProvider location="predictive_layer">
            <PredictiveLayer class="xds:absolute xds:shadow-lg" />
          </LocationProvider>
        </div>
      </div>

      <div class="xds:flex xds:flex-1 xds:justify-self-end xds:text-neutral-100 xds:desktop:gap-32">
        <CartCount :class="ui('header')?.cartCount" />

        <CloseMainModal
          class="xds:button-circle xds:button-ghost"
          :class="ui('header')?.closeModal"
        >
          <CrossIcon class="xds:icon-lg" />
        </CloseMainModal>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { CloseMainModal, CrossIcon, LocationProvider } from '@empathyco/x-components'
import { useInstanceExtensions } from '../../composables/use-instance-extensions.composable'
import CartCount from '../add2cart/cart-count.vue'
import BrandLogo from '../brand-logo.vue'
import PredictiveLayer from '../predictive-layer/predictive-layer.vue'
import SearchBox from '../search-box.vue'

const { ui } = useInstanceExtensions()
</script>
