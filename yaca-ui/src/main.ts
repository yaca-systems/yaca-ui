import { createApp } from 'vue';
import App from './App.vue';

import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/Home.vue";


import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import "./assets/style.css";
import {createI18n} from "vue-i18n";
import {YaCAConfig} from "./config";
import {locale_en} from "./locale/en";
import {locale_de} from "./locale/de";

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
    directives,
    components: {
        ...components
    }
});

const i18n = createI18n({
    locale: YaCAConfig.LANGUAGE,
    fallbackLocale: 'en',
    messages: {
        en: locale_en,
        de: locale_de
    }
})

createApp(App).use(vuetify).use(router).use(i18n).mount('#app');
