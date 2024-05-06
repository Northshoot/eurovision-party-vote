<template>
  <div class="results-container">
    <div class="winner" v-if="winner">
      <h1>Winner: {{ winner.country }}</h1>
      <h2>{{ winner.artist }} - {{ winner.song }}</h2>
      <p>Points: {{ winner.points }}</p>
    </div>
    <ul class="other-participants">
      <li v-for="entry in sortedParticipants" :key="entry.country">
        {{ entry.country }}: {{ entry.points }} points
      </li>
    </ul>
  </div>
</template>

<script>
import 'animate.css';

export default {
  props: {
    results: Array
  },
  computed: {
    sortedParticipants() {
      return this.results.slice().sort((a, b) => b.points - a.points);
    },
    winner() {
      return this.sortedParticipants[0];
    }
  }
}
</script>

<style scoped>
.results-container {
  text-align: center;
  color: #fff;
  background-color: #6200ea; /* Deep purple */
}

.winner h1 {
  animation: bounce; /* Animate.css */
  animation-duration: 2s;
}

.winner {
  font-size: 24px;
  padding: 20px;
  background-color: #03dac6; /* Mint */
  border-radius: 10px;
  margin: 20px auto;
  width: 80%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.other-participants {
  list-style: none;
  padding: 0;
}

.other-participants li {
  margin: 10px 0;
}
</style>
