<script lang="ts">
  import { DisplayWireMetadata, ResultFeature, useAliasApi } from '@empathyco/x-components';
  import { computed, defineComponent, PropType, provide } from 'vue';
  import { TaggingRequest } from '@empathyco/x-types';

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
      const aliasApi = useAliasApi();

      const displayClickMetadata = computed<Partial<DisplayWireMetadata>>(() => ({
        displayOriginalQuery: aliasApi.query.search,
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
