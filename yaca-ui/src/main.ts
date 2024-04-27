import { createApp } from 'vue';
import App from './App.vue';

import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/Home.vue";


import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

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
    theme: {
        defaultTheme: 'dark',
        themes: {
            dark: {
                colors: {
                    primary: '#21af2f',
                    input: '#0b0b0bcc',
                }
            },
        },
    },
    directives,
    components: {
        ...components
    }
})

createApp(App).use(vuetify).use(router).mount('#app');
