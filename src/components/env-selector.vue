<template>
  <RenderlessExtraParams #default="{ value, updateValue }" name="env" defaultValue="staging">
    <BaseDropdown
      @change="updateValue"
      class="x-dropdown"
      :value="value"
      :items="catalogs"
      :animation="collapseFromTop"
    >
      <template #toggle>
        <span class="x-text--bold x-text">{{ value }}</span>
        <ChevronTinyDownIcon />
      </template>
      <template #item="{ item, isSelected }">
        <span class="x-text">{{ item }}</span>
        <CheckTinyIcon v-if="isSelected" />
      </template>
    </BaseDropdown>
  </RenderlessExtraParams>
</template>

<script lang="ts">
  import {
    BaseDropdown,
    CheckTinyIcon,
    ChevronTinyDownIcon,
    CollapseFromTop
  } from '@empathyco/x-components';
  import { RenderlessExtraParams } from '@empathyco/x-components/extra-params';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component({
    components: {
      CheckTinyIcon,
      ChevronTinyDownIcon,
      RenderlessExtraParams,
      BaseDropdown
    }
  })
  export default class EnvSelector extends Vue {
    public catalogs: string[] = ['staging', 'test'];
    protected collapseFromTop = CollapseFromTop;
  }
</script>
