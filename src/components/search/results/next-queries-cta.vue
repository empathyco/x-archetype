<script lang="ts">
import type { ListItem } from '@empathyco/x-components'
import type { NextQuery } from '@empathyco/x-types'
import type { ComputedRef, Ref } from 'vue'
import { LIST_ITEMS_KEY, use$x, useGetter } from '@empathyco/x-components'
import { computed, defineComponent, inject, provide, ref } from 'vue'

/**
 * Renderless component that injects list items, adds NextQueries CTA group dynamically
 * based on Add2Cart events, and re-provides the modified items list.
 *
 * This component should be implemented with a defineComponent so it doesn't add any DOM wrapper
 * as the script setup syntax does.
 *
 * @public
 */
export default defineComponent({
  name: 'NextQueriesCta',
  setup(_, { slots }) {
    const x = use$x()

    const position = ref(0)
    const lastPosition = ref(0)

    const injectedListItems = inject<Ref<ListItem[]>>(LIST_ITEMS_KEY as string)

    const nextQueries: ComputedRef<NextQuery[]> = useGetter('nextQueries').nextQueries

    const nextQueriesGroup = computed(() => {
      if (!nextQueries.value.length) {
        return
      }

      return {
        modelName: 'NextQueriesCtaGroup',
        id: nextQueries.value.map(query => query.query).join(','),
        nextQueries: nextQueries.value,
      }
    })

    const items = computed(() => {
      const items = [...(injectedListItems?.value ?? [])]

      if (position.value > 0 && nextQueriesGroup.value) {
        items.splice(position.value, 0, nextQueriesGroup.value)
      }

      return items
    })

    provide(LIST_ITEMS_KEY as string, items)

    const resetState = (): void => {
      position.value = 0
      lastPosition.value = 0
    }

    x.on('UserClickedResultAddToCart', true).subscribe(payload => {
      const itemsCopy = [...items.value]

      if (lastPosition.value) {
        itemsCopy.splice(lastPosition.value, 1)
      }

      const index = itemsCopy.findIndex(element => element.id === payload.eventPayload.id)

      position.value = index > 0 ? index + 1 : 1
      lastPosition.value = position.value
    })

    x.on('UserAcceptedAQuery', true).subscribe(() => {
      resetState()
    })

    x.on('SelectedFiltersChanged', true).subscribe(() => {
      resetState()
    })

    return () => {
      return slots.default?.({ items: items.value })[0]
    }
  },
})
</script>
