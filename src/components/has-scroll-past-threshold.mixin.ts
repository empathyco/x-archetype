import { State } from '@empathyco/x-components';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dictionary } from '@empathyco/x-utils';
import { ScrollComponentState } from '@empathyco/x-components/scroll';
import { Watch } from 'vue-property-decorator';
@Component
export default class IsScrollingUp extends Vue {
  protected hasScrolledPastThresholdFlag = false;
  protected scrollOffset = 100;

  @State('scroll', 'data')
  public scrollPositionsMap!: Dictionary<ScrollComponentState>;
  protected get mainScrollPosition(): number {
    return this.scrollPositionsMap['main-scroll']?.position;
  }

  @Watch('mainScrollPosition', { deep: true })
  updateHasScrolledPastThreshold(): void {
    // TODO change this implementation when the scroll module is fixed. Task EMP-1049
    const mainScrollData = this.scrollPositionsMap['main-scroll'];

    if (mainScrollData?.hasReachedStart) {
      this.hasScrolledPastThresholdFlag = false;
      return;
    }

    if (mainScrollData?.hasAlmostReachedEnd) {
      this.hasScrolledPastThresholdFlag = true;
      return;
    }

    const isScrollingUp = mainScrollData?.direction === 'UP';
    if (isScrollingUp || this.mainScrollPosition < this.scrollOffset) {
      this.hasScrolledPastThresholdFlag = false;
    } else if (!isScrollingUp && this.mainScrollPosition > this.scrollOffset) {
      this.hasScrolledPastThresholdFlag = true;
    }
  }

  /**
   * Checks the direction and the position of the scroll.
   *
   * @returns True if the user is scrolling up and has scrolled more than
   * the defined scrollOffset.
   */
  protected get hasScrolledPastThreshold(): boolean {
    return this.hasScrolledPastThresholdFlag;
  }
}
