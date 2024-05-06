<template>
  <div class="party-control">
    <input v-model="partyName" placeholder="Enter party name" />
    <button @click="startParty">Start Party</button>
    <button @click="endParty">End Party</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      partyName: ''
    };
  },
  methods: {
    startParty() {
      axios.post('/api/start', { partyName: this.partyName })
          .then(response => {
            console.log('Party started:', response.data);
            // Handle response
          })
          .catch(error => {
            console.error('Error starting party:', error);
            // Handle error
          });
    },
    endParty() {
      axios.post('/api/end', { partyName: this.partyName })
          .then(response => {
            console.log('Party ended:', response.data);
            // Handle response
          })
          .catch(error => {
            console.error('Error ending party:', error);
            // Handle error
          });
    }
  }
};
</script>

<style scoped>
.party-control input {
  margin-right: 10px;
}
</style>
