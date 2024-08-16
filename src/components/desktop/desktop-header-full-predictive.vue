<template>
  <div class="x-relative x-pb-8">
    <MaxDesktopWidthItem>
      <header class="x-flex x-items-center x-gap-48 x-pt-24">
        <Logo />

        <div class="x-flex x-flex-1 x-flex-col x-gap-16">
          <div class="x-relative">
            <SearchBox />
          </div>
        </div>

        <CloseMainModal class="x-button-lead x-button-circle x-button-ghost x-justify-self-end">
          <CrossIcon class="x-icon-lg" />
        </CloseMainModal>
      </header>
    </MaxDesktopWidthItem>

    <LocationProvider location="predictive_layer">
      <FullWidthPredictive />
    </LocationProvider>
  </div>
</template>

<script lang="ts">
  import { CloseMainModal, CrossIcon, LocationProvider } from '@empathyco/x-components';
  import { defineComponent } from 'vue';
  import SearchBox from '../search-box.vue';
  import Logo from '../logo.vue';
  import FullWidthPredictive from '../predictive-layer/full-width-predictive.vue';
  import MaxDesktopWidthItem from '../max-desktop-width-item.vue';

  export default defineComponent({
    components: {
      MaxDesktopWidthItem,
      FullWidthPredictive,
      CloseMainModal,
      CrossIcon,
      Logo,
      SearchBox,
      LocationProvider
    }
  });
</script>
