<template>
  <div class="x-flex x-flex-auto x-items-center x-gap-4" :class="{ 'x-flex-col': isTabletOrLess }">
    <span class="x-title4">{{ $t('searchModeSelector.searchBy') }}</span>
    <div class="x-flex x-gap-4">
      <button
        @click="selectSearchMode('search')"
        class="x-button x-button-lead x-rounded-full x-font-bold"
        :class="{ 'x-button-outlined': currentSearchMode !== 'search' }"
      >
        {{ $t('searchModeSelector.keyword') }}
      </button>
      <BaseIdModalOpen
        ref="searchModeSelector"
        id="searchModeSelector"
        modal-id="searchModeSelector"
        class="x-button x-button-lead x-rounded-full x-font-bold"
        :class="{ 'x-button-outlined': currentSearchMode !== 'semantics' }"
      >
        <template #opening-element="{ openModal }">
          <Button
            @click="
              selectSearchMode('semantics');
              openModal($event);
            "
            class="x-events-modal-id-open-button x-group x-button"
          >
            {{ $t('searchModeSelector.semantics') }}
            <span v-if="currentSearchMode === 'semantics'">({{ semanticsScoreThreshold }})</span>
            <Sparks
              class="x-icon-lead x-h-[18px] group-hover:x-text-[white]"
              :class="{ 'x-text-[white]': currentSearchMode === 'semantics' }"
            />
            <ChevronDownIcon v-if="currentSearchMode === 'semantics'" />
          </Button>
        </template>
      </BaseIdModalOpen>
    </div>
    <BaseIdModal
      modal-id="searchModeSelector"
      class="search-selector-modal"
      :contentClass="`x-w-[250px] x-h-auto x-m-h-[250px] x-drop-shadow-md x-rounded-lg
      search-selector x-p-32 ${isTabletOrLess ? 'x-m-auto x-mt-0' : ''}`"
      overlayClass="x-bg-transparent"
    >
      <div class="x-flex x-flex-col x-gap-8">
        <h1 class="x-title3 x-font-bold">{{ $t('searchModeSelector.semanticSelectorTitle') }}</h1>
        <p class="x-text-1 x-text-sm x-text-[#9F9F9F]">
          {{ $t('searchModeSelector.semanticSelectorBody') }}
        </p>
        <div class="x-flex x-gap-4">
          <button @click="decreaseScore" class="x-button x-button-lead x-button-circle">
            <MinusIcon />
          </button>
          <input
            v-model="semanticsScoreThreshold"
            @change="emitSemanticsScoreThresholdChangedDebounced(semanticsScoreThreshold)"
            type="number"
            max="1"
            min="0"
            step="0.1"
            aria-label="Type the semantic score threshold"
            class="x-score-input x-input x-w-[70px] x-border-none x-font-bold"
          />
          <button @click="increaseScore" class="x-button x-button-lead x-button-circle">
            <PlusIcon />
          </button>
        </div>
        <p v-if="!isScoreValid" class="x-text-xxs">
          {{ $t('searchModeSelector.semanticScoreError') }}
        </p>
      </div>
    </BaseIdModal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, computed } from 'vue';
  import {
    BaseIdModal,
    BaseIdModalOpen,
    ChevronDownIcon,
    MinusIcon,
    PlusIcon,
    use$x,
    useDebounce,
    useState
  } from '@empathyco/x-components';

  import { useDevice } from '../composables/use-device.composable';
  import Sparks from './sparks.vue';

  type SearchMode = 'search' | 'semantics';

  export default defineComponent({
    components: {
      BaseIdModal,
      BaseIdModalOpen,
      Sparks,
      ChevronDownIcon,
      MinusIcon,
      PlusIcon
    },
    setup() {
      const $x = use$x();
      const { params } = useState('extraParams', ['params']);
      const { isTabletOrLess } = useDevice();

      const semanticsScoreThreshold = ref(0.5);
      const currentSearchMode = computed(() => {
        return params.value.mode ?? 'search';
      });

      const selectSearchMode = (mode: SearchMode): void => {
        if (currentSearchMode.value === mode) {
          return;
        }
        $x.emit('UserChangedExtraParams', { mode });
      };

      const isScoreValid = ref(true);

      const validateInputChange = (): boolean => {
        if (semanticsScoreThreshold.value < 0 || semanticsScoreThreshold.value > 1) {
          isScoreValid.value = false;
          semanticsScoreThreshold.value = 0.5;
          return isScoreValid.value;
        }
        isScoreValid.value = true;
        return isScoreValid.value;
      };

      const emitSemanticsScoreThresholdChanged = (semanticsScoreThreshold: number): void => {
        if (validateInputChange()) {
          $x.emit('UserChangedExtraParams', { semanticsScoreThreshold });
        }
      };
      const emitSemanticsScoreThresholdChangedDebounced = useDebounce(
        (semanticsScoreThreshold: number) =>
          emitSemanticsScoreThresholdChanged(semanticsScoreThreshold),
        200
      );

      const decreaseScore = (): void => {
        if (semanticsScoreThreshold.value === 0) {
          return;
        }
        semanticsScoreThreshold.value = Math.round((semanticsScoreThreshold.value - 0.1) * 10) / 10;
        emitSemanticsScoreThresholdChangedDebounced(semanticsScoreThreshold.value);
      };

      const increaseScore = (): void => {
        if (semanticsScoreThreshold.value === 1) {
          return;
        }
        semanticsScoreThreshold.value = Math.round((semanticsScoreThreshold.value + 0.1) * 10) / 10;
        emitSemanticsScoreThresholdChangedDebounced(semanticsScoreThreshold.value);
      };

      const searchModeSelector = ref<InstanceType<typeof BaseIdModal> | null>(null);
      const marginLeft = ref('0px');

      onMounted(() => {
        const domRect = searchModeSelector.value?.$el.getBoundingClientRect();
        if (domRect) {
          const { left, height, y } = domRect;
          document.documentElement.style.setProperty(
            '--search-mode-selector-top',
            `${height + y}px`
          );
          document.documentElement.style.setProperty('--search-mode-selector-left', `${left}px`);
        }
      });

      return {
        selectSearchMode,
        searchModeSelector,
        marginLeft,
        semanticsScoreThreshold,
        decreaseScore,
        increaseScore,
        currentSearchMode,
        emitSemanticsScoreThresholdChangedDebounced,
        isScoreValid,
        isTabletOrLess
      };
    }
  });
</script>

<style lang="scss">
  .search-selector {
    position: relative;
    margin-left: var(--search-mode-selector-left, 250px);
    top: var(--search-mode-selector-top, 250px);
  }

  input[type='number'].x-score-input::-webkit-inner-spin-button,
  input[type='number'].x-score-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }
</style>
