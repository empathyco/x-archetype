<template>
  <MaxDesktopWidthItem class="x-pb-8">
    <header class="x-grid x-grid-cols-6 x-items-center x-gap-12 x-pt-24">
      <Logo />

      <div class="x-col-span-4 x-flex x-flex-col x-gap-16">
        <div class="x-relative">
          <SearchBox />
          <LocationProvider location="predictive_layer">
            <PredictiveLayer class="x-absolute x-shadow-lg desktop:x-py-16 desktop:x-pl-16" />
          </LocationProvider>
        </div>
      </div>

      <CloseMainModal class="x-button-lead x-button-circle x-button-ghost x-justify-self-end">
        <CrossIcon class="x-icon-lg" />
      </CloseMainModal>
    </header>
  </MaxDesktopWidthItem>
</template>

<script lang="ts">
  import { CloseMainModal, CrossIcon, LocationProvider } from '@empathyco/x-components';
  import { defineComponent } from 'vue';
  import PredictiveLayer from '../predictive-layer/predictive-layer.vue';
  import SearchBox from '../search-box.vue';
  import Logo from '../logo.vue';
  import MaxDesktopWidthItem from '../max-desktop-width-item.vue';

  export default defineComponent({
    components: {
      MaxDesktopWidthItem,
      CloseMainModal,
      CrossIcon,
      Logo,
      SearchBox,
      PredictiveLayer,
      LocationProvider
    }
  });
</script>
