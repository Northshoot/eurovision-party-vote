<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from './amplifyconfiguration.json';
import router from "@/router/router";
Amplify.configure(config);

const client = generateClient();

export default {
  name: 'App',
  client,

  router,
  mounted() {
      this.$watch(() => this.$router.currentRoute, (newRoute) => {
        console.log('Current route:', newRoute.path);
      }, { immediate: true });
    }
};
</script>

<style>
/* Base styles for the app */
#app {
  font-family: 'Arial', sans-serif;
  color: #333;
  min-height: 100vh;
  background: linear-gradient(45deg, #e53e3e, #dd6b20, #faf089, #48bb78, #81e6d9, #d53f8c);
  background-size: 600% 600%;
  animation: GradientFlow 16s ease infinite;
}

/* Animation for background gradient flow */
@keyframes GradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Generic button styles for voting */
button {
  font-size: 1em;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Responsive adjustments */
@media (max-width: 900px) {
  #app {
    font-size: 14px;
  }
}
</style>

