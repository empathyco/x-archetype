<template>
  <RedirectionComponent
    v-slot="{ redirection, redirect, abortRedirect, isRedirecting, delayInSeconds }"
    class="xds:my-8 xds:flex xds:flex-col xds:items-center xds:gap-8 xds:bg-neutral-10 xds:p-24 xds:text-center"
    :delay-in-seconds="5"
  >
    <p>
      {{ $t('redirections.title') }}
    </p>
    <a :href="redirection.url">{{ redirection.url }}</a>
    <div class="xds:mt-8 xds:flex xds:gap-32">
      <button class="xds:button xds:button-ghost" @click="abortRedirect">
        {{ $t('redirections.reject') }}
      </button>
      <button class="xds:button xds:button-ghost xds:button-lead" @click="redirect">
        {{ $t('redirections.accept') }}
      </button>
    </div>
    <AutoProgressBar
      :is-loading="isRedirecting"
      :duration-in-seconds="delayInSeconds"
      class="xds:w-320"
    />
  </RedirectionComponent>
</template>

<script setup lang="ts">
import { AutoProgressBar } from '@empathyco/x-components'
import { Redirection as RedirectionComponent } from '@empathyco/x-components/search'
</script>
