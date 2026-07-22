<template>
  <div class="no-plugin-banner w-100 d-flex align-center justify-center position-fixed bottom-0">
    <span class="no-plugin-banner__text western-label">{{ LocaleService.GetLocale("no_plugin_active_header") }} | {{ LocaleService.GetLocale("no_plugin_active_body") }}</span>
  </div>
</template>

<script lang="ts" setup>
import LocaleService from "../../services/locale-service";
</script>

<style scoped>
.no-plugin-banner {
  height: 4.4vh;
  min-height: 36px;
  background:
    linear-gradient(90deg, rgba(22, 15, 11, 0.96) 0%, rgba(64, 41, 29, 0.96) 45%, rgba(22, 15, 11, 0.96) 100%),
    repeating-linear-gradient(35deg, rgba(133, 95, 61, 0.2) 0px, rgba(133, 95, 61, 0.2) 3px, rgba(35, 23, 16, 0.18) 3px, rgba(35, 23, 16, 0.18) 7px),
    radial-gradient(circle at 15% 130%, rgba(185, 136, 72, 0.2) 0%, rgba(185, 136, 72, 0) 50%);
  border-top: 2px solid rgba(204, 176, 139, 0.45);
  box-shadow: 0 -9px 20px rgba(9, 5, 3, 0.58), inset 0 1px 0 rgba(255, 222, 177, 0.16);
}

.no-plugin-banner__text {
  color: #e3c59a;
  font-size: 0.82rem;
  text-shadow: 0 1px 0 rgba(10, 6, 4, 0.75);
}

@media (min-width: 2560px) {
  .no-plugin-banner__text {
    font-size: 1rem;
  }
}
</style>