<template>
    <div v-if="values.isRadioOpen" class="radioDiv" :style="radioViewportStyle">
        <div class="content">
            <v-img :src="values.radiobackground" width="200" class="radioShell"></v-img>
            <div class="btnOverContent">
                <v-row no-gutters>
                    <v-col cols="6" class="clickCols" style="height: 65px"
                        @click="btnExecute('volumeUp')" @contextmenu.prevent="btnExecuteRightClick('volumeDown')">
                    </v-col>
                    <v-col cols="6"
                        :style="['height: 35px', 'align-self: end', 'display: flex', 'flex-wrap: wrap']"
                        class="clickCols" @click="btnExecute('onOff')">
                    </v-col>
                </v-row>
            </div>
            <div class="btnContent">
                <v-row no-gutters v-for="(btn, index) in values.btn" :key="index">
                    <v-col cols="4" style="height: 30px" v-for="item in btn"
                        :key="item.key" @click="btnExecute(item.key)" class="clickCols"></v-col>
                </v-row>
            </div>
            <div class="activeRadio" v-if="values.isRadioActive" :style="{ '--lcd-color': values.color }">
                <div class="volumeContent">
                    <v-row no-gutters v-for="item in values.volume" :key="item">
                        <v-col cols="12" class="radioVolume"></v-col>
                    </v-row>
                </div>
                <row no-gutters align="center" justify="center">
                    <v-col cols="12">
                        <div class="modeContent">
                            {{ "C" + values.channel }}
                        </div>
                    </v-col>
                    <v-col cols="12" style="padding: 0 1rem">
                        <v-divider class="border-opacity-50"></v-divider>
                    </v-col>
                    <v-col cols="12">
                        <div class="frequenzContent">
                            <input v-model="values.frequency" class="inputFrequenz" type="text"
                                @input="handleFrequencyInput"
                            />
                        </div>
                    </v-col>
                </row>
            </div>
            <div v-else class="deactiveRadio"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive } from 'vue';
import { useDisplay } from 'vuetify';
import { GameService } from '../../services/game-service';
import radiobackground from '/src/assets/radio.webp';

const BASE_VIEWPORT_WIDTH = 1920;
const BASE_VIEWPORT_HEIGHT = 1080;
const BASE_RADIO_WIDTH = 200;
const BASE_RADIO_HEIGHT = 360;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

let values = reactive({
    isRadioOpen: false,
    isRadioActive: false,
    frequency: "0",
    frequencyValid: false,
    frequencyRegex: /^[0-9]{1,4},[0-9]{1,3}$/,
    channel: 1,
    maxChannel: 9,
    color: '#7c9d7d',
    volume: 6,
    maxVolumeSteps: 6,
    antiSpam: +new Date() - 1500,
    strgKeyDown: false,
    radiobackground,
    btn: [
        [
            {
                key: 'stereo_setting'
            },
            {
                key: 'channel_up'
            },
            {
                key: 'setFrequency'
            },
        ],
        [
            {
                key: 'setSecondaryChannel'
            },
            {
                key: 'channel_down'
            },
            {
                key: 'close_radio'
            },
        ]
    ]
});

const { width, height } = useDisplay();

const aspectRatio = computed(() => width.value / Math.max(height.value, 1));

const radioScale = computed(() => {
    const widthScale = width.value / BASE_VIEWPORT_WIDTH;
    const heightScale = height.value / BASE_VIEWPORT_HEIGHT;
    return clamp(Math.min(widthScale, heightScale), 0.64, 1.45);
});

const radioViewportStyle = computed(() => {
    let leftRatio = 0.075;
    let topRatio = 0.26;

    if (aspectRatio.value >= 2) {
        leftRatio = 0.05;
        topRatio = 0.22;
    } else if (aspectRatio.value <= 1.4) {
        leftRatio = 0.04;
        topRatio = 0.29;
    }

    return {
        '--radio-scale': String(radioScale.value),
        left: `${Math.round(clamp(width.value * leftRatio, 20, 180))}px`,
        top: `${Math.round(clamp(height.value * topRatio, 110, 360))}px`,
        width: `${Math.round(BASE_RADIO_WIDTH * radioScale.value)}px`,
        height: `${Math.round(BASE_RADIO_HEIGHT * radioScale.value)}px`
    };
});

