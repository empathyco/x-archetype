<template>
  <Orchestrator v-if="start" />
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
  export default class App extends Vue {
    protected start = false;

    protected mounted(): void {
      setTimeout(() => {
        this.start = true;
      }, 0);
    }
  }
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
