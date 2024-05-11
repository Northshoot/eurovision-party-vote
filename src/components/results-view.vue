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
    <div v-if="winner" class="winner">
      <h2>Party Favorite</h2>
      <h3> {{ winner.country }} with {{ winner.points }} points!</h3>
      <h2 v-if="winningCountry">Actual Winner</h2>
      <h3> {{ winningCountry }}</h3>
    </div>
      <div v-if="winnerGuesses.length" class="flashy-container">
        <h2>Winner pickers</h2>
        <ul>
          <li v-for="name in winnerGuesses" :key="name" class="flashy-item">
            {{ name }}
          </li>
        </ul>
      </div>

    <div v-if="runnersUp.length" class="runners-up">
      <h3>Local runners Up:</h3>
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
import { Amplify} from "aws-amplify";
import awsconfig from "@/amplifyconfiguration.json";
import {getUser, listWinners} from '@/graphql/queries';
import {generateClient} from "aws-amplify/api";
Amplify.configure(awsconfig);
const client = generateClient();

export default {
  name: 'VoteResults',
  data() {
    return {
      showConfetti: true,  // Control the display of confetti
      winnerGuesses: [],
      winningCountry: ''
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
      return this.sortedVotes.slice(1, 2);
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
    },
    async fetchUsersWhoGuessedCorrectly() {
      const partyId = localStorage.getItem('partyId')
      const getWinners =  await client.graphql({
        query: listWinners,
        variables: {
          filter: {
            partyId: {
              eq: partyId
            }
          },
          limit: 100 // Optional: adjust based on your needs
        }
      });
      console.log('Winners:', getWinners.data.listWinners.items);
      const winners = getWinners.data.listWinners.items;
      const allVotesString = localStorage.getItem('allVotes');
      const allVotes = JSON.parse(allVotesString);
      const firstPlaceCountries = new Set(
          winners.filter(winner => winner.place === 1).map(winner => winner.country)
      );
      let [winningCountry] = firstPlaceCountries;
      console.log('First place countries:', winningCountry);
      this.winningCountry = winningCountry;
      const topVotes = allVotes.filter(vote =>
          vote.points === 12 && firstPlaceCountries.has(vote.country)
      );
      const uniqueTopVotes = this.removeDuplicateUsers(topVotes);
      console.log('top votes: ', uniqueTopVotes);
      for (let vote of uniqueTopVotes) {
        if (!vote.userId) {
          continue;  // Skip this iteration if no userId is found.
        }
        try {
          const input = {
            id: vote.userId
          };
          console.log('Fetching user:', input);
          const response = await client.graphql({
            query: getUser,
            variables: {id: vote.userId}
          });
          this.winnerGuesses.push(response.data.getUser.name);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    },
    removeDuplicateUsers(votes) {
    const uniqueUsers = {};
    votes.forEach(vote => {
      if (!uniqueUsers[vote.userId]) {
        uniqueUsers[vote.userId] = vote;
      }
    });
  // Convert the values of the uniqueUsers object back into an array
  return Object.values(uniqueUsers);
}
  },
  mounted() {
    this.fetchVotes();
    this.fetchUsersWhoGuessedCorrectly();
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
.flashy-container {
  padding: 10px;
  background: linear-gradient(to right, #ff6ec4, #7873f5);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  margin: 20px;
}

.flashy-item {
  font-size: 2em;
  color: white;
  list-style-type: none;
  animation: fadeIn 4s ease-out;
  margin: 5px 0;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Additional global styles for animations */
@keyframes glow {
  0% {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
  }
  100% {
    text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
  }
}
</style>
