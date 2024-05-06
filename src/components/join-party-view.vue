<template>
  <div class="join-party">
    <input v-model="username" placeholder="Enter your username" />
    <input v-model="partyId" placeholder="Enter party ID" />
    <button @click="joinParty">Join Party</button>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../App.vue'; // Import router from your router setup file

export default {
  data() {
    return {
      username: '',
      partyId: ''
    };
  },
  methods: {
    joinParty() {
      axios.post('/api/join', { username: this.username, partyId: this.partyId })
          .then(response => {
            // Assuming the response contains the party name and it's valid
            const partyName = response.data.partyName;
            router.push({ name: 'Vote', query: { partyName: partyName } });
          })
          .catch(error => {
            console.error('Error joining party:', error);
            // Handle error, possibly show user-friendly message
          });
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
