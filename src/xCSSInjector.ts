import { XCSSInjector } from './shims-tsx';

class CssInjector implements XCSSInjector {
  protected host!: Element | ShadowRoot;
  protected stylesQueue: string[] = [];

  addStyle(styles: { source: string }): void {
    console.log(styles);
    this.stylesQueue.push(styles.source);
    if (this.host) {
      this.stylesQueue.forEach(styles => {
        const styleTag = document.createElement('style');
        styleTag.textContent = styles;
        this.host.appendChild(styleTag);
      });
      this.stylesQueue = [];
    }
  }

  setHost(host: Element | ShadowRoot): void {
    this.host = host;
  }
}

(window as typeof window & { xCSSInjector: XCSSInjector }).xCSSInjector = new CssInjector();
