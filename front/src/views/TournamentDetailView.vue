<template>
	<div>
		<p v-if="loading">Chargement</p>
		<p v-else-if="error" style="color: red">{{ error }}</p>

		<div v-else>
			<h3>Nom : {{ tournament?.name }}</h3>
			<p>{{ tournament?.description }}</p>
			<p>Date : {{ tournament?.date?.toLocaleString() }}</p>
		</div>

		<div>
			<h4>Equipes :</h4>
			<div v-if="teams.length">
				<li v-for="team in teams" :key="team.id">
					<ul>
						<routerLink :to="`/team/${team.id}`">{{ team.name }}</routerLink>
					</ul>
				</li>
			</div>
			<p v-else>Il n'y a pas encore d'équipes insrites au tournoi</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { apiUrl, endpointsRoute } from '@/const';
import type { Team } from '@/type/team';
import type { Tournament } from '@/type/tournament';
import { onMounted, ref } from 'vue';

interface Props {
	id: string;
}

const props = defineProps<Props>();

const error = ref<null | string>(null);
const loading = ref(true);
const tournament = ref<Tournament | null>(null);
const teams = ref<Team[]>([]);

/**
 * Appel l'api pour récupérer un tournois
 */
async function fetchData(id: string) {
	loading.value = true;
	error.value = null;
	const tournamentUri = endpointsRoute.TOURNAMENTS + '/' + id;
	const tournamentUrl = new URL(tournamentUri, apiUrl);
	try {
		const response = await fetch(tournamentUrl);

		if (!response.ok) {
			throw new Error('Erreur lors de la récupération du tournoi');
		}
		tournament.value = await response.json();

		const teamUrl = new URL(tournamentUri + '/' + endpointsRoute.TEAMS, apiUrl);

		const teamsResponse = await fetch(teamUrl);

		if (!teamsResponse.ok) {
			throw new Error('Erreur lors de la récupération des équipes du tournoi');
		}

		teams.value = await teamsResponse.json();
	} catch (err) {
		if (err instanceof Error) {
			error.value = err.message;
		}
	} finally {
		loading.value = false;
	}
}

onMounted(() => {
	fetchData(props.id);
});
</script>
