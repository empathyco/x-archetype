// @ts-expect-error - Vuex doesn't support type=module.
import { createStore } from 'vuex'

// eslint-disable-next-line ts/no-unsafe-call
export default createStore({
  strict: false,
  state: {},
  mutations: {},
  actions: {},
  modules: {},
})
