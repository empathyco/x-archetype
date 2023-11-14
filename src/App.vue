<template>
  <Orchestrator />
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import './tailwind/index.css';
  import Orchestrator from './components/orchestrator.vue';

  @Component({
    components: {
      Orchestrator
    }
  })
  export default class App extends Vue {}
</script>

<style lang="scss">
  *:not(.x-keyboard-navigation *) {
    outline: none;
  }

  .x-banner,
  .x-promoted {
    &__title {
      display: none;
    }
  }
</style>
