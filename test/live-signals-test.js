import Sinon from "sinon";
import { effect as preactEffect } from '@preact/signals-core';
import { effect as polyfillEffect } from "signal-utils/subtle/microtask-effect";
import LiveState from 'phx-live-state';
import { createPreactSignal, createPolyfillSignal } from '../src/live-signals.js';
import { expect } from '@esm-bundle/chai';

describe('Live Signals', () => {
  const liveState = new LiveState({url: 'foo', topic: 'bar'});
  liveState.connect = Sinon.stub();

  it('can create preact signals', () => {
    const liveState = new LiveState({url: 'foo', topic: 'bar'});
    liveState.connect = Sinon.stub();
    const preactLiveSignal = createPreactSignal(liveState);
    let state;
    preactEffect(() => {
      state = preactLiveSignal.value;
    });
    liveState.eventTarget.dispatchEvent(new CustomEvent('livestate-change', {
      detail: {
        state: {foo: 'bar'},
        version: 1
      }
    }));
    expect(state.foo).to.equal('bar');
  });

  it('can create polyfill signals', async () => {
    const polyfillSignal = createPolyfillSignal(liveState);
    let state;
    polyfillEffect(() => {
      state = polyfillSignal.get();
    });
    liveState.eventTarget.dispatchEvent(new CustomEvent('livestate-change', {
      detail: {
        state: {foo: 'bar'},
        version: 1
      }
    }));
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(state.foo).to.equal('bar');
  });

});