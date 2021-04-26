import Vue from 'vue';
import Vuex from 'vuex';
import jsdelivr from '../api/jsdelivr';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    packages: [],
    packageVersions: [],
  },
  getters: {
    packages: (state) => state.packages,
    packageVersions: (state) => state.packageVersions,
  },
  mutations: {
    setPackages(state, packages) {
      state.packages = packages;
    },
    setPackageVersion(state, packageVersions) {
      state.packageVersions = packageVersions;
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async searchPackages({ commit }, searchedName) {
      try {
        const { objects } = await jsdelivr.search(searchedName);
        commit('setPackages', objects);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    clearPackages({ commit }) {
      commit('setPackages', []);
    },
    async getPackageVersion({ commit }, packageName) {
      try {
        const { versions } = await jsdelivr.fetchPackageVersion(packageName);
        commit('setPackageVersion', versions);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
});
