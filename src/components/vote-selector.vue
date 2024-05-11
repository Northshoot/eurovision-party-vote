<template>
  <div class="vote-selector">
    <div class="vote-interface">
      <p v-if="myVote" class="vote-result"><span class="vote-badge">{{ myVote }}</span></p>
      <select v-model="selectedVote" @change="handleVote">
        <option disabled value="">Please select a vote</option>
        <option v-for="vote in availableVotes" :key="vote" :value="vote">
          {{ vote }}
        </option>
      </select>
      <button v-if="myVote" @click="removeVote" class="remove-vote-button">
        <span aria-hidden="true">&times;</span> <!-- Unicode X character -->
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'VoteSelector',
  props: ['country'],
  data() {
    return {
      selectedVote: '', // Initialize the local state for selected votes
      myVote: null
    };
  },
  computed: {
    ...mapState({
      availableVotes: state => state.availableVotes
    })
  },
  methods: {
    handleVote() {
      // Ensure that the selected vote is set in both the local and global state

      console.log('Vote selected:', this.selectedVote);
      if(this.myVote !== this.selectedVote) {
        console.log('New vote selected');
        this.$store.dispatch('removeVote', this.myVote);
      }
      this.myVote = this.selectedVote;
      this.$emit('vote-selected', {country: this.country, points: this.selectedVote});
      // Dispatch the vote to the Vuex store
      this.$store.dispatch('castVote', this.selectedVote);
      // Optionally reset after emitting or keep for display purposes
    },
    removeVote() {
      this.$store.dispatch('removeVote', this.myVote);
      this.myVote = null
      this.selectedVote = ''; // Reset the selected vote
    }
  }
};
</script>

<style scoped>
.vote-selector {
  display: flex;
  align-items: center;
}

.vote-interface {
  display: flex;
  align-items: center;
  width: 200px;
}

.vote-selector select {
  width: 100px;
  padding: 8px;
  margin-left: 10px; /* Space between the vote result and select box */
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  appearance: none;
  cursor: pointer;
}

.vote-result {
  margin: 0;
  padding-right: 10px;
  color: #555;
  font-style: italic;
}

.vote-badge {
  display: inline-block;
  background-color: #007bff; /* Example: Bright blue background */
  color: white; /* White text color */
  padding: 5px 10px; /* Top/bottom and left/right padding */
  text-align: center;
  border-radius: 50%; /* This creates the circular shape */
  min-width: 15px; /* Minimum width to ensure circle shape */
  font-weight: bold; /* Bold text */
}

/* Extra styles for select focus and disabled state */
.vote-selector select:focus {
  border-color: #007BFF;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
}

.vote-selector select:disabled {
  background-color: #eee;
}
.remove-vote-button {
  padding-right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  color: #dc3545; /* Red color for the X to indicate removal/cancel */
}

.remove-vote-button:hover {
  color: #c82333; /* Darker red on hover */
}
</style>

