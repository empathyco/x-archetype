<script lang="ts">
  import type { DisplayWireMetadata, ResultFeature} from '@empathyco/x-components';
import type { TaggingRequest } from '@empathyco/x-types';
  import type { PropType} from 'vue';
import { use$x } from '@empathyco/x-components';
  import { computed, defineComponent, provide } from 'vue';

  export default defineComponent({
    name: 'DisplayClickProvider',
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
    setup(props, { slots }) {
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

      return () => slots.default?.()[0] ?? '';
    }
  });
</script>