let frequenzRule = (value: string) => {
    if ((values.frequencyRegex).test(value)) {
        values.color = '#7c9d7d';
        values.frequencyValid = true;
    } else {
        values.color = 'red';
        values.frequencyValid = false;
    }
}

let handleFrequencyInput = (event: Event) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    frequenzRule(input.value);
}

const handleOpenState = (state: boolean) => {
    values.isRadioOpen = state;
};

const handleChannelData = (channelData: { volume: number; frequency: string }) => {
    values.volume = Math.round(channelData.volume / (1 / values.maxVolumeSteps));
    values.frequency = channelData.frequency;
};

const handleRadioActive = (state: boolean) => {
    values.isRadioActive = state;
    values.antiSpam = +new Date();
};

const handleKeyDown = (event: KeyboardEvent) => {
    if (values.isRadioActive && event.which == 17) {
        values.strgKeyDown = true;
    }
};

const handleKeyUp = (event: KeyboardEvent) => {
    if (values.isRadioActive && values.strgKeyDown && [96, 97, 98, 99, 100, 101, 102, 103, 104, 105].includes(event.which)) {

        if (event.which == 96) {
            GameService.emit("client:yaca:muteRadioChannel", values.channel);
            return;
        }

        switch (event.which) {
            case 97:
                values.channel = 1;
                break;
            case 98:
                values.channel = 2;
                break;
            case 99:
                values.channel = 3;
                break;
            case 100:
                values.channel = 4;
                break;
            case 101:
                values.channel = 5;
                break;
            case 102:
                values.channel = 6;
                break;
            case 103:
                values.channel = 7;
                break;
            case 104:
                values.channel = 8;
                break;
            case 105:
                values.channel = 9;
                break;
        }

        GameService.emit('client:yaca:changeActiveRadioChannel', values.channel);
    }

    if (event.which == 17) {
        values.strgKeyDown = false;
    }
};

onMounted(() => {
    GameService.on('webview:yaca:openState', handleOpenState);
    GameService.on("webview:yaca:setChannelData", handleChannelData);
    GameService.on("webview:yaca:setRadioActive", handleRadioActive);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
});

onUnmounted(() => {
    GameService.off('webview:yaca:openState', handleOpenState);
    GameService.off("webview:yaca:setChannelData", handleChannelData);
    GameService.off("webview:yaca:setRadioActive", handleRadioActive);

    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
});

let btnExecute = (mode: string) => {
    if (!values.isRadioActive && !["close_radio", "onOff"].includes(mode)) return;

    switch (mode) {
        case "onOff":
            if (values.antiSpam + 1500 > +new Date()) return;

            if (values.isRadioActive) {
                GameService.emit("client:yaca:enableRadio", false)
            } else {
                GameService.emit("client:yaca:enableRadio", true)
            }

            values.isRadioActive = !values.isRadioActive;
            values.antiSpam = +new Date();
            break;
        case "stereo_setting":
            GameService.emit("client:yaca:changeRadioChannelStereo")
            break;
        case "setFrequency":
            if (!values.frequencyValid) return;
            GameService.emit("client:yaca:changeRadioFrequency", values.frequency);
            break;
        case "channel_up":
        case "channel_down":
            channelSwitch(mode == "channel_up");
            break;
        case "volumeUp":
            volumeChange(mode);
            break;
        case "close_radio":
            GameService.emit("client:yaca:closeRadio");
            break;
        case "setSecondaryChannel":
            GameService.emit("client:yaca:setSecondaryChannel", values.channel);
            break;
    }
}

let btnExecuteRightClick = (mode: string) => {
    if (mode == "volumeDown") return volumeChange(mode);
}

let channelSwitch = (up = true) => {
    if (up) {
        values.channel++;
        if (values.channel > values.maxChannel) values.channel = 1;
    } else {
        values.channel--;
        if (values.channel < 1) values.channel = values.maxChannel;
    }

    GameService.emit('client:yaca:changeActiveRadioChannel', values.channel);
}

let volumeChange = (mode: string) => {
    GameService.emit('client:yaca:changeRadioChannelVolume', mode == "volumeUp");
}
</script>

<style>
.radioDiv {
    position: fixed;
    z-index: 10;
    pointer-events: none;
}

.content {
    position: relative;
    width: 200px;
    transform: scale(var(--radio-scale));
    transform-origin: top left;
    filter: drop-shadow(0 16px 24px rgba(8, 5, 4, 0.6));
}

