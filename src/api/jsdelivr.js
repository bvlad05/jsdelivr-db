const NPM_REGISTRY_BASE = 'https://registry.npmjs.org';
const JSDELIVR_BASE = 'https://data.jsdelivr.com';
const MAX_SEARCHED_LIMIT = '50';

export default {
  async getRequest(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could not fetch in ${response.url}, received ${response.status}`);
    }
    // eslint-disable-next-line no-return-await
    return await response.json();
  },
  async search(searchedName) {
    const url = new URL('/-/v1/search', NPM_REGISTRY_BASE);
    url.searchParams.set('text', searchedName);
    url.searchParams.set('size', MAX_SEARCHED_LIMIT);
    return this.getRequest(url.toString());
  },
  async fetchPackageVersion(packageName) {
    const url = new URL(`/v1/package/npm/${packageName}`, JSDELIVR_BASE);
    return this.getRequest(url.toString());
  },
};
