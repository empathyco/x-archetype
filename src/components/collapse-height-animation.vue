<template>
  <div
    class="x-collapse-height"
    :class="{
      'x-collapse-height--is-extended': isExtended
    }"
  >
    <slot />
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      isExtended: {
        type: Boolean
      }
    }
  });
</script>

<style lang="scss" scoped>
  .x-collapse-height {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: grid-template-rows 0.35s;

    & > * {
      min-height: 0;
      transition: visibility 0.35s;
      visibility: hidden;
    }

    &--is-extended {
      grid-template-rows: 1fr;
      & > * {
        visibility: visible;
      }
    }
  }
</style>
