<template>
  <div id="app" class="app d-flex flex-column min-vh-100">
    <div class="flex-grow-1">
      <AppHeader @reset-paginate="currentPage = 1;"/>
      <main class="main">
        <div class="container-fluid my-2 my-md-4">
          <Loader v-if="packageLoading" />
          <div class="row" v-else>
            <div class="col-12">
              <template v-if="packages.length">
                <PackageItem
                  v-for="({ package: packageItem }) in paginatePackages"
                  :key="packageItem.name"
                  :package-item="packageItem"
                />
              </template>
              <div class="alert alert-primary" v-else>
                Packages list is empty 🤨. Try to type something...
              </div>
            </div>
            <div class="col-12 mt-3" v-if="totalPages > 1">
              <nav>
                <ul class="pagination">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" tabindex="-1" @click.prevent="currentPage -= 1">
                      Previous
                    </a>
                  </li>
                  <li
                    class="page-item"
                    v-for="page in totalPages"
                    :key="page"
                    :class="{ active: page === currentPage }"
                  >
                    <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="currentPage += 1">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
    <AppFooter />
    <PackageModal />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { slice } from 'lodash';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import PackageItem from './components/PackageItem.vue';
import PackageModal from './components/PackageModal.vue';
import Loader from './components/Loader.vue';
import eventBus from './eventBus';

const packagesPerPage = 10;

export default {
  name: 'App',
  data() {
    return {
      currentPage: 1,
      packageLoading: false,
    };
  },
  components: {
    AppHeader,
    AppFooter,
    PackageItem,
    PackageModal,
    Loader,
  },
  watch: {
    currentPage() {
      window.scrollTo({ top: 0 });
    },
  },
  computed: {
    ...mapGetters(['packages']),
    paginatePackages() {
      return slice(
        this.packages,
        packagesPerPage * (this.currentPage - 1),
        this.currentPage * packagesPerPage,
      );
    },
    totalPages() {
      return Math.ceil(this.packages.length / packagesPerPage);
    },
  },
  methods: {
    setPackageLoading(isLoading) {
      this.packageLoading = isLoading;
    },
  },
  created() {
    eventBus.$on('set-packages-loading', (isLoading) => this.setPackageLoading(isLoading));
  },
  beforeDestroy() {
    eventBus.$off('set-packages-loading', (isLoading) => this.setPackageLoading(isLoading));
  },
};
</script>
