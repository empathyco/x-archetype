<template>
  <NoElement>
    <slot></slot>
  </NoElement>
</template>
<script lang="ts">
  import { computed, defineComponent, inject, provide, ref, Ref } from 'vue';
  import { LIST_ITEMS_KEY, ListItem, NoElement, use$x } from '@empathyco/x-components';

  export default defineComponent({
    components: { NoElement },
    setup() {
      const $x = use$x();
      const injectedListItems = inject<Ref<ListItem[]>>(LIST_ITEMS_KEY as string);
      const position = ref(0);
      const items = computed(() => {
        const items = injectedListItems?.value;
        if (position.value > 0) {
          items?.splice(position.value, 0, {
            id: new Date().getTime(),
            modelName: 'NextQuery'
          });
        }

        return items;
      });

      $x.on('UserClickedResultAddToCart', true).subscribe(({ eventPayload }) => {
        const index = injectedListItems?.value.findIndex(element => {
          return element.id === eventPayload.id;
        });
        position.value = index + 1 ?? 0;
      });
      provide(LIST_ITEMS_KEY as string, items);
    }
  });
</script>
<style>
  .x-base-grid__next-query {
    grid-column: 1 / -1;
  }
</style>
