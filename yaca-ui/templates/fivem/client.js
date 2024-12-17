const defaultValues = {
    keybinds: {
        open_Radio: "O"
    },
    locales: {
        open_Radio: "Open Radio"
    }
}

function loadConfig() {
    const fileData = LoadResourceFile(GetCurrentResourceName(), "config.json")
  
    if (!fileData) {
        return defaultValues
    }
  
    const parsedData = JSON.parse(fileData)
  
    for (const key in defaultValues) {
        if (!(key in parsedData)) {
            console.warn(
            `[YaCA-UI] Missing config value for key '${key}' setting to default value: ${defaultValues[key]}\nMissing config values can cause unexpected behavior of the script.`,
            )
        }
    }
  
    for (const key in parsedData) {
        if (!(key in defaultValues)) {
            console.warn(`[YaCA-UI] Unknown config key '${key}' found in config file. This keys will be ignored and can be removed.`)
        }
    }
  
    return { ...defaultValues, ...parsedData }
}

function locale(key) {
    return config.locales[key]
}
  
const config = loadConfig()
registerKeybinds();

let isRadioOpen = false;
function openRadio(state) {
    SendNuiMessage(JSON.stringify({
        eventName: 'webview:yaca:openState',
        show: state
    }))

    SetNuiFocus(state, state);

    isRadioOpen = state;
}

exports('openRadio', openRadio)
exports('isRadioOpen', () => isRadioOpen)
exports('setRadioChannelData', (data) => {
    SendNuiMessage(JSON.stringify({
        eventName: 'webview:yaca:setChannelData',
        data: data
    })) 
})

RegisterNuiCallbackType('client:yaca:enableRadio')
on('__cfx_nui:client:yaca:enableRadio', (data, cb) => {
    exports['yaca-voice'].enableRadio(data[0]);
    cb();
});

RegisterNuiCallbackType('client:yaca:closeRadio')
on('__cfx_nui:client:yaca:closeRadio', (data, cb) => {
    openRadio(false);
    emit('yaca:external:radioClosed');
    cb();
});

RegisterNuiCallbackType('client:yaca:changeRadioChannelStereo')
on('__cfx_nui:client:yaca:changeRadioChannelStereo', (data, cb) => {
    exports['yaca-voice'].changeRadioChannelStereo();
    cb();
});

RegisterNuiCallbackType('client:yaca:changeRadioFrequency')
on('__cfx_nui:client:yaca:changeRadioFrequency', (data, cb) => {
    exports['yaca-voice'].changeRadioFrequency(data[0]);
    cb();
});

RegisterNuiCallbackType('client:yaca:changeActiveRadioChannel')
on('__cfx_nui:client:yaca:changeActiveRadioChannel', (data, cb) => {
    exports['yaca-voice'].changeActiveRadioChannel(data[0]);
    cb();
});

RegisterNuiCallbackType('client:yaca:changeRadioChannelVolume')
on('__cfx_nui:client:yaca:changeRadioChannelVolume', (data, cb) => {
    exports['yaca-voice'].changeRadioChannelVolume(data[0]);
    cb();
});

RegisterNuiCallbackType('client:yaca:muteRadioChannel')
on('__cfx_nui:client:yaca:muteRadioChannel', (data, cb) => {
    exports['yaca-voice'].muteRadioChannel(data[0]);
    cb();
});

RegisterNuiCallbackType('client:yaca:setSecondaryChannel')
on('__cfx_nui:client:yaca:setSecondaryChannel', (data, cb) => {
    exports['yaca-voice'].setSecondaryRadioChannel(data[0]);
    cb();
});

/* Keybinds */
function registerKeybinds() {
    if (config.keybinds.open_Radio !== false) {
        RegisterCommand(
            '+yaca:openRadio',
            () => {
            this.openRadio(!isRadioOpen)
            },
            false,
        )
        RegisterKeyMapping('+yaca:openRadio', locale('open_Radio'), 'keyboard', config.keybinds.open_Radio)
    }
}