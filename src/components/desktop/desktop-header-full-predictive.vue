<template>
  <div class="x-relative x-pb-24">
    <div class="desktop-width-item">
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
    </div>

    <LocationProvider location="predictive_layer">
      <FullWidthPredictive />
    </LocationProvider>

    <div class="desktop-width-item">
      <div
        class="x-layout-container x-layout-container-ml-[calc(142px+48px)] x-layout-container-mr-[calc(40px+48px)]"
      >
        <div class="x-layout-item">
          <LocationProvider location="predictive_layer">
            <RelatedTags v-if="$x.relatedTags.length > 0" class="x-pt-8" />
          </LocationProvider>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { CloseMainModal, CrossIcon, LocationProvider } from '@empathyco/x-components';
  import { defineComponent } from 'vue';
  import RelatedTags from '../search/related-tags.vue';
  import SearchBox from '../search-box.vue';
  import Logo from '../logo.vue';
  import FullWidthPredictive from '../predictive-layer/full-width-predictive.vue';

  export default defineComponent({
    components: {
      FullWidthPredictive,
      CloseMainModal,
      CrossIcon,
      Logo,
      SearchBox,
      RelatedTags,
      LocationProvider
    }
  });
</script>
