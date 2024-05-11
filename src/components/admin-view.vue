<template>
  <router-link to="/parties">Manage Parties</router-link>
  <div class="party-control">
    <div class="input-group">
      <input v-model="partyName" placeholder="Enter party name" />
    </div>
    <div class="button-group">
      <button @click="startParty">Start Party</button>
      <button @click="confirmEndParty" class="end-party-btn">End Party</button>
    </div>
    <!-- Display QR Code if partyId is set, now centered -->
    <div v-if="partyId" class="qr-section">
      <qrcode-vue :value="partyUrl" :size="200"></qrcode-vue>
      <p>Party Link: <a :href="partyUrl" target="_blank">{{ partyUrl }}</a></p>
    </div>
  </div>
</template>

<script>
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import awsconfig from "@/amplifyconfiguration.json";
import { createParty, updateParty } from '@/graphql/mutations';
import QrcodeVue from 'qrcode.vue';

Amplify.configure(awsconfig);
const client = generateClient();

export default {
  name: 'AdminView',
  components: {
    QrcodeVue
  },
  data() {
    return {
      partyName: '',
      partyId: null,
      partyUrl: ''
    };
  },
  methods: {
    async startParty() {
      try {
        const input = { name: this.partyName, isGoing: true };
        const response = await client.graphql({ query: createParty, variables: { input } });
        this.partyId = response.data.createParty.id;
        console.log('Party started: ', response.data.createParty);
        // Generate the party URL dynamically based on the current location
        this.partyUrl = `${window.location.origin}/#/?partyId=${this.partyId}`;
      } catch (error) {
        console.error('Error starting party:', error);
      }
    },

    confirmEndParty() {
      if (!this.partyId) {
        alert('No party started or party ID not set!');
        return;
      }
      if (confirm('Are you sure you want to end the party?')) {
        this.endParty();
      }
    },

    async endParty() {
      try {
        const input = {name: this.partyName, isGoing: false};
        const response = await client.graphql({query: updateParty, variables: {input}});
        console.log('Party ended:', response.data.updateParty);
      } catch (error) {
        console.error('Error ending party:', error);
      }
    }
  }
};
</script>

<style scoped>
.party-control {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Adjust based on your preference */
}

.input-group, .button-group {
  margin-bottom: 20px;
}

input[type="text"] {
  padding: 8px;
  width: 200px;
}

button {
  padding: 10px 15px;
  margin-right: 10px;
  cursor: pointer;
}

button:last-child {
  margin-right: 0;
}

.end-party-btn {
  background-color: red;
  color: white;
}

.qr-section {
  text-align: center; /* Centers the text and QR code within the section */
  padding: 20px;
  background-color: #f4f4f4; /* Gives a subtle background to the QR section */
  border-radius: 8px; /* Adds rounded corners to the QR section */
}
</style>
