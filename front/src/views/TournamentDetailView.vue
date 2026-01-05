<template>
	<div>
		<p v-if="loading">Chargement</p>
		<p v-else-if="error" style="color: red">{{ error }}</p>

		<div v-else>
			<h3>Nom : {{ tournament?.name }}</h3>
			<p>{{ tournament?.description }}</p>
			<p>Date : {{ tournament?.date?.toLocaleString() }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { apiUrl, endpointsRoute } from '@/const';
import type { Tournament } from '@/type/tournament';
import { onMounted, ref } from 'vue';

interface Props {
	id: string;
}

const props = defineProps<Props>();

const error = ref<null | string>(null);
const loading = ref(true);
const tournament = ref<Tournament | null>(null);

/**
 * Appel l'api pour récupérer un tournois
 */
async function fetchTournament(id: string) {
	loading.value = true;
	error.value = null;

	const url = new URL(endpointsRoute.TOURNAMENTS + '/' + id, apiUrl);
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error('Erreur lors de la récupération du tournoi');
		}
		tournament.value = await response.json();
	} catch (err) {
		if (err instanceof Error) {
			error.value = err.message;
		}
	} finally {
		loading.value = false;
	}
}

onMounted(() => {
	fetchTournament(props.id);
});
</script>
