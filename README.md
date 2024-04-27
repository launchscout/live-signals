# live-signals

This is a very teeny library to create signals that connect to a [LiveState](https://github.com/launchscout/live_state) channel.

## Usage

 - `createPreactSignal(liveStateOrOptions)` returns a preact signal bound the LiveState state, and a dispatchEvent function which will dispatch a CustomEvent to liveState
 - `createPolyfillSignal(liveStateOrOptions)` returns a TC39 polyfill signal bound the LiveState state, , and a dispatchEvent function which will dispatch a CustomEvent to liveState

 Both take either a `LiveState` instance or options which will be used as the arg to create a LiveState instance.

 ## Example

 See [preact-example.html](./preact-example.html) for a small example that uses preact signals. It is designed to connect to the [silly_crm](https://github.com/superchris/silly_crm) example project. You'll need to have that up and running first for it to work.
