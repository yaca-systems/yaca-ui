<template>
  <div class="w-100 h-100 overflow-hidden d-flex justify-center align-center">
    <div class="w-100 h-100 d-flex justify-center align-center flex-column text-white" style="background: rgba(0, 0, 0, 0.8); border: 4px solid #46ce47cc; box-shadow: 0px 0px 24px 0px rgba(70,206,71,0.5);">
      <img v-if="!props.logoUrl" src="../../assets/logo.svg" width="150" alt="logo" class="mb-4">
      <img v-else :src="props.logoUrl" width="150" alt="logo" class="mb-4">
      <h3>{{ LocaleService.GetLocale("no_plugin_active_header") }}</h3>
      <p>{{ LocaleService.GetLocale("no_plugin_active_body") }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LocaleService from "@/services/locale-service";

const props = defineProps({
  logoUrl: String
});
</script>