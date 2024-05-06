import { createRouter, createWebHashHistory } from 'vue-router';
import JoinParty from '@/components/join-party-view.vue';
import Voting from '@/components/vote-view.vue';
import Admin from '@/components/admin-view.vue';
import Results from '@/components/results-view.vue';

const routes = [
    { path: '/', name: 'JoinParty', component: JoinParty },
    { path: '/voting', name: 'Voting', component: Voting },
    { path: '/admin', name: 'Admin', component: Admin },
    { path: '/results', name: 'Results', component: Results }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;