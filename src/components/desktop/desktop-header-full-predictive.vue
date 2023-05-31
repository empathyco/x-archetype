<template>
  <div class="x-relative x-pb-24">
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

    <MaxDesktopWidthItem>
      <DesktopSearchboxAlign class="x-layout-container">
        <div class="x-layout-item">
          <LocationProvider location="predictive_layer">
            <RelatedTags v-if="$x.relatedTags.length > 0" class="x-pt-8" />
          </LocationProvider>
        </div>
      </DesktopSearchboxAlign>
    </MaxDesktopWidthItem>
  </div>
</template>

<script lang="ts">
  import { CloseMainModal, CrossIcon, LocationProvider } from '@empathyco/x-components';
  import { defineComponent } from 'vue';
  import SearchBox from '../search-box.vue';
  import Logo from '../logo.vue';
  import FullWidthPredictive from '../predictive-layer/full-width-predictive.vue';
  import MaxDesktopWidthItem from '../max-desktop-width-item.vue';
  import DesktopSearchboxAlign from './desktop-searchbox-align.vue';

  export default defineComponent({
    components: {
      DesktopSearchboxAlign,
      MaxDesktopWidthItem,
      FullWidthPredictive,
      CloseMainModal,
      CrossIcon,
      Logo,
      SearchBox,
      RelatedTags: () => import('../search').then(m => m.RelatedTags),
      LocationProvider
    }
  });
</script>
