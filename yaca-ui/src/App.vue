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
    GameService.on("webview:yaca:isActive", (state: boolean) => {
        isPluginActive.value = state;
    });
});
</script>
<style scoped></style>
