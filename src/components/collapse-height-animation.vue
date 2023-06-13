<template>
  <div
    class="x-collapse-height"
    :class="{
      'x-collapse-height--is-collapsed': isCollapsed
    }"
  >
    <slot />
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      isCollapsed: {
        type: Boolean
      }
    }
  });
</script>

<style lang="scss" scoped>
  .x-collapse-height {
    display: grid;
    grid-template-rows: 1fr;
    overflow: hidden;
    transition: grid-template-rows 0.35s;

    & > * {
      min-height: 0;
      transition: visibility 0.35s;
      visibility: visible;
    }

    &--is-collapsed {
      grid-template-rows: 0fr;
      & > * {
        visibility: hidden;
      }
    }
  }
</style>
