import { State } from '@empathyco/x-components';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dictionary } from '@empathyco/x-utils';
import { ScrollComponentState } from '@empathyco/x-components/scroll';
import { Watch } from 'vue-property-decorator';
@Component
export default class IsScrollingUp extends Vue {
  protected hasScrolledPastThreshold = true;
  protected scrollOffset = 200;

  @State('scroll', 'data')
  public scrollPositionsMap!: Dictionary<ScrollComponentState>;
  protected get mainScrollPosition(): number {
    return this.scrollPositionsMap['main-scroll']?.position;
  }

  @Watch('mainScrollPosition', { deep: true })
  updateHasScrolledPastThreshold(): void {
    // TODO change this implementation when the scroll module is fixed. Task EMP-1049
    if (this.$x.scroll['main-scroll']?.hasAlmostReachedEnd) {
      this.hasScrolledPastThreshold = false;
      return;
    }
    const isScrollingUp = this.scrollPositionsMap['main-scroll']?.direction === 'UP';
    if (isScrollingUp || this.mainScrollPosition < this.scrollOffset) {
      this.hasScrolledPastThreshold = true;
    } else if (!isScrollingUp && this.mainScrollPosition > this.scrollOffset) {
      this.hasScrolledPastThreshold = false;
    }
  }

  /**
   * Checks the direction and the position of the scroll.
   *
   * @returns True if the user is scrolling up and has scrolled more than
   * the defined scrollOffset.
   */
  protected get hasScrolled(): boolean {
    return this.hasScrolledPastThreshold;
  }
}
