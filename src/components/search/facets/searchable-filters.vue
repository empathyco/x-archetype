<template>
  <FiltersSearch :filters="filters">
    <SlicedFilters :max="8">
      <FiltersList v-slot="{ filter }" :animation="staggeredFadeAndSlide">
        <SimpleFilter :filter="filter" />
      </FiltersList>
    </SlicedFilters>
  </FiltersSearch>
</template>

<script setup lang="ts">
import type { Filter } from '@empathyco/x-types'
import { StaggeredFadeAndSlide } from '@empathyco/x-components'
import {
  FiltersList,
  FiltersSearch,
  SimpleFilter,
  SlicedFilters,
} from '@empathyco/x-components/facets'

defineProps<{
  filters?: Filter[]
}>()

const staggeredFadeAndSlide = StaggeredFadeAndSlide
</script>
