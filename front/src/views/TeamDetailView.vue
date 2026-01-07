<template>
	<div>
		<p v-if="loading">Chargement</p>
		<p v-else-if="error" style="color: red">{{ error }}</p>

		<div v-else>
			<h2>Equipe: {{ team?.name }}</h2>
			<!-- Ajouter les matchs et les championats inscrits plus tard -->
		</div>
	</div>
</template>

<script setup lang="ts">
import { apiUrl, endpointsRoute } from '@/const';
import type { Team } from '@/type/team';
import { onMounted, ref } from 'vue';
interface TeamProps {
	id: string;
}

const props = defineProps<TeamProps>();
const error = ref<string | null>(null);
const loading = ref<boolean>(true);

const team = ref<Team | null>(null);

async function fetchData(parameters: TeamProps) {
	loading.value = true;
	error.value = null;

	const tournamentUri = endpointsRoute.TEAMS + '/' + parameters.id;
	const tournamentUrl = new URL(tournamentUri, apiUrl);
	try {
		const response = await fetch(tournamentUrl);

		if (!response.ok) {
			throw new Error("Erreur lors de la récupération de l'équipe");
		}
		team.value = await response.json();
		console.log({ team });
	} catch (err) {
		if (err instanceof Error) {
			error.value = err.message;
		}
	} finally {
		loading.value = false;
	}
}

onMounted(() => {
	fetchData(props);
});
</script>
