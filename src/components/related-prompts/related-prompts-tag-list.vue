<template>
  <CustomSlidingPanel
    :reset-on-content-change="true"
    :scroll-container-class="
      selectedIndex === -1 ? 'desktop:x-sliding-panel-fade desktop:x-sliding-panel-fade-sm' : ''
    "
  >
    <div
      ref="slidingPanelContent"
      class="x-flex x-gap-8 x-font-main desktop:x-mx-0 desktop:x-mb-0"
      :class="{ 'x-w-[calc(100%)]': selectedIndex !== -1 }"
    >
      <div
        v-for="(suggestion, index) in relatedPrompts"
        :key="index"
        :style="{ animationDelay: `${index * 0.4 + 0.05}s` }"
        class="x-text-neutral-80 x-flex x-flex-col x-rounded-[12px] x-bg-neutral-10 x-text-md x-font-[400] x-transition-all x-duration-500 x-staggered-initial"
        :class="[
          { 'x-staggered-animation': isVisible },
          { 'x-hidden': shouldHideButton(index) },
          isSelected(index)
            ? 'x-w-full x-rounded-b-none'
            : 'x-min-h-[112px] x-h-full x-w-[204px] desktop:x-w-[303px]',
        ]"
        data-test="related-prompt-item"
      >
        <!-- Suggestion -->
        <button
          class="x-flex x-flex-row x-items-start x-justify-between x-gap-12 x-p-16 x-text-start x-transition-all x-duration-500"
          :class="[isSelected(index) ? 'x-w-full' : 'x-w-[204px] x-grow desktop:x-w-[303px]']"
          @click="toggleSuggestion(index)"
        >
          <div class="x-flex x-min-h-[32px]">
            <span
              class="x-typewritter-initial"
              :class="[{ 'x-typewritter-animation': isVisible }]"
              :style="{
                animationDelay: `${index * 0.4 + 0.05}s`,
                '--suggestion-text-length': suggestion.suggestionText.length,
              }"
            >
              {{ suggestion.suggestionText }}
            </span>
          </div>
          <CrossTinyIcon v-if="isSelected(index)" class="x-icon-lg" />
          <PlusIcon v-else class="x-icon-neutral-80 x-icon-lg" />
        </button>
      </div>
    </div>
  </CustomSlidingPanel>
</template>
<script lang="ts">
import { CrossTinyIcon, PlusIcon, use$x, useState } from '@empathyco/x-components'
import { relatedPromptsXModule } from '@empathyco/x-components/related-prompts'
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import CustomSlidingPanel from '../../components/custom-sliding-panel.vue'
import { useDevice } from '../../composables/use-device.composable'

export default defineComponent({
  name: 'RelatedPromptsTagList',
  xModule: relatedPromptsXModule.name,
  components: { PlusIcon, CrossTinyIcon, CustomSlidingPanel },
  setup() {
    const x = use$x()
    const { isTouchable } = useDevice()
    const { relatedPrompts } = useState('relatedPrompts', ['relatedPrompts'])

    const slidingPanelContent = ref<Element>()
    const isVisible = ref(false)

    const selectedIndex = ref<number>(-1)

    const observer = new IntersectionObserver(([entry]) => {
      isVisible.value = entry.isIntersecting
    })

    onMounted(() => {
      observer.observe(slidingPanelContent.value as Element)
    })

    onUnmounted(() => {
      observer.disconnect()
    })

    const toggleSuggestion = (index: number): void => {
      if (selectedIndex.value === index) {
        selectedIndex.value = -1
      } else {
        selectedIndex.value = index
      }
      x.emit('UserSelectedARelatedPrompt', selectedIndex.value)
    }

    const isSelected = (index: number): boolean => selectedIndex.value === index

    const shouldHideButton = (index: number): boolean =>
      selectedIndex.value !== -1 && selectedIndex.value !== index

    x.on('UserAcceptedAQueryPreview', false).subscribe(() => {
      toggleSuggestion(-1)
    })

    x.on('SearchRequestChanged', false).subscribe(() => {
      toggleSuggestion(-1)
    })

    return {
      isSelected,
      isTouchable,
      isVisible,
      relatedPrompts,
      selectedIndex,
      shouldHideButton,
      slidingPanelContent,
      toggleSuggestion,
    }
  },
})
</script>

<style>
.x-no-scrollbar::-webkit-scrollbar {
  display: none;
}

.x-no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.x-typewritter-initial {
  color: #0000;
  background:
    linear-gradient(-90deg, transparent 5px, #0000 0) 10px 0,
    linear-gradient(#575757 0 0) 0 0;
  background-size: 0 200%;
  -webkit-background-clip: padding-box, text;
  background-clip: padding-box, text;
  background-repeat: no-repeat;
}

.x-typewritter-animation {
  animation: typewritter calc(var(--suggestion-text-length) * 0.05s)
    steps(var(--suggestion-text-length)) forwards;
}

@keyframes typewritter {
  from {
    background-size: 0 200%;
  }
  to {
    background-size: calc(var(--suggestion-text-length) * 1ch) 200%;
  }
}

.x-staggered-initial {
  opacity: 0;
  transform: translateY(20px);
}

.x-staggered-animation {
  animation: fadeInUp 0.6s forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
