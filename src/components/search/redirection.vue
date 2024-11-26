<template>
  <RedirectionComponent
    v-slot="{ redirection, redirect, abortRedirect, isRedirecting, delayInSeconds }"
    class="x-my-8 x-flex x-flex-col x-items-center x-gap-8 x-bg-neutral-10 x-p-24 x-text-center"
    :delay-in-seconds="5"
  >
    <p>
      {{ $t('redirections.title') }}
    </p>
    <a :href="redirection.url">{{ redirection.url }}</a>
    <div class="x-mt-8 x-flex x-gap-32">
      <button class="x-button x-button-ghost" @click="abortRedirect">
        {{ $t('redirections.reject') }}
      </button>
      <button class="x-button x-button-lead x-button-ghost" @click="redirect">
        {{ $t('redirections.accept') }}
      </button>
    </div>
    <AutoProgressBar
      :is-loading="isRedirecting"
      :duration-in-seconds="delayInSeconds"
      class="x-w-320"
    />
  </RedirectionComponent>
</template>

<script lang="ts">
  import { AutoProgressBar } from '@empathyco/x-components';
  import { Redirection as RedirectionComponent } from '@empathyco/x-components/search';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Redirection',
    components: {
      AutoProgressBar,
      RedirectionComponent
    }
  });
</script>
