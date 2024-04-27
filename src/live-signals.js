import { signal } from '@preact/signals';
import { Signal } from 'signal-polyfill';
import LiveState from 'phx-live-state';
import subscript from 'subscript';

export const createPreactSignal = (liveStateOrOptions) => {
  const { path, initialValue } = liveStateOrOptions;
  const [liveState, dispatchEvent] = createLiveState(liveStateOrOptions);
  const updater = path? subscript(path) : (state) => state;
  const preactSignal = signal(initialValue ? initialValue : {});
  liveState.eventTarget.addEventListener('livestate-change', ({detail: { state }}) => {
    preactSignal.value = updater(state);
  });
  return [preactSignal, dispatchEvent];
}

export const createPolyfillSignal = (liveStateOrOptions) => {
  const { path, initialValue } = liveStateOrOptions;
  const [liveState, dispatchEvent] = createLiveState(liveStateOrOptions);
  const updater = path? subscript(path) : (state) => state;
  const polyfillSignal = new Signal.State(initialValue ? initialValue : {});
  liveState.eventTarget.addEventListener('livestate-change', ({detail: { state }}) => {
    polyfillSignal.set(updater(state));
  });
  return [polyfillSignal, dispatchEvent];
}

const createLiveState = (liveStateOrOptions) => {
  let liveState;
  if (liveStateOrOptions instanceof LiveState) {
    liveState = liveStateOrOptions;
  } else {
    liveState = new LiveState(liveStateOrOptions);
  }
  const dispatchEvent = (event) => liveState.dispatchEvent(event);
  liveState.connect();
  return [liveState, dispatchEvent];
}

