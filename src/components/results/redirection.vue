<template>
  <RedirectionComponent
    v-if="hasQuery"
    #default="{ redirection, redirect, abortRedirect, isRedirecting, delayInSeconds }"
    class="x-margin--top-03 x-margin--bottom-03"
    delayInSeconds="5"
  >
    <p>
      Your search matches a special place in our website, to visit it, your are being redirected
    </p>
    <a :href="redirection.url">{{ redirection.url }}</a>
    <div class="x-list x-list--horizontal x-list--gap-07 x-margin--top-03">
      <button @click="abortRedirect" class="x-button x-button--ghost x-font-color--neutral-70">
        No, I'll stay here
      </button>
      <button @click="redirect" class="x-button x-button--ghost x-font-color--neutral-10">
        Yes, redirect me
      </button>
    </div>
    <AutoProgressBar :isLoading="isRedirecting" :durationInSeconds="delayInSeconds" />
  </RedirectionComponent>
</template>

<script lang="ts">
  import { AutoProgressBar } from '@empathyco/x-components';
  import { Component } from 'vue-property-decorator';
  import HasQueryMixin from '../has-query.mixin.vue';

  @Component({
    components: {
      AutoProgressBar,
      RedirectionComponent: () => import('../search-has-query.components').then(m => m.Redirection)
    }
  })
  export default class Redirection extends HasQueryMixin {}
</script>

<style scoped lang="scss"></style>
