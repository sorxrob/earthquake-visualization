<template>
	<div style="height: 100%; width: 100%;">
		<Map />
		<InfoDialog />
		<Loader />
	</div>
</template>

<script>
import Map from '@/components/Map';
import InfoDialog from '@/components/InfoDialog';
import Loader from '@/components/Loader';

export default {
	data: () => ({
		markers: []
	}),
	async created () {
		this.$store.commit('SHOW_LOADER', 'Fetching earthquakes. Please wait...');
		try {
			await this.$store.dispatch('FIND_EARTHQUAKES');
		} catch (error) {
			console.log(error);
		}
		this.$store.commit('HIDE_LOADER');
	},
	components: {
		Map,
		InfoDialog,
		Loader
	}
}
</script>
