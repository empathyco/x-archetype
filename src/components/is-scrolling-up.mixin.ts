import { ScrollDirection, XOn } from '@empathyco/x-components';
import Vue from 'vue';
import Component from 'vue-class-component';
@Component
export default class IsScrollingUp extends Vue {
  protected stopScrollDown = true;
  protected scroll = true;
  protected scrollOffset = 100;

  @XOn('UserChangedScrollDirection')
  scrollDirectionChanged(direction: ScrollDirection): void {
    this.stopScrollDown = direction === 'UP';
  }

  @XOn(['UserScrolled'])
  scrollLength(position: number): void {
    if (this.stopScrollDown || position < this.scrollOffset) {
      this.scroll = true;
    } else if (!this.stopScrollDown && position > this.scrollOffset) {
      this.scroll = false;
    }
  }

  /**
   * Checks the direction and the position of the scroll.
   *
   * @returns True if the user is scrolling up and has scrolled more than
   * the defined scrollOffset.
   */
  protected get hasScrolled(): boolean {
    return this.scroll;
  }
}
