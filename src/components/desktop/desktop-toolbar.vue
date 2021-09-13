<template>
  <div class="x-list x-list--horizontal x-list--gap-06 x-list--justify-end x-list--align-center">
    <span v-if="$x.totalResults">
      {{ $t('totalResults.message', { totalResults: $x.totalResults }) }}
    </span>

    <ColumnPicker #default="{ column }" :columns="columnsValues">
      <span v-if="column === 0">auto</span>
      <span v-else>{{ column }}</span>
    </ColumnPicker>

    <Sort />
  </div>
</template>

<script lang="ts">
  import { BaseColumnPickerList } from '@empathyco/x-components';
  import { Component, Vue } from 'vue-property-decorator';
  import Sort from '../sort.vue';

  @Component({
    components: {
      Sort,
      ColumnPicker: BaseColumnPickerList
    }
  })
  export default class DesktopToolbar extends Vue {
    public columnsValues: number[] = [4, 6, 0];
  }
</script>
