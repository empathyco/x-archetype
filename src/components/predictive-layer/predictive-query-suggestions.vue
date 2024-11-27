<template>
  <QuerySuggestions
    :animation="animation"
    :max-items-to-render="5"
    class="x-flex x-flex-col x-gap-8 desktop:x-gap-4"
  >
    <template #suggestion="{ suggestion }">
      <QuerySuggestion
        :suggestion="suggestion"
        class="x-suggestion x-suggestion-lg desktop:x-suggestion-md"
      >
        <template #default="{ query }">
          <SearchIcon class="x-icon-lg desktop:x-icon-md" />
          <Highlight :text="suggestion.query" :highlight="query" />
        </template>
      </QuerySuggestion>
    </template>
  </QuerySuggestions>
</template>

<script lang="ts">
import { AnimationProp, Highlight, SearchIcon } from '@empathyco/x-components'
import { QuerySuggestion, QuerySuggestions } from '@empathyco/x-components/query-suggestions'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    SearchIcon,
    Highlight,
    QuerySuggestions,
    QuerySuggestion,
  },
  props: {
    animation: {
      type: AnimationProp,
      required: true,
    },
  },
})
</script>
<style lang="scss"></style>
