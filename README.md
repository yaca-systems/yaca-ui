# [yaca.systems](https://yaca.systems/) for [alt:V](https://altv.mp/), [FiveM](https://fivem.net/) & [RedM](https://redm.net/)

This is a ui implementation for [alt:V](https://altv.mp/), [FiveM](https://fivem.net/) & [RedM](https://redm.net/).
Feel free to report bugs via issues or contribute via pull requests.

Join our [Discord](http://discord.yaca.systems/) to get help or make suggestions and start
using [yaca.systems](https://yaca.systems/) today!

# Features

- Radio UI

# Config FiveM / RedM

| Variable                                | Type                           | Description                                                                             |
|-----------------------------------------|--------------------------------|-----------------------------------------------------------------------------------------|
| keybinds.open_Radio                     | `string`                       | The default keybinding for open the radio ui, set to `false` to disable.                |

# Exports FiveM / RedM

<details>
<summary style="font-size: x-large">Client</summary>

### Radio

#### `openRadio(state: bool)`

Open or close the radio ui.

| Parameter | Type      | Description             |
|-----------|-----------|-------------------------|
| state     | `boolean` | the phone speaker state |

#### `setRadioChannelData(data: object)`

Sets the radio channel data in the ui, it's mainly called by yaca-voice resource.

| Parameter | Type      | Description             |
|-----------|-----------|-------------------------|
| data     | `object` | Current settings from a specific radio channel |

#### `isRadioOpen(): boolean`

Returns whether the radio ui is open as `boolean`.

</details>

# Events FiveM / RedM

<details>
<summary style="font-size: x-large">Client</summary>

### yaca:external:radioClosed

The event is triggered when the radio ui gets closed.

</details>

# Developers

If you want to contribute to this project, feel free to do so. We are happy about every contribution. If you have any
questions, feel free to ask in our [Discord](http://discord.yaca.systems/).

## Building the resource

To build the resource, you need to have [Node.js](https://nodejs.org/) installed. After that, you can run the following
commands to build the resource:

```bash
pnpm install
pnpm run build
```

The built resource will be located in the `resource` folder, which you can then use in your FiveM server.
