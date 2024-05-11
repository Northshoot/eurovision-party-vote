<template>
  <div class="join-party">
    <input v-model="userName" placeholder="Enter your username" />
    <input v-model="partyId"  type="hidden"/>
    <button @click="joinParty">Join Party</button>
  </div>
</template>

<script>
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import awsconfig from "@/amplifyconfiguration.json";

Amplify.configure(awsconfig);
const client = generateClient();
import { createUser } from '@/graphql/mutations';

export default {
  name: 'JoinPartyView',
  data() {
    return {
      userName: '',
      partyId: ''
    };
  },
  created() {
    // Retrieve partyId from the query parameters if present
    this.partyId = this.$route.query.partyId || '';
  },
  methods: {
    async joinParty() {
      try {
        // Create User
        const userData = {
          name: this.userName,
          partyId: this.partyId
        };
        console.log('Creating user:', userData);
        const newUser = await client.graphql({query: createUser, variables: {input: userData}});
        console.log('Created user:', newUser);
        localStorage.setItem('partyId', newUser.data.createUser.partyId);
        localStorage.setItem('userData', JSON.stringify(newUser.data.createUser));
        this.$router.push({name: 'Voting', query: {userName: this.userName}});
      } catch (error) {
        console.error('Error joining party:', error);
      }
    }
  }
};
</script>

<style scoped>
.join-party {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;  /* Limit the maximum width for larger screens */
  padding: 20px;
  background-color: #f8f8f8;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);  /* Enhanced shadow effect */
  border-radius: 10px;  /* Optional: Adds rounded corners */
  text-align: center;  /* Center-aligns the text and button within the inputs */
}

.join-party input, .join-party button {
  display: block;
  width: 100%;  /* Adjust to full width of the container */
  margin: 10px 0;
}
</style>
