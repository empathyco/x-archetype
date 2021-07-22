<template>
  <div>
    <h1>{{ $t('nextQueries.title') }}</h1>
    <NextQueries :animation="nextQueriesAnimation" :max-items-to-render="5" />
  </div>
</template>

<script lang="ts">
  import { FadeAndSlide } from '@empathyco/x-components';
  import { NextQueries } from '@empathyco/x-components/next-queries';
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      NextQueries
    }
  })
  export default class NextQueriesComponent extends Vue {
    public nextQueriesAnimation = FadeAndSlide;
  }
</script>
