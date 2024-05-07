<template>
  <div>
    <div class="welcome-message">
      <h1>Welcome to the Eurovision Voting App</h1>
      <p>Welcome, {{ userName }} from party {{ partyName }}! Please vote for your favorite countries.</p>
      <button @click="submitVotes">Cast your spell</button>
    </div>

    <div class="list-container">
      <div class="country-item" v-for="country in countries" :key="country.id">
        <div class="country-info">
          <img :src="country.flag_url" alt="Flag" class="country-flag">
          <div class="country-details">
            <h3>{{ country.country }}</h3>
            <p>{{ country.artist_name }} - {{ country.song_name }}</p>
          </div>
        </div>
        <div class="links">
          <a :href="country.YouTube_url" target="_blank" class="icon-youtube">
            <font-awesome-icon :icon="['fab', 'youtube']" />
          </a>
          <a :href="country.more" target="_blank" class="icon-eurovision">
            <font-awesome-icon :icon="['fas', 'globe-europe']" />
          </a>
        </div>
        <div>
          <vote-selector :country="country.country" @vote-selected="onVoteSelected"></vote-selector>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import VoteSelector from './vote-selector.vue'; // Make sure to import VoteSelector component
import jsonData from '@/assets/countries.json'; // Importing the JSON data
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import awsconfig from "@/amplifyconfiguration.json";

Amplify.configure(awsconfig);

const client = generateClient();
import { createVote } from '@/graphql/mutations';

export default {
  name: 'VoteView',
  components: {
    VoteSelector
  },
  data() {
    return {
      // Placeholder values that will be replaced with actual route parameters
      userName: '',
      partyName: '',
      countries: this.generateIds(jsonData),
      availableVotes: [12, 10, 8, 7, 6, 5, 4, 3, 2, 1],
      votes: []
    };
  },
  mounted() {
    // Accessing route query parameters
    this.userName = this.$route.query.userName || 'Unknown User';
    this.partyName = this.$route.query.partyId || 'Unknown Party';
  },
  methods: {
    generateIds(data) {
      return data.map((country, index) => {
        return {
          id: index,
          ...country
        };
      });
    },
    onVoteSelected(data) {
      console.log(`Vote received: ${data.country} for ${data.points}`);
      console.log(data);
    },
    async submitVotes() {
      console.log('Submitting votes:', this.votes);
      for (let vote of this.votes) {
        try {
          const voteInput = {
            userId: this.userId,    // Ensure you have the userId stored in your component data
            partyId: this.partyId,  // The partyId should be set when the party is started
            country: vote.country,
            points: vote.points
          };
          const response = await client.graphql({
            query: createVote,  // Make sure the createVote is imported if it's defined externally
            variables: { input: voteInput }
          });
          console.log('Vote submitted:', response.data.createVote);
        } catch (error) {
          console.error('Error submitting vote:', error);
        }
      }
    }
  }

};
</script>

<style scoped>
.welcome-message {
  text-align: center;
  padding: 20px;
  margin-bottom: 20px; /* Spacing between welcome message and list */
}

.list-container {
  max-width: 540px; /* Set the width of the list */
  margin: auto; /* Center the list horizontally */
}

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
