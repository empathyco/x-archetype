<template>
  <RenderlessExtraParams #default="{ value, updateValue }" name="env" :defaultValue="defaultValue">
    <BaseDropdown
      @change="selectedValue => updateConfig(selectedValue, updateValue)"
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
    CollapseFromTop,
    SnippetConfig
  } from '@empathyco/x-components';
  import { RenderlessExtraParams } from '@empathyco/x-components/extra-params';
  import Vue from 'vue';
  import { Component, Inject } from 'vue-property-decorator';
  import { adapter } from '../adapter/adapter';

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
    protected defaultValue = 'staging';

    @Inject('snippetConfig')
    protected snippetConfig!: SnippetConfig;

    beforeMount(): void {
      this.defaultValue = this.snippetConfig.env ?? this.defaultValue;
    }

    protected updateConfig(
      selectedValue: 'staging' | 'test' | undefined,
      updateValue: (value: unknown) => void
    ): void {
      updateValue(selectedValue);
      adapter.setConfig({
        env: selectedValue
      });
    }
  }
</script>
