<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <span class="navbar-brand d-block mx-auto d-md-inline-block mr-md-3">
      jsDelivr-DB
    </span>
    <input
      class="form-control"
      type="search"
      placeholder="Search"
      aria-label="Search"
      v-model="searchedName"
    />
  </nav>
</template>

<script>
import { debounce } from 'lodash';
import eventBus from '../eventBus';

export default {
  name: 'AppHeader',
  data() {
    return {
      searchedName: '',
    };
  },
  watch: {
    // eslint-disable-next-line func-names
    searchedName: debounce(function () {
      if (this.searchedName === '') {
        this.$store.dispatch('clearPackages');
        return;
      }
      eventBus.$emit('set-packages-loading', true);
      this.fetch().finally(() => {
        eventBus.$emit('set-packages-loading', false);
      });
      this.$emit('reset-paginate');
    }, 500),
  },
  methods: {
    async fetch() {
      await this.$store.dispatch('searchPackages', this.searchedName);
    },
  },
};
</script>
