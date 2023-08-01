import Vue, { VNode } from 'vue';

export interface XCSSInjector {
  addStyle: (styles: { source: string }) => void;
  setHost: (el: Element | ShadowRoot) => void;
}

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
