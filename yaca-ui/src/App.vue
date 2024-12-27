<template>
  <v-app>
    <NoPluginFullScreen v-if="!isPluginActive && YaCAConfig.NO_PLUGIN_ACTIVE_FULLSCREEN"/>
    <NoPluginBanner v-else-if="!isPluginActive"/>

    <div class="w-full h-full bg-transparent">
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import NoPluginFullScreen from "@/components/noplugin/NoPluginFullScreen.vue";
import {YaCAConfig} from "@/config";
import {GameService} from "@/services/game-service";
import NoPluginBanner from "@/components/noplugin/NoPluginBanner.vue";
import LocaleService from "@/services/locale-service";
import {YaCALocale} from "@/interfaces/locale";

const isPluginActive = ref(false);

const onSetLocalesEvent = (locales: Object | string): void => {
  if (!locales.length) {
    throw new Error("Locales not found");
  }

  if (typeof locales === "string") {
    locales = JSON.parse(locales) as YaCALocale;
  }

  for (let localesKey in locales) {
    LocaleService.AddLocale(localesKey, locales[localesKey]);
  }
}

onMounted(() => {
  GameService.on("webview:yaca:ready", onSetLocalesEvent);
  GameService.on("webview:yaca:isActive", (state: boolean) => {
    isPluginActive.value = state;
  });

  GameService.emit("client:yacaui:ready");
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
