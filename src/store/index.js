// store/index.js
import { createStore } from 'vuex';
import votes from './modules/votes';

export default createStore({
    state: {
        availableVotes: [12, 10, 8, 7, 6, 5, 4, 3, 2, 1],
        usedVotes: []
    },
    mutations: {
        CAST_VOTE(state, vote) {
            if (!state.usedVotes.includes(vote)) {
                state.usedVotes.push(vote);
                state.availableVotes = state.availableVotes.filter(v => !state.usedVotes.includes(v));
            }
            console.log('Votes after cast:', state.availableVotes);
        },
        REMOVE_VOTE(state, vote) {
            const index = state.usedVotes.indexOf(vote);
            if (index !== -1) {
                state.usedVotes.splice(index, 1);
                state.availableVotes.push(vote);
                state.availableVotes.sort((a, b) => b - a); // Sorting in descending order to maintain the initial order
            }
            console.log('Votes after removal:', state.availableVotes, 'Used Votes:', state.usedVotes);
        }
    },
    actions: {
        castVote({ commit }, vote) {
            commit('CAST_VOTE', vote);
        },
        removeVote({ commit }, vote) {
            commit('REMOVE_VOTE', vote);
        }
    },
    modules: {
        votes
    }
});
