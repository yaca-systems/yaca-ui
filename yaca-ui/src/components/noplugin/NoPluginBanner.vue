<template>
  <div class="w-100 d-flex align-center justify-center position-fixed bottom-0" style="background: #46ce47; height: 4vh">
    <span class="text-black font-weight-bold">{{LocaleService.GetLocale("no_plugin_active_header")}} | {{LocaleService.GetLocale("no_plugin_active_body")}}</span>
  </div>
</template>

<script lang="ts" setup>
import LocaleService from "@/services/locale-service";
</script>