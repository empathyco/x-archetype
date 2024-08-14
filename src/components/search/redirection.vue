<template>
  <RedirectionComponent
    #default="{ redirection, redirect, abortRedirect, isRedirecting, delayInSeconds }"
    class="x-my-8 x-flex x-flex-col x-items-center x-gap-8 x-bg-neutral-10 x-p-24 x-text-center"
    :delayInSeconds="5"
  >
    <p>
      {{ $t('redirections.title') }}
    </p>
    <a :href="redirection.url">{{ redirection.url }}</a>
    <div class="x-mt-8 x-flex x-gap-32">
      <button @click="abortRedirect" class="x-button x-button-ghost">
        {{ $t('redirections.reject') }}
      </button>
      <button @click="redirect" class="x-button x-button-lead x-button-ghost">
        {{ $t('redirections.accept') }}
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
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Redirection',
    components: {
      AutoProgressBar,
      RedirectionComponent
    }
  });
</script>
