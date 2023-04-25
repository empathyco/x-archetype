<template>
  <RedirectionComponent
    #default="{ redirection, redirect, abortRedirect, isRedirecting, delayInSeconds }"
    class="x-my-8 x-flex x-flex-col x-items-center x-gap-8 x-bg-neutral-10 x-p-24 x-text-center"
    delayInSeconds="5"
  >
    <p>
      Your search matches a special place in our website, to visit it, your are being redirected
    </p>
    <a :href="redirection.url">{{ redirection.url }}</a>
    <div class="x-mt-8 x-flex x-gap-32">
      <button @click="abortRedirect" class="x-button-ghost x-button">No, I'll stay here</button>
      <button @click="redirect" class="x-button-lead x-button-ghost x-button">
        Yes, redirect me
      </button>
    </div>
    <AutoProgressBar
      :isLoading="isRedirecting"
      :durationInSeconds="delayInSeconds"
      class="x-w-320"
    />
  </RedirectionComponent>
</template>

<script lang="ts">
  import { AutoProgressBar } from '@empathyco/x-components';
  import { Redirection as RedirectionComponent } from '@empathyco/x-components/search';
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      AutoProgressBar,
      RedirectionComponent
    }
  })
  export default class Redirection extends Vue {}
</script>
