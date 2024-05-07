<template>
    <div>
      <div class="confetti-container" v-if="showConfetti">
        <div class="confetti-piece"
             v-for="n in 1000"
             :key="n"
             :style="{
             left: (Math.random() * 100) + 'vw',
             animationDelay: (Math.random() * 5) + 's',
             backgroundColor: getRandomColor()
           }"></div>
      </div>
    <h1>Vote Results</h1>
    <div v-if="winner" class="winner">
      <h2>Winner: {{ winner.country }} with {{ winner.points }} points!</h2>
    </div>
    <div v-if="runnersUp.length" class="runners-up">
      <h3>Runners Up:</h3>
      <ul>
        <li v-for="(vote, index) in runnersUp" :key="index">
          {{ vote.country }}: {{ vote.points }} points
        </li>
      </ul>
    </div>
    <div class="others">
      <h4>Remaining Countries:</h4>
      <ul>
        <li v-for="(vote, index) in others" :key="index">
          {{ vote.country }}: {{ vote.points }} points
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'VoteResults',
  data() {
    return {
      showConfetti: true  // Control the display of confetti
    };
  },
  computed: {
    ...mapState({
      votes: state => state.votes.votes // Ensure correct path if using namespaced modules
    }),
    sortedVotes() {
      if (!Array.isArray(this.votes)) {
        console.log('Unexpected data type for votes:', this.votes);
        return []; // Return an empty array if votes is not an array
      }
      return [...this.votes].sort((a, b) => b.points - a.points);
    },
    winner() {
      return this.sortedVotes[0] || null;
    },
    runnersUp() {
      return this.sortedVotes.slice(1, 3);
    },
    others() {
      return this.sortedVotes.slice(3);
    }
  },
  methods: {
    ...mapActions('votes', ['fetchVotes']), // Properly map the fetchVotes action from the votes module
    getRandomColor() {
      const colors = ['#ffcc00', '#ff44cc', '#44ccff', '#44ff44'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  },
  mounted() {
    // Directly call fetchVotes from the votes module with the partyId from URL parameters
    this.fetchVotes(this.$route.params.partyId);
    setTimeout(() => {
      this.showConfetti = false;  // Stop showing confetti after 10 seconds
    }, 60000);  // 10000 milliseconds = 10 seconds
  }
};
</script>


<style scoped>
.winner {
  position: relative;
  padding: 20px;
  margin: 20px;
  background: linear-gradient(45deg, #6a3093, #a044ff);
  color: white;
  font-size: 1.5em;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid #ffffff55;
  animation: pop-in 0.5s ease-out forwards, glow 1.5s infinite alternate;
  text-align: center;
}

.runners-up li {
  animation: fade-in 0.5s ease-out forwards;
}

@keyframes pop-in {
  0% {
    transform: scale(0.5) rotate(0deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 1;
  }
}

@keyframes glow {
  0% {
    box-shadow: 0 0 20px #ffffff88;
  }
  100% {
    box-shadow: 0 0 40px #a044ff;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes confetti {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(300px) rotate(720deg); opacity: 0; }
}

.confetti-piece {
  position: absolute;
  width: 10px;
  height: 10px;
  animation: confetti 5s linear forwards;
}

.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;  /* Set the width to full viewport width */
  height: 100vh; /* Set the height to full viewport height */
  pointer-events: none;
  overflow: hidden;
  z-index: 9999;
  display: flex;
  //justify-content: center; /* Center children horizontally */
  //align-items: center; /* Center children vertically */
}

/* Additional styles for confetti pieces with color and timing variations */
.confetti-piece:nth-child(2n) {
  background-color: #ff44cc;
}
.confetti-piece:nth-child(3n) {
  background-color: #44ccff;
}
.confetti-piece:nth-child(4n) {
  background-color: #44ff44;
}
</style>
