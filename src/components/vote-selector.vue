<template>
  <div class="vote-selector">
    <select v-model="selectedVote" @change="handleVote">
      <option disabled value="">Please select a vote</option>
      <option v-for="vote in availableVotes" :key="vote" :value="vote">
        {{ vote }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      availableVotes: [12, 10, 8, 7, 6, 5, 4, 3, 2, 1],
      selectedVote: '',
      usedVotes: []
    };
  },
  methods: {
    handleVote() {
      if (this.selectedVote) {
        this.usedVotes.push(this.selectedVote);
        this.availableVotes = this.availableVotes.filter(vote => !this.usedVotes.includes(vote));
        this.selectedVote = ''; // Reset selected vote after handling
      }
    }
  }
};
</script>

<style scoped>
.vote-selector select {
  width: 200px;
  padding: 8px;
  margin-top: 10px;
}
</style>
