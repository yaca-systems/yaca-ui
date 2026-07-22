<template>
  <div class="no-plugin-screen w-100 h-100 overflow-hidden d-flex justify-center align-center">
    <div class="no-plugin-screen__plate w-100 h-100 d-flex justify-center align-center flex-column text-white">
      <img v-if="!props.logoUrl" src="../../assets/logo.optimized.svg" alt="logo" class="mb-5 logo">
      <img v-else :src="props.logoUrl" alt="logo" class="mb-5 logo">
      <h3 class="western-heading western-label">{{ LocaleService.GetLocale("no_plugin_active_header") }}</h3>
      <p class="western-subtitle">{{ LocaleService.GetLocale("no_plugin_active_body") }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LocaleService from "../../services/locale-service";

const props = defineProps({
  logoUrl: String
});
</script>

<style scoped>
.no-plugin-screen {
  background:
    radial-gradient(circle at 14% 8%, rgba(204, 176, 139, 0.16) 0%, rgba(204, 176, 139, 0) 42%),
    radial-gradient(circle at 84% 93%, rgba(185, 136, 72, 0.24) 0%, rgba(185, 136, 72, 0) 40%),
    repeating-linear-gradient(140deg, rgba(38, 24, 16, 0.12) 0px, rgba(38, 24, 16, 0.12) 3px, rgba(20, 14, 10, 0.08) 3px, rgba(20, 14, 10, 0.08) 8px),
    linear-gradient(160deg, rgba(15, 10, 8, 0.93) 0%, rgba(31, 21, 16, 0.91) 50%, rgba(15, 10, 8, 0.95) 100%);
}

.no-plugin-screen__plate {
  border: 3px solid rgba(185, 136, 72, 0.72);
  box-shadow:
    inset 0 0 0 1px rgba(226, 195, 151, 0.28),
    inset 0 0 18px rgba(0, 0, 0, 0.35),
    0 0 34px rgba(10, 6, 4, 0.72);
  backdrop-filter: blur(2px);
}

.logo {
  height: 18vh;
  width: auto;
  max-width: min(48vw, 520px);
  filter: drop-shadow(0 8px 10px rgba(0, 0, 0, 0.45));
}

.western-heading {
  color: #e7c593;
  font-size: clamp(1.2rem, 2.3vw, 2.2rem);
  letter-spacing: 0.1em;
  text-shadow: 0 1px 0 rgba(9, 6, 4, 0.86);
}

.western-subtitle {
  margin-top: 0.4rem;
  color: #d2b283;
  font-family: 'Special Elite', 'Courier New', monospace;
  font-size: clamp(0.85rem, 1.5vw, 1.1rem);
  letter-spacing: 0.05em;
  text-align: center;
  max-width: 70ch;
}
</style>