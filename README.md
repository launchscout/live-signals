# live-signals

This is a very teeny library to create signals that connect to a [LiveState](https://github.com/launchscout/live_state) channel.

## Usage

 - `createPreactSignal(liveStateOrOptions)` returns a preact signal bound the LiveState state
 - `createPolyfillSignal(liveStateOrOptions)` returns a TC39 polyfill signal bound the LiveState state

 Both take either a `LiveState` instance or options which will be used as the arg to create a LiveState instance.
