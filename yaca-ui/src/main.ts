import { createApp } from 'vue';
import App from './App.vue';

import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/Home.vue";

import '@fontsource/alegreya-sc/latin-500.css';
import '@fontsource/alegreya-sc/latin-700.css';
import '@fontsource/alegreya-sc/latin-900.css';
import '@fontsource/alegreya-sc/latin-ext-500.css';
import '@fontsource/alegreya-sc/latin-ext-700.css';
import '@fontsource/alegreya-sc/latin-ext-900.css';
import '@fontsource/special-elite/latin.css';
import '@fontsource/special-elite/latin-ext.css';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VApp, VCol, VDivider, VImg, VRow } from 'vuetify/components';

import "./assets/style.css";

// Add the routes for each page
const routes = [
    {
        path: '/',
        component: Home
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const vuetify = createVuetify({
    components: {
        VApp,
        VCol,
        VDivider,
        VImg,
        VRow
    }
});

createApp(App).use(vuetify).use(router).mount('#app');
