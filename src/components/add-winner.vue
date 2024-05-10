<template>
  <div>
    <div v-for="(selection, index) in selections" :key="index">
      <v-select
          :options="availableCountries"
          label="country"
          v-model="selection.selectedCountry"
          @input="updateAvailableCountries"
      />
    </div>
    <button :disabled="!canSubmit" @click="submitWinners">Submit</button>
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css';
import VSelect from 'vue-select';
import jsonData from '@/assets/countries.json'; // Importing the JSON data
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import awsconfig from "@/amplifyconfiguration.json";
Amplify.configure(awsconfig);

const client = generateClient();
import {createVote, createWinner} from '@/graphql/mutations';

export default {
  name: 'AddWinner',
  components: { VSelect },
  data() {
    return {
      selections: [
        { selectedCountry: null },
        { selectedCountry: null },
        { selectedCountry: null }
      ],
      countries: [],
    };
  },
  computed: {
    availableCountries() {
      const selectedCountries = this.selections.map(sel => sel.selectedCountry).filter(c => c);
      return this.countries.filter(country => !selectedCountries.includes(country));
    },
    canSubmit() {
      return this.selections.every(sel => sel.selectedCountry);
    }
  },
  methods: {
    updateAvailableCountries() {
      // Recalculate available countries after each selection
      this.$forceUpdate();
    },
    async submitWinners() {
      for (let i = 0; i < this.selections.length; i++) {
        const country = this.selections[i].selectedCountry;
        const place = i + 1;
        const voteInput = {
          input: {
            country,
            place
          }
        };
        const response = await client.graphql({
          query: createVote,  // Make sure the createVote is imported if it's defined externally
          variables: { input: voteInput }
        });
        console.log('Vote submitted:', response.data.createVote);
      }
      alert('Winners submitted successfully!', );
    },
    loadCountries() {
      this.countries = jsonData.map((country, index) => ({
        id: index,
        ...country
      }));
    }
  },
  mounted() {
    this.loadCountries();
  }
};
</script>
