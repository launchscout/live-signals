import { signal } from '@preact/signals-core';
import { Signal } from 'signal-polyfill';
import LiveState from 'phx-live-state';

export const createPreactSignal = (liveStateOrOptions) => {
  const liveState = createLiveState(liveStateOrOptions);
  const preactSignal = signal({});
  liveState.eventTarget.addEventListener('livestate-change', ({detail: { state }}) => {
    preactSignal.value = state;
  });
  return preactSignal;
}

export const createPolyfillSignal = (liveStateOrOptions) => {
  const liveState = createLiveState(liveStateOrOptions);
  const polyfillSignal = new Signal.State({});
  liveState.eventTarget.addEventListener('livestate-change', ({detail: { state }}) => {
    polyfillSignal.set(state);
  });
  return polyfillSignal;
}

const createLiveState = (liveStateOrOptions) => {
  if (liveStateOrOptions instanceof LiveState) {
    return liveStateOrOptions;
  } else {
    return new LiveState(liveStateOrOptions);
  }
}

