<template>
  <div class="centered-wrapper">
    <h1>Add Winners</h1>
    <div>
      <label for="party-select">Select a Party:</label>
      <select id="party-select" v-model="selectedParty" >
        <option disabled value="">Please select one</option>
        <option v-for="party in parties" :key="party.id" :value="party.id">
          {{ party.name }}
        </option>
      </select>
    </div>
    <div v-for="(selection, index) in selections" :key="index">
      <select v-model="selection.selectedCountry" @change="updateAvailableCountries">
        <option disabled value="">Select a country</option>
        <option v-for="country in availableCountries" :key="country.id" :value="country">
          {{ country.country }}
        </option>
      </select>
    </div>
    <button :disabled="!canSubmit" @click="submitWinners">Submit</button>
  </div>
</template>

<script>
import jsonData from '@/assets/countries.json'; // Importing the JSON data
import { Amplify} from "aws-amplify";
import awsconfig from "@/amplifyconfiguration.json";
import { createWinner } from '@/graphql/mutations';
import { listParties } from '@/graphql/queries';
import {generateClient} from "aws-amplify/api";

Amplify.configure(awsconfig);
const client = generateClient();

export default {
  name: 'AddWinner',
  data() {
    return {
      selections: [
        { selectedCountry: null },
        { selectedCountry: null },
        { selectedCountry: null }
      ],
      countries: [],
      parties: [],
      selectedParty: null
    };
  },
  computed: {
    availableCountries() {
      const selectedCountries = this.selections.map(sel => sel.selectedCountry).filter(country => country !== null);
      return this.countries.filter(country => !selectedCountries.includes(country));
    },
    canSubmit() {
      return this.selections.every(sel => sel.selectedCountry !== null);
    }
  },
  methods: {
    updateAvailableCountries() {
      // Simple reactivity handling
    },
    async submitWinners() {
      try {
        for (let i = 0; i < this.selections.length; i++) {
          const country = this.selections[i].selectedCountry;
          const place = i + 1;
          console.log('Submitting winner:', country.country, 'at place', place);
          const createWinnerInput = {
            country: country.country,
            place: place,
            partyId: this.selectedParty
          } ;
          const response = await client.graphql({
            query: createWinner,
            variables: { input: createWinnerInput }
          });
          console.log('Winner submitted:', response.data.createWinner);
        }
        alert('Winners submitted successfully!');
      } catch (error) {
        console.error('Error submitting winners:', error);
      }
    },
    loadCountries() {
      this.countries = jsonData;
      console.log('Countries loaded:', this.countries.length);
    },
    async fetchParties() {
      try {
        const response = await client.graphql({
          query: listParties
        });
        this.parties = response.data.listParties.items;
      } catch (error) {
        console.error('Error fetching parties:', error);
      }
    }
  },
  mounted() {
    this.loadCountries();
    this.fetchParties();
  }
};
</script>

<style scoped>
/* Wrapper that encapsulates the component */
.centered-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box; /* Ensures padding does not affect the overall dimensions */
}

/* Styling for select elements within the component */
.centered-wrapper select {
  width: 200px;
  padding: 8px;
  margin-bottom: 10px; /* Provides spacing between each dropdown */
  cursor: pointer; /* Improves user interaction feedback */
}

/* Styling for buttons within the component */
.centered-wrapper button {
  padding: 10px 20px;
  background-color: #007BFF; /* A distinct blue background */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px; /* Space before the submit button */
}

/* Disabled state for buttons to show less interaction possibility */
.centered-wrapper button:disabled {
  background-color: #ccc;
}
</style>