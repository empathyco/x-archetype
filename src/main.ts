import { XInstaller } from '@empathyco/x-components';
import Vue from 'vue';
import { installXOptions } from './x-components/plugin.options';

Vue.config.productionTip = false;

new XInstaller(installXOptions).init();
