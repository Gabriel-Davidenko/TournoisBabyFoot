<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
	<h1>Babyfoots</h1>
	<nav>
		<ul>
			<li><router-link to="/tournaments">Tournois</router-link></li>
		</ul>
	</nav>
	<router-view class="row" />
</template>

<style scoped></style>
