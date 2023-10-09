<template>
  <Spellcheck v-if="$x.totalResults > 0" #default="{ query }" class="x-message desktop:x-flex-col">
    <p>
      <i18n class="x-text1 desktop:x-text1-lg" path="spellcheck.message">
        <template #query>
          <span class="x-w-auto x-font-bold">"{{ query }}".</span>
          <div v-if="isTabletOrLess" class="x-basis-full"></div>
        </template>
      </i18n>
      <SpellcheckButton
        class="x-button-lead x-button-link x-button x-text1 x-pl-2 x-font-bold desktop:x-text1-lg"
      />
    </p>
  </Spellcheck>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Spellcheck, SpellcheckButton } from '@empathyco/x-components/search';
  import { useDevice } from '../../composables/use-device.composable';

  @Component({
    components: {
      Spellcheck,
      SpellcheckButton
    }
  })
  export default class SpellcheckMessage extends Vue {
    protected get isTabletOrLess(): boolean {
      return useDevice().isTabletOrLess.value;
    }
  }
</script>
