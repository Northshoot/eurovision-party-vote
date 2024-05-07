<template>
  <div class="party-control">
    <input v-model="partyName" placeholder="Enter party name" />
    <button @click="startParty">Start Party</button>
    <button @click="endParty">End Party</button>
  </div>
</template>

<script>
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import awsconfig from "@/amplifyconfiguration.json";

Amplify.configure(awsconfig);

const client = generateClient();
import { createParty,updateParty } from '@/graphql/mutations';

export default {
  name: 'AdminView',
  data() {
    return {
      partyName: ''
    };
  },
  methods: {
    async startParty() {
      try {
        const input = { name: this.partyName, isGoing: true };
        const response = await client.graphql({ query: createParty, variables: { input } });
        this.partyId = response.data.createParty.id;
        console.log('Party started:', response.data.createParty);
      } catch (error) {
        console.error('Error starting party:', error);
      }
    },

    async endParty() {
      if (!this.partyId) {
        alert('No party started or party ID not set!');
        return;
      }
      try {
        const input = { id: this.partyId, isGoing: false };
        const response = await client.graphql({query: updateParty, variables:{ input }});
        console.log('Party ended:', response.data.updateParty);
      } catch (error) {
        console.error('Error ending party:', error);
      }
    }
  }
};

</script>

<style scoped>
.party-control input {
  margin-right: 10px;
}
</style>
