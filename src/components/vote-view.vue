<template>
  <div class="country-item">
    <div class="country-info">
      <img :src="country.flagUrl" alt="Flag" class="country-flag">
      <div class="country-details">
        <h3>{{ country.countryName }}</h3>
        <p>{{ country.artistName }} - {{ country.songName }}</p>
      </div>
    </div>
    <div class="links">
      <a :href="country.youtubeUrl" target="_blank" class="icon-youtube">
        <i class="fab fa-youtube"></i>
      </a>
      <a :href="country.eurovisionUrl" target="_blank" class="icon-eurovision">
        <i class="fas fa-globe-europe"></i>
      </a>
    </div>
    <vote-selector></vote-selector>
  </div>
</template>

<script>
import VoteSelector from './vote-selector.vue'; // Make sure to import VoteSelector component

export default {
  components: {
    VoteSelector
  },
  props: {
    country: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.country-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.country-info {
  display: flex;
  align-items: center;
}

.country-flag {
  width: 50px;
  height: auto;
  margin-right: 10px;
}

.country-details h3 {
  margin: 0;
  font-size: 16px;
}

.country-details p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.links {
  display: flex;
  align-items: center;
}

.links a {
  color: #c00;
  margin-right: 10px;
  font-size: 24px;
}

.icon-eurovision {
  color: #000;
}
</style>
