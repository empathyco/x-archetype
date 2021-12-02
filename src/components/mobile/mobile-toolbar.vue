<template>
  <div
    class="x-list x-list--horizontal x-list--align-center x-list--padding-03 x-list__item--expand"
  >
    <span v-if="$x.totalResults" class="x-list__item--expand">
      {{ $t('totalResults.message', { totalResults: $x.totalResults }) }}
    </span>

    <EnvSelector />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EnvSelector from '../env-selector.vue';

  @Component({
    components: {
      EnvSelector
    }
  })
  export default class MobileToolbar extends Vue {}
</script>
