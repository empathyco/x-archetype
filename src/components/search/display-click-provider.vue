<template>
  <NoElement>
    <slot />
  </NoElement>
</template>

<script lang="ts">
  import { DisplayWireMetadata, NoElement, ResultFeature, use$x } from '@empathyco/x-components';
  import { computed, defineComponent, PropType, provide } from 'vue';
  import { TaggingRequest } from '@empathyco/x-types';

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
        default: false
      },
      queryTagging: {
        type: Object as PropType<TaggingRequest>,
        required: false,
        default: undefined
      }
    },
    setup(props) {
      const $x = use$x();

      const displayClickMetadata = computed<Partial<DisplayWireMetadata>>(() => ({
        displayOriginalQuery: $x.query.search,
        feature: props.resultFeature,
        queryTagging: props.queryTagging
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
