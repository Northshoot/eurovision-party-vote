<template>
  <div>

    <div> <alert-box ref="alertBox" /></div>
    <div class="list-container">
      <div class="welcome-message">
        <h1>Welcome to the Eurovision Voting</h1>
        <p>Welcome, {{ userData.name }} to party <strong> {{ userData.party.name }} </strong>! Please vote for your favorite countries.</p>
        <div class="info-box">
          <p>You have a total of <strong>10 votes</strong> to distribute, with values ranging from <strong>12, 10 and 8 to 1 point</strong>. Each value can be assigned only once, so choose carefully when casting your votes.</p>
        </div>
        <button @click="submitVotes">Cast your spell</button>
      </div>
      <div class="country-item" v-for="country in sortedCountries" :key="country.id">
        <div class="country-info">
          <img :src="country.flag_url" alt="Flag" class="country-flag">
          <div class="country-details">
            <h3>{{ country.country }}</h3>
            <p>{{ country.artist_name }} - {{ country.song_name }}</p>
          </div>
        </div>
        <div class="links">
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
import AlertBox from './alert-box.vue';
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
    VoteSelector,
    AlertBox
  },
  data() {
    return {
      // Placeholder values that will be replaced with actual route parameters
      countries: this.generateIds(jsonData),
      availableVotes: [12, 10, 8, 7, 6, 5, 4, 3, 2, 1],
      votes: [],
      userData: this.getUserData()
    };
  },
  computed: {
    sortedCountries() {
      return [...this.countries].sort((a, b) => b.votes - a.votes);
    }
  },
  methods: {
    getUserData() {
      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        return JSON.parse(userDataString);
      } else {
        return {}; // Return an empty object if nothing is in local storage
      }
    },
    generateIds(data) {
      console.log('Generating IDs for countries:', data.length);
      return data.map((country, index) => {
        return {
          id: index,
          votes: 0,
          ...country
        };
      });
    },
    onVoteSelected(data) {
      this.votes.push(data);
      const countryIndex = this.countries.findIndex(c => c.country === data.country);
      console.log('Country index:', countryIndex, 'Votes:', data.points);
      if (countryIndex !== -1) {
        // Update the votes in an immutable way
        this.countries = this.countries.map((country, index) => {
          if (index === countryIndex) {
            return { ...country, votes: country.votes + data.points };
          }
          return country;
        });
      }
    },
    async submitVotes() {
      const userDataString = localStorage.getItem('userData');
      const userData = JSON.parse(userDataString);

      let voted = false;
      try {
        const votedDataString = localStorage.getItem('votedData');
        const votedData = JSON.parse(votedDataString);
        voted = userData.partyId === votedData.partyId;
      } catch (error) {
        console.error('Error fetching voted data:', error);
      }

      if(voted) {
        this.$refs.alertBox.show("You already voted !");
        console.log('You already voted');
        this.$router.push({name: 'Results'});
        return;
      }
      try {
        const partyId = this.userData.party.id;
        const userId= this.userData.id;
        console.log('Party ID:', partyId)
        if (!partyId) {
          console.error('No party found with that name');
          return;
        }
        for (let vote of this.votes) {
          try {
            const voteInput = {
              userId: userId,    // Ensure you have the userId stored in your component data
              partyId: partyId,  // The partyId should be set when the party is started
              country: vote.country,
              points: vote.points
            };
            const response = await client.graphql({
              query: createVote,  // Make sure the createVote is imported if it's defined externally
              variables: {input: voteInput}
            });
            localStorage.setItem('voted', "true");
            localStorage.setItem('votedData', JSON.stringify(response.data.createVote));
            this.showConfetti = true; // Start confetti animation
            this.$router.push({name: 'Results'});

          } catch (error) {
            console.error('Error submitting vote:', error);
          }
        }
      }catch (error) {
        console.error('Error fetching party ID:', error);
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
  overflow: hidden; /* Ensures no overflow of content outside the borders */
}

.country-info {
  display: flex;
  align-items: center;
  flex-grow: 1; /* Allows this section to expand and fill available space */
}

.country-flag {
  width: 50px;
  height: auto;
  margin-right: 10px;
}

.country-details {
  flex-grow: 1; /* Allows the text details to expand and fill available space */
  min-width: 0; /* Prevents the element from forcing other elements to shrink */
}

.country-details h3 {
  margin: 0;
  font-size: 16px;
  white-space: nowrap; /* Prevents wrapping and ensures size stability */
  overflow: hidden;
  text-overflow: ellipsis; /* Adds an ellipsis if the text overflows */
}

.country-details p {
  margin: 0;
  font-size: 14px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis; /* Adds an ellipsis if the text overflows */
}

.links {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Aligns links to the right */
  min-width: 120px; /* Ensures minimum space for links, preventing overlap */
}

.links a {
  color: cornflowerblue;
  margin-right: 10px;
  font-size: 24px;
}

.icon-eurovision {
  color: cornflowerblue;
}
.info-box {
  padding: 20px;
  margin: 20px;
  background-color: #f3f4f6; /* Light grey background */
  border-left: 5px solid #2c3e50; /* Dark blue highlight */
  font-family: Arial, sans-serif;
  color: #333;
}

.info-box p {
  font-size: 16px; /* Slightly larger text for readability */
  line-height: 1.6; /* Improved line spacing */
}
</style>

