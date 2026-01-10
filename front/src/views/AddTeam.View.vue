<template>
	<div class="ajout-equipe">
		<h2>Ajouter une équipe</h2>
		<form @submit.prevent="ajouterEquipe">
			<div>
				<label for="nom">Nom de l'équipe :</label>
				<input
					type="text"
					id="nom"
					v-model="addTeam.name"
					required
					placeholder="Ex: Les fous des roulette" />
			</div>
			<div class="form-group">
				<label for="players">Joueurs :</label>
				<select name="" id=""></select>
			</div>
			<button type="submit" class="btn-ajouter">Ajouter</button>
		</form>
	</div>
</template>

<script setup lang="ts">
import type { AddTeam } from '@/type/team';
import { reactive } from 'vue';

const addTeam = reactive<AddTeam>({ name: '', users: [] });
function ajouterEquipe() {
	if (!addTeam.name || !addTeam.users.length) {
		alert('Veuillez remplir tous les champs.');
		return;
	}

	// fetch POST API
	// emit('equipe-ajoutee',addTeam);

	// Réinitialiser le formulaire
	addTeam.name = '';
	addTeam.users = [];
}
</script>
