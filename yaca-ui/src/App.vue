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
import { onMounted, ref } from "vue";
import NoPluginFullScreen from "@/components/noplugin/NoPluginFullScreen.vue";
import { GameService } from "@/services/game-service";
import NoPluginBanner from "@/components/noplugin/NoPluginBanner.vue";
import LocaleService from "@/services/locale-service";

const isPluginActive = ref(false);
const useNoActivePluginUI = ref(false);
const noActivePluginStyle = ref(1);
const logoUrl = ref("");

onMounted(() => {
  GameService.on("webview:yaca:ready", (locales: Object, useNoActivePluginUi: boolean, noActivePluginUiStyle: number, customLogoUrl: string) => {
    for (let localesKey in locales) {
      LocaleService.AddLocale(localesKey, locales[localesKey]);
    }

    useNoActivePluginUI.value = useNoActivePluginUi;
    noActivePluginStyle.value = noActivePluginUiStyle;

    if (customLogoUrl.length) logoUrl.value = customLogoUrl;
  });

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
