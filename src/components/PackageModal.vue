<template>
  <div class="card">
    <div class="card-body">
      <h4 v-text="packageItem.name" />
      <div>
        {{ packageItem.publisher.username }}
        <span class="badge badge-secondary" v-text="packageItem.version" />
      </div>
      <div class="text-muted" v-text="packageItem.description" />
      <template v-if="packageItem.keywords">
        <span
          class="badge badge-light"
          v-for="(keyword, idx) in packageItem.keywords"
          v-text="keyword"
          :key="idx"
        />
        <br>
      </template>
      <button class="btn btn-outline-info btn-sm mt-2" @click="openPackageDetails">
        Details
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PackageItem',
  props: {
    packageItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openPackageDetails(name) {
      console.log(name);
    },
  },
};
</script>
