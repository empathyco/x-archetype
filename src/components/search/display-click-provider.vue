<template>
  <NoElement>
    <slot />
  </NoElement>
</template>

<script lang="ts">
  import { DisplayWireMetadata, NoElement, ResultFeature, use$x } from '@empathyco/x-components';
  import { computed, defineComponent, PropType, provide } from 'vue';

  export default defineComponent({
    components: {
      NoElement
    },
    props: {
      resultFeature: {
        type: String as PropType<ResultFeature>,
        required: true
      },
      ignoreResultClickEvent: {
        type: Boolean,
        default: true
      }
    },
    setup(props) {
      const $x = use$x();

      const displayClickMetadata = computed<Partial<DisplayWireMetadata>>(() => ({
        displayOriginalQuery: $x.query.search,
        feature: props.resultFeature
      }));

      provide('resultClickExtraEvents', ['UserClickedADisplayResult']);
      provide('resultLinkMetadataPerEvent', {
        UserClickedADisplayResult: displayClickMetadata.value,
        ...(props.ignoreResultClickEvent && {
          UserClickedAResult: {
            ignoreInModules: ['tagging']
          }
        })
      });
    }
  });
</script>
