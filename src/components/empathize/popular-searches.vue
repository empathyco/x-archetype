<template>
  <div>
    <h1>{{ $t('popularSearches.title') }}</h1>
    <PopularSearches :animation="popularSearchesAnimation" :max-items-to-render="5" />
  </div>
</template>

<script lang="ts">
  import { FadeAndSlide } from '@empathyco/x-components';
  import { PopularSearches } from '@empathyco/x-components/popular-searches';
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      PopularSearches
    }
  })
  export default class PopularSearchesComponent extends Vue {
    public popularSearchesAnimation = FadeAndSlide;
  }
</script>