.radioShell {
    border-radius: 12px;
    filter: sepia(0.26) contrast(1.05) saturate(0.85);
    pointer-events: none;
}

.activeRadio {
    font-family: 'DSEG7 Modern';
    width: 114px;
    height: 60px;
    position: absolute;
    left: 18px;
    top: 190px;
    font-size: 0.75rem;
    line-height: 0;
    text-shadow: 0 0 4px rgba(205, 238, 149, 0.2), 1px 1px 0 rgba(15, 18, 6, 0.86);
    color: #292f13;
    border: 1px solid rgba(158, 112, 61, 0.58);
    background:
        linear-gradient(175deg, rgba(66, 69, 27, 0.84) 0%, color-mix(in srgb, var(--lcd-color, #7c9d7d) 50%, #3a2d17 50%) 100%),
        repeating-linear-gradient(0deg, rgba(209, 184, 111, 0.08) 0px, rgba(209, 184, 111, 0.08) 1px, rgba(28, 26, 11, 0) 1px, rgba(28, 26, 11, 0) 3px);
    box-shadow:
        inset 0 0 0 1px rgba(224, 174, 107, 0.24),
        inset 0 0 14px rgba(31, 22, 8, 0.28),
        0 3px 10px rgba(4, 3, 2, 0.46);
    animation: radioPulse 2.8s ease-in-out infinite;
}

.deactiveRadio {
    background:
        linear-gradient(175deg, rgba(13, 12, 9, 0.92) 0%, rgba(31, 25, 20, 0.96) 100%);
    width: 114px;
    height: 60px;
    position: absolute;
    left: 18px;
    top: 190px;
    font-size: 0.75rem;
    line-height: 0;
    border: 1px solid rgba(164, 121, 72, 0.38);
    box-shadow: inset 0 0 0 1px rgba(210, 175, 127, 0.09);
}

.frequenzContent {
    font-size: 1.25rem;
    display: flex;
    justify-content: center;
}

.inputFrequenz {
    color: #2c2c15;
    text-align: center;
    padding: 2px 4px;
    font-size: 0.75rem;
    width: 100px;
    text-shadow: 0 0 4px rgba(208, 209, 112, 0.26);
    border-radius: 4px;
    border: 1px solid rgba(80, 68, 33, 0.62);
    background: rgba(181, 170, 116, 0.58);
    font-family: 'DSEG7 Modern';
}

.inputFrequenz:focus {
    outline: none;
}

.inputFrequenz::-webkit-outer-spin-button,
.inputFrequenz::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.btnContent {
    position: absolute;
    width: 100px;
    height: 50px;
    top: 255px;
    left: 25px;
}

.btnOverContent {
    position: absolute;
    width: 100px;
    height: 50px;
    top: 100px;
    left: 45px;
}

.clickCols {
    cursor: pointer;
    border-radius: 3px;
    transition: background-color 0.16s ease;
    pointer-events: auto;
}

.clickCols:hover {
    background-color: rgba(169, 122, 64, 0.2);
}

.radioVolume {
    position: relative;
    display: block;
    float: left;
    width: 5px;
    height: 5px;
    margin: 2px;
    background: linear-gradient(180deg, #d3d778 0%, #8f9048 100%);
    border-radius: 1px;
}

.volumeContent {
    position: absolute;
    display: block;
    top: 0px;
    left: 2px;
    padding: 2px;
    width: 9px;
    height: 60px;
    transform: rotate(180deg);
}

.modeContent {
    letter-spacing: 0.06em;
}

@keyframes radioPulse {
    0% {
        box-shadow: inset 0 0 0 1px rgba(218, 166, 102, 0.24), inset 0 0 14px rgba(31, 22, 8, 0.25), 0 3px 10px rgba(4, 3, 2, 0.42);
    }

    50% {
        box-shadow: inset 0 0 0 1px rgba(226, 182, 119, 0.35), inset 0 0 16px rgba(43, 31, 11, 0.31), 0 4px 12px rgba(6, 4, 3, 0.52);
    }

    100% {
        box-shadow: inset 0 0 0 1px rgba(218, 166, 102, 0.24), inset 0 0 14px rgba(31, 22, 8, 0.25), 0 3px 10px rgba(4, 3, 2, 0.42);
    }
}
</style>
