declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, never>, Record<string, never>, any>;
  export default component;
}

declare module 'vuetify/styles';

declare global {
  interface Window {
    GetParentResourceName?: () => string;
  }
}

export {};
