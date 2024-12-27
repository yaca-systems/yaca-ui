import * as alt from 'alt-client';
import * as natives from 'natives';

alt.on("connectionComplete", () => {
    new yacaUI();
});

class yacaUI {
    webview;
    radioToggle = false;
    canOpenRadio = true;
    config = {};
    constructor() {
        this.webview = new alt.WebView("http://resource/assets/index.html");
        this.config = JSON.parse(alt.File.read('./config.json'));

        this.webview.emit("webview:yaca:ready",
            this.config.locales,
            this.config.noactive_plugin_ui
        )
        this.registerEvents();
    }

    registerEvents() {
        this.webview.on("client:yaca:enableRadio", (state) => {
            alt.emit("client:yaca:enableRadio", state)
        });

        this.webview.on('client:yaca:muteRadioChannel', () => {
            alt.emit("client:yaca:muteRadioChannel")
        });

        this.webview.on('client:yaca:changeActiveRadioChannel', (channel) => {
            alt.emit("client:yaca:changeActiveRadioChannel", channel)
        });

        this.webview.on('client:yaca:changeRadioChannelVolume', (higher) => {
            alt.emit("client:yaca:changeRadioChannelVolume", higher)
        });

        this.webview.on("client:yaca:changeRadioChannelStereo", () => {
            alt.emit("client:yaca:changeRadioChannelStereo")
        });

        this.webview.on("client:yaca:closeRadio", () => {
            this.closeRadio();
        });

        alt.on("client:yaca:openradio", () => {
            this.openRadio();
        });

        alt.on("client:yaca:canOpenRadio", (state) => {
            this.canOpenRadio = state;
        });

        alt.onServer("client:yaca:canOpenRadio", (state) => {
            this.canOpenRadio = state;
        });

        alt.on("client:yaca:setRadioActive", (state) => {
            this.webview.emit("webview:yaca:setRadioActive", state);
        });

        alt.onServer("client:yaca:setRadioActive", (state) => {
            this.webview.emit("webview:yaca:setRadioActive", state);
        });

        this.webview.on('client:yaca:changeRadioFrequency', (frequency) => {
            alt.emit("client:yaca:changeRadioFrequency", frequency);
        });

        alt.on("client:yaca:setRadioChannelData", (data) => {
            this.webview.emit("webview:yaca:setChannelData", data);
        });

        this.webview.on('client:yaca:setSecondaryChannel', (channel) => {
            alt.emit("client:yaca:setSecondaryChannel", channel);
        });

        this.webview.on("client:yaca:closeRadio", () => {
            alt.emit("yaca:external:radioClosed")
        })

        alt.on("YACA:JOINED_INGAME_CHANNEL", () => {
            this.hasPluginActive(true);
        });

        alt.on("YACA:DISCONNECTED_FROM_WEBSOCKET", () => {
            this.hasPluginActive(false);
        });
    }

    hasPluginActive(state) {
        if (!this.config.noactive_plugin_ui) return;

        this.webview.emit("webview:yaca:isActive", state);

        if (this.config.noactive_plugin_ui.freezeplayer) {
            natives.freezeEntityPosition(alt.Player.local, !state);
        }
    }

    openRadio() {
        if (!this.radioToggle && !alt.isCursorVisible() && this.canOpenRadio) {
            this.radioToggle = true;
            alt.showCursor(true);
            alt.toggleGameControls(false);
            this.webview.emit('webview:yaca:openState', true);
            this.webview.focus();
        } else if (this.radioToggle) {
            this.closeRadio();
        }
    }

    closeRadio() {
        if (!this.radioToggle) return;

        this.radioToggle = false;

        alt.showCursor(false);
        alt.toggleGameControls(true);
        this.webview.emit('webview:yaca:openState', false);
        this.webview.unfocus();
    }
}