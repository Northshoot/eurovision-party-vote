// store/modules/votes.js
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import awsconfig from "@/amplifyconfiguration.json";
import { listVotes } from '@/graphql/queries';

Amplify.configure(awsconfig);

const client = generateClient();


const state = {
    votes: []
};
const mutations = {
    setVotes(state, votes) {
        state.votes = votes;
    }
};
const actions =  {
    async fetchVotes({ commit }, partyId) {
        try {
            // Ensure your GraphQL query accepts a filter for partyId
            const response = await client.graphql({
                query: listVotes,
                variables: {
                    filter: {
                        partyId: {
                            eq: partyId // Using equality condition to match the partyId
                        }
                    },
                    limit: 100 // Optional: adjust based on your needs
                }
            });
            console.log('Votes:', response.data.listVotes.items);
            if (response.data && response.data.listVotes && response.data.listVotes.items) {
                // Aggregating votes by country and summing their points
                const votes = response.data.listVotes.items;
                const pointsByCountry = votes.reduce((acc, vote) => {
                    if (acc[vote.country]) {
                        acc[vote.country] += vote.points; // Sum points for existing country
                    } else {
                        acc[vote.country] = vote.points; // Set initial points for new country
                    }
                    return acc;
                },{});
                const data = Object.entries(pointsByCountry).map(([country, points]) => ({ country, points }));
                console.log('Votes:', data);
                commit('setVotes', data);
            } else {
                console.error('No data returned from the listVotes query.');
            }
        } catch (error) {
            console.error('Error fetching votes:', error);
            // Handle errors appropriately in your application context
        }
    }
}


export default {
    namespaced: true, // If using namespaces, this is important
    state,
    actions,
    mutations
};