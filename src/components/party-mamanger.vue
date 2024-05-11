<template>
  <div class="party-manager">
    <h1>Party Manager</h1>
    <div v-if="parties.length">
      <button @click="deleteSelectedParties">Delete Selected</button>
      <button @click="deleteAllParties">Delete All</button>
      <ul>
        <li v-for="party in parties" :key="party.id">
          <input type="checkbox" :value="party.id" v-model="selectedParties">
          {{ party.name }} -- {{ party.id}}
          <button @click="deleteParty(party.id)">Delete</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No parties available.</p>
    </div>
  </div>
</template>

<script>
import { Amplify} from "aws-amplify";
import awsconfig from "@/amplifyconfiguration.json";
import {generateClient} from "aws-amplify/api";
import { listParties } from '@/graphql/queries';
import { deleteParty as deletePartyMutation } from '@/graphql/mutations';
Amplify.configure(awsconfig);
const client = generateClient();

export default {
  name: 'PartyManager',
  data() {
    return {
      parties: [],
      selectedParties: []
    };
  },
  methods: {
    async fetchParties() {
      try {
        const response = await client.graphql({ query: listParties });
        this.parties = response.data.listParties.items;
      } catch (error) {
        console.error('Error fetching parties:', error);
      }
    },
    async deleteParty(partyId) {
      try {
        await client.graphql({
          query: deletePartyMutation,
          variables: { input: { id: partyId } }
        });
        this.parties = this.parties.filter(party => party.id !== partyId);
      } catch (error) {
        console.error('Error deleting party:', error);
      }
    },
    deleteSelectedParties() {
      this.selectedParties.forEach(partyId => {
        this.deleteParty(partyId);
      });
      this.selectedParties = [];
    },
    deleteAllParties() {
      this.parties.forEach(party => {
        this.deleteParty(party.id);
      });
      this.parties = [];
    }
  },
  mounted() {
    this.fetchParties();
  }
};
</script>

<style scoped>
.party-manager {
  width: 300px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.party-manager ul {
  list-style: none;
  padding: 0;
}

.party-manager li {
  margin-bottom: 10px;
}
</style>
