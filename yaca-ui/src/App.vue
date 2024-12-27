<template>
    <v-app>
        <NoPluginFullScreen v-if="!isPluginActive && YaCAConfig.NO_PLUGIN_ACTIVE_FULLSCREEN" />
        <NoPluginBanner v-else-if="!isPluginActive" />

        <div class="w-full h-full bg-transparent">
            <router-view></router-view>
        </div>
    </v-app>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import NoPluginFullScreen from "@/components/noplugin/NoPluginFullScreen.vue";
import { YaCAConfig } from "@/config";
import { GameService } from "@/services/game-service";
import NoPluginBanner from "@/components/noplugin/NoPluginBanner.vue";

const isPluginActive = ref(false);

onMounted(() => {
    GameService.on("webview:yaca:ready", (locales: any) => {
        
    });

    GameService.on("webview:yaca:isActive", (state: boolean) => {
        isPluginActive.value = state;
    });

    GameService.emit("client:yacaui:ready");
});
</script>
<style>
/* Start Fix for fivem to have transparent backgrpund */
.v-application {
  background: rgb(0, 0, 0, 0.0) !important;
}

:root {
  color-scheme: none !important;
}
/* End Fix for fivem to have transparent backgrpund */
</style>
