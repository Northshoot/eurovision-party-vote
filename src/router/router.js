import { createRouter, createWebHashHistory } from 'vue-router';
import JoinPartyView from '@/components/join-party-view.vue';
import VoteView from '@/components/vote-view.vue';
import AdminView from '@/components/admin-view.vue';
import ResultsView from '@/components/results-view.vue';
import AddWinner from '@/components/add-winner.vue';

const routes = [
    { path: '/', name: 'JoinParty', component: JoinPartyView },
    { path: '/voting', name: 'Voting', component: VoteView },
    { path: '/admin', name: 'Admin', component: AdminView },
    { path: '/results', name: 'Results', component: ResultsView },
    { path: '/winner', name: 'AddWinner', component: AddWinner },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


export default router;