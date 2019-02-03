<template>
	<v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" bottom left>

		<v-btn icon flat slot="activator">
			<v-icon>filter_list</v-icon>
		</v-btn>

		<v-card>
			<v-card-title>Filter</v-card-title>
			<v-divider></v-divider>
			<v-card-text class="py-1">
				<v-radio-group v-model="selected" column>
					<v-radio label="Today" value="all_day" dark color="red"></v-radio>
					<v-radio label="All week" value="all_week" dark color="red"></v-radio>
				</v-radio-group>
				*More filters soon!
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn flat @click="menu = false">Close</v-btn>
			</v-card-actions>
		</v-card>
	</v-menu>
</template>

<script>
export default {
	data: () => ({
		menu: false,
		selected: 'all_day'
	}),
	watch: {
		async selected (val) {
			this.$store.commit('SHOW_LOADER', 'Fetching earthquakes. Please wait...');
			try {
				await this.$store.dispatch('FIND_EARTHQUAKES', val);
			} catch (error) {
				console.log(error);
			}
			this.$store.commit('HIDE_LOADER');
		}
	}
}
</script>
