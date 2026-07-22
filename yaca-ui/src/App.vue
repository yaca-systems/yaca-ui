<template>
  <v-app>
    <NoPluginFullScreen
        v-if="useNoActivePluginUI && !isPluginActive && noActivePluginStyle == 1"
        :logoUrl="logoUrl"
    />
    <NoPluginBanner v-else-if="useNoActivePluginUI && !isPluginActive && noActivePluginStyle == 2"/>

    <div class="w-full h-full bg-transparent">
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import NoPluginFullScreen from "./components/noplugin/NoPluginFullScreen.vue";
import { GameService } from "./services/game-service";
import NoPluginBanner from "./components/noplugin/NoPluginBanner.vue";
import LocaleService from "./services/locale-service";

const isPluginActive = ref(false);
const useNoActivePluginUI = ref(false);
const noActivePluginStyle = ref(1);
const logoUrl = ref("");

const handleReady = (locales: Record<string, string>, useNoActivePluginUiSettings: { usage: boolean; style: number; logo: string }) => {
  for (const localesKey in locales) {
    LocaleService.AddLocale(localesKey, locales[localesKey]);
  }

  useNoActivePluginUI.value = useNoActivePluginUiSettings.usage;
  noActivePluginStyle.value = useNoActivePluginUiSettings.style;

  if (useNoActivePluginUiSettings.logo.length) logoUrl.value = useNoActivePluginUiSettings.logo;
};

const handleIsActive = (state: boolean) => {
  isPluginActive.value = state;
};

onMounted(() => {
  GameService.on("webview:yaca:ready", handleReady);
  GameService.on("webview:yaca:isActive", handleIsActive);

  GameService.emit("client:yacaui:ready");
});

onUnmounted(() => {
  GameService.off("webview:yaca:ready", handleReady);
  GameService.off("webview:yaca:isActive", handleIsActive);
});
</script>
<style>
/* Start Fix for fivem to have transparent background */
.v-application {
  background: rgb(0, 0, 0, 0.0) !important;
}

:root {
  color-scheme: none !important;
}

/* End Fix for fivem to have transparent background */
</style>
