import { ScrollDirection, XOn } from '@empathyco/x-components';
import Vue from 'vue';
import Component from 'vue-class-component';
@Component
export default class IsScrollingUp extends Vue {
  protected stopsScrollDown = true;
  protected isScrollingUp = true;
  protected scrollOffset = 200;

  @XOn('UserChangedScrollDirection')
  scrollDirectionChanged(direction: ScrollDirection): void {
    this.stopsScrollDown = direction === 'UP';
  }

  @XOn(['UserScrolled'])
  scrollLength(position: number): void {
    // TODO change this implementation when the scroll module is fixed
    if (this.$x.scroll['main-scroll']?.hasAlmostReachedEnd) {
      this.isScrollingUp = false;
      return;
    }
    if (this.stopsScrollDown || position < this.scrollOffset) {
      this.isScrollingUp = true;
    } else if (!this.stopsScrollDown && position > this.scrollOffset) {
      this.isScrollingUp = false;
    }
  }

  /**
   * Checks the direction and the position of the scroll.
   *
   * @returns True if the user is scrolling up and has scrolled more than
   * the defined scrollOffset.
   */
  protected get hasScrolled(): boolean {
    return this.isScrollingUp;
  }
}
