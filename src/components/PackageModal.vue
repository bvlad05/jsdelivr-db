<template>
  <div v-if="visibility">
    <div class="modal fade show d-block">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <Loader v-if="loading" />
          <template v-else>
            <div class="modal-header">
              <h5 class="modal-title h4" v-text="packageItem.name" />
              <button type="button" class="close" @click="close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="btn-group mb-4" v-if="packageItem.links">
                <a
                  :href="link"
                  class="btn btn-secondary"
                  v-for="(link, key) in packageItem.links"
                  :key="key"
                  v-text="upperFirst(key)"
                  target="_blank"
                />
              </div>
              <p>
                {{ packageItem.publisher.username }}
                <span class="badge badge-secondary" v-text="packageItem.version" />
                <span
                  class="badge badge-info ml-1"
                  v-text="dayjs(packageItem.date).format('DD MMM, YYYY, HH:mm')"
                />
              </p>
              <p v-text="packageItem.description" />
              <template v-if="packageItem.keywords">
              <span
                class="badge badge-light"
                v-for="(keyword, idx) in packageItem.keywords"
                v-text="keyword"
                :key="idx"
              />
                <br>
              </template>
              <h5 class="mt-3">Maintainers</h5>
              <ul>
                <li v-for="(maintainer, idx) in packageItem.maintainers" :key="idx">
                  <a :href="`mailto:${maintainer.email}`" v-text="maintainer.username" />
                </li>
              </ul>
              <h5 class="mt-3">Versions</h5>
              <span
                class="badge badge-info mr-1"
                v-for="version in packageVersions"
                v-text="version"
                :key="version"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" v-show="visibility" />
  </div>
</template>

<script>
import { upperFirst } from 'lodash';
import dayjs from 'dayjs';
import Loader from './Loader.vue';
import eventBus from '../eventBus';

export default {
  name: 'PackageModal',
  components: {
    Loader,
  },
  data() {
    return {
      loading: false,
      packageItem: null,
      visibility: false,
    };
  },
  computed: {
    packageVersions() {
      return this.$store.getters.packageVersions;
    },
  },
  methods: {
    upperFirst,
    dayjs,
    open(packageItem) {
      document.body.classList.add('modal-open');
      this.visibility = true;
      if (this.packageItem && packageItem.name === this.packageItem.name) {
        return;
      }
      this.packageItem = packageItem;
      this.loading = true;
      this.$store.dispatch('getPackageVersion', packageItem.name)
        .finally(() => {
          this.loading = false;
        });
    },
    close() {
      document.body.classList.remove('modal-open');
      this.visibility = false;
    },
  },
  created() {
    eventBus.$on('open-package-modal', this.open);
  },
  beforeDestroy() {
    eventBus.$off('open-package-modal', this.open);
  },
};
</script>
