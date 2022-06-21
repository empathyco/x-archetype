<template>
  <div class="x-background--neutral-100 x-list__item--expand x-list x-list--vertical">
    <Sort />
    <Facets
      v-if="$x.totalResults > 0"
      class="x-list--gap-06 x-list--padding-05 x-list--padding-top"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component
  export default class DesktopAside extends Vue {}
</script>

<style scoped lang="scss"></style>
