import AddTournamentView from '@/views/AddTournamentView.vue';
import TournamentDetailView from '@/views/TournamentDetailView.vue';
import TournamentsView from '@/views/TournamentsView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: 'TournamentsView',
			path: '/tournaments',
			component: TournamentsView,
		},
		{
			name: 'AddTournamentsView',
			path: '/add-tournaments',
			component: AddTournamentView,
		},
		{
			name: 'TournamentDetail',
			path: '/tournaments/:id',
			component: TournamentDetailView,
			props: true,
		},
	],
});

export default router;
