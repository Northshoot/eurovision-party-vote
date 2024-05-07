<template>
  <div class="vote-selector">
    <select v-model="selectedVote" @change="handleVote">
      <option disabled value="">Please select a vote</option>
      <option v-for="vote in availableVotes" :key="vote" :value="vote">
        {{ vote }}
      </option>
    </select>
    <p v-if="selectedVote">You voted: {{ selectedVote }}</p>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: 'VoteSelector',
  props: ['country'],
  data() {
    return {
      selectedVote: null // Local component state to track selected vote
    };
  },
  computed: {
    ...mapState({
      availableVotes: state => state.availableVotes
    })
  },
  methods: {
    handleVote() {
      this.$emit('vote-selected', { country: this.country, points: this.selectedVote });
      this.castVote(this.selectedVote); // Cast vote using Vuex action
      this.selectedVote = null; // Reset after voting
    },
    ...mapActions(['castVote']) // Map Vuex actions
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
