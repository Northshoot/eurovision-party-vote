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
#app {
  //font-family: 'Poppins', sans-serif;
  //color: #fff;
  //margin-top: 0;
  //background-color: #1a1a2e;
  //background-image: linear-gradient(315deg, #1a1a2e 0%, #b21f1f 74%);
  //height: 100vh;
  //display: flex;
  //justify-content: center;
  //align-items: center;
  //text-align: center;
}
</style>
