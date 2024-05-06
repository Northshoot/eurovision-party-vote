<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import {createRouter, createWebHashHistory} from 'vue-router';
import JoinParty from '@/components/join-party-view.vue';
import Voting from '@/components/vote-view.vue';
import Admin from '@/components/admin-view.vue';
import Results from '@/components/results-view.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {path: '/', component: JoinParty},
    {path: '/voting', component: Voting},
    {path: '/admin', component: Admin},
    {path: '/results', component: Results}
  ]
});

export default {
  name: 'App',
  router
}
</script>

<style>
#app {
  font-family: 'Poppins', sans-serif;
  color: #fff;
  margin-top: 0;
  background-color: #1a1a2e;
  background-image: linear-gradient(315deg, #1a1a2e 0%, #b21f1f 74%);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
