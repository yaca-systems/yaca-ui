<template>
    <v-app>
        <div class="w-full h-full bg-transparent">
            <router-view></router-view>
        </div>
    </v-app>
</template>

<script lang="ts" setup>

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
