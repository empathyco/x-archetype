import { defineAsyncComponent } from 'vue'

const EmpathyResult = defineAsyncComponent(async () =>
  import('./instances/empathy-result.vue').then(m => m.default),
)
const PerfumesClubResult = defineAsyncComponent(async () =>
  import('./instances/perfumes-club-result.vue').then(m => m.default),
)

export const componentsMap = {
  empathy: EmpathyResult,
  perfumesclub: PerfumesClubResult,
}
