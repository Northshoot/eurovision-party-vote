<template>
  <div class="join-party">
    <input v-model="userName" placeholder="Enter your username" />
    <input v-model="partyId" placeholder="Enter party ID" />
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
        this.$router.push({name: 'Voting', query: {userName:this.userName, partyId: this.partyId}});
      } catch (error) {
        console.error('Error joining party:', error);
        // Handle error, if user name exists
      }
    }
  }
};
</script>

<style scoped>
.join-party input {
  display: block;
  margin-bottom: 10px;
}
</style>
