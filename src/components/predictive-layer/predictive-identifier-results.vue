<template>
  <IdentifierResults
    v-slot="{ identifierResult }"
    :maxItemsToRender="5"
    :animation="animation"
    class="x-flex x-flex-col x-gap-8 desktop:x-col-span-12 desktop:x-gap-4"
  >
    <BaseResultLink
      v-slot="{ result }"
      :result="identifierResult"
      class="x-suggestion-lg x-suggestion desktop:x-suggestion-md"
    >
      <BarCodeIcon class="x-icon-lg desktop:x-icon-md" />
      <IdentifierResult :result="result" />
      <span>
        {{ result.name }}
      </span>
    </BaseResultLink>
  </IdentifierResults>
</template>

<script lang="ts">
  import { AnimationProp, BarCodeIcon, BaseResultLink } from '@empathyco/x-components';
  import { IdentifierResult, IdentifierResults } from '@empathyco/x-components/identifier-results';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: {
      BarCodeIcon,
      BaseResultLink,
      IdentifierResults,
      IdentifierResult
    },
    props: {
      animation: {
        type: AnimationProp,
        required: true
      }
    }
  });
</script>
<style lang="scss"></style>
