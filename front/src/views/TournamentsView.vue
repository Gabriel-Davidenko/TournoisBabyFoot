<template>
	<div>
		<h2>Tournois</h2>

		<p v-if="loading">Chargement...</p>
		<p v-else-if="error">{{ error }}</p>

		<ul v-else>
			<li v-for="tournament in tournaments" :key="tournament.id">
				<router-link :to="`/tournaments/${tournament.id}`">
					{{ tournament.name }}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { apiUrl, endpointsRoute } from '@/const';
import type { Tournament } from '@/type/tournament';
import { ref, onMounted } from 'vue';

const tournaments = ref<Tournament[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function fetchData() {
	try {
		const url = new URL(endpointsRoute.TOURNAMENTS, apiUrl);
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error('Erreur lors du fetch');
		}

		tournaments.value = await response.json();
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

<style scoped>
h2 {
	margin-bottom: 10px;
}
</style>
