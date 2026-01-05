<template>
	<div>
		<h2>Ajout Tournois</h2>

		<form @submit.prevent="addTournament()">
			<div>
				<label>Nom du tournoi</label>
				<input type="text" v-model="form.name" required />
			</div>

			<div>
				<label>Description du tournoi</label>
				<input type="text" v-model="form.description" required />
			</div>

			<div>
				<label>Date du tournoi</label>
				<input type="datetime-local" v-model="form.date" required />
			</div>

			<button type="submit" :disabled="loading">
				{{ loading ? 'Saving...' : 'Create' }}
			</button>
		</form>
		<p v-if="error" style="color: red">{{ error }}</p>
		<p v-if="success" style="color: green">Tournois crée ✅</p>
	</div>
</template>

<script setup lang="ts">
import { apiUrl, endpointsRoute } from '@/const';
import type { AddTournament } from '@/type/tournament';
import { ref } from 'vue';

const loading = ref(false);
const form = ref<AddTournament>({
	date: '',
	description: '',
	name: '',
});
const error = ref<string | null>(null);
const success = ref(false);

async function addTournament() {
	const url = new URL(endpointsRoute.TOURNAMENTS, apiUrl);
	try {
		loading.value = true;
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				name: form.value.name,
				description: form.value.description,
				date: toUtcISOString(form.value.date),
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('Erreur lors de la création du tournois');
		}

		//reset du formulaire
		form.value.name = '';
		form.value.description = '';
		form.value.date = '';
		success.value = true;
	} catch (err) {
		if (err instanceof Error) {
			error.value = err.message;
		}
	} finally {
		loading.value = false;
	}
}
/**
 * Converti une date local au format UTC
 */
function toUtcISOString(localDateString: string) {
	const localDate = new Date(localDateString);
	return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();
}
</script>

<style scoped>
h2 {
	margin-bottom: 10px;
}
</style>
