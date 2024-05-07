// store/index.js
import { createStore } from 'vuex';

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
        }
    },
    actions: {
        castVote({ commit }, vote) {
            commit('CAST_VOTE', vote);
        }
    }
});
