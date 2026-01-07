<template>
	<div>
		<h2>Equipes</h2>
		<p v-if="loading">Chargement...</p>
		<p v-else-if="error">{{ error }}</p>

		<ul v-else>
			<li v-for="team in teams" :key="team.id">
				<routerLink :to="`/teams/${team.id}`">{{ team.name }}</routerLink>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { apiUrl, endpointsRoute } from '@/const';
import type { Team } from '@/type/team';
import { ref, onMounted } from 'vue';
const error = ref<string | null>(null);
const loading = ref<boolean>(true);

const teams = ref<Team[]>([]);

async function fetchData() {
	loading.value = true;
	error.value = null;

	const tournamentUri = endpointsRoute.TEAMS;
	const tournamentUrl = new URL(tournamentUri, apiUrl);
	try {
		const response = await fetch(tournamentUrl);

		if (!response.ok) {
			throw new Error("Erreur lors de la récupération de l'équipe");
		}
		teams.value = await response.json();
	} catch (err) {
		if (err instanceof Error) {
			error.value = err.message;
		}
	} finally {
		loading.value = false;
	}
}
onMounted(() => {
	fetchData();
});
</script>
