<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
	<h1>Babyfoots</h1>
	<nav>
		<ul>
			<li><router-link to="/tournaments">Tournois</router-link></li>
			<li><router-link to="/add-tournaments">Ajout Tournois</router-link></li>
			<li><router-link to="/teams">Equipes</router-link></li>
		</ul>
	</nav>
	<router-view class="row" />
</template>

<style scoped></style>
