<template>
  <div class="card">
    <div class="card-body">
      <h4 v-text="packageItem.name" />
      <p v-text="packageItem.description" />
      <button class="btn btn-outline-info btn-sm mt-2" @click="openPackageModal">
        Details
      </button>
    </div>
  </div>
</template>

<script>
import eventBus from '../eventBus';

export default {
  name: 'PackageItem',
  props: {
    packageItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openPackageModal() {
      eventBus.$emit('open-package-modal', this.packageItem);
    },
  },
};
</script>
