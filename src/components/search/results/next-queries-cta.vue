<template>
  <NoElement>
    <slot></slot>
  </NoElement>
</template>
<script lang="ts">
  import { computed, ComputedRef, defineComponent, inject, provide, ref, Ref } from 'vue';
  import {
    groupItemsBy,
    LIST_ITEMS_KEY,
    ListItem,
    NoElement,
    use$x,
    useGetter
  } from '@empathyco/x-components';
  import { Result, NextQuery } from '@empathyco/x-types';
  import { NextQueriesGroup } from '@empathyco/x-components/types/x-modules/next-queries/types';

  export default defineComponent({
    name: 'NextQueriesCta',
    components: { NoElement },
    setup() {
      const $x = use$x();

      const injectedListItems = inject<Ref<ListItem[]>>(LIST_ITEMS_KEY as string);

      const position = ref(0);

      const lastPosition = ref(0);

      const nextQueries: ComputedRef<NextQuery[]> = useGetter('nextQueries', [
        'nextQueries'
      ]).nextQueries;

      const nextQueriesGroups = computed<NextQueriesGroup[]>(() =>
        Object.values(groupItemsBy(nextQueries?.value, (_, index) => Math.floor(index / 4)))
          .slice(0, 2)
          .map(nextQueries => ({
            modelName: 'NextQueriesGroup' as const,
            id: nextQueries.map(nextQuery => nextQuery.query).join(','),
            nextQueries
          }))
      );

      const items = computed(() => {
        const items = injectedListItems?.value;
        if (position.value > 0) {
          items?.splice(position.value, 0, nextQueriesGroups.value[0]);
        }
        return items;
      });

      $x.on('UserClickedResultAddToCart', true).subscribe(payload => {
        if (lastPosition.value) {
          injectedListItems?.value.splice(lastPosition.value, 1);
        }
        const index = injectedListItems?.value.findIndex(element => {
          return element.id === (payload.eventPayload as Result).id;
        });
        position.value = index ? index + 1 : 0;
        lastPosition.value = position.value;
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
