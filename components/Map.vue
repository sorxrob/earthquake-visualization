<template>
	<GmapMap :options="options" :center="center" :zoom="2" map-type-id="terrain" style="width: 100%; height: 100%; position: relative;">
		<GmapMarker
		:key="index"
		v-for="(m, index) in markers"
		:position="m.position"
		:clickable="true"
		:icon="m.icon"
		@click="$store.commit('SET_SELECTED', m)"
		/>
	</GmapMap>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data: () => ({
		options: {
			styles: [
			{
				"featureType": "all",
				"elementType": "all",
				"stylers": [
				{
					"saturation": -100
				},
				{
					"gamma": 0.5
				}
				]
			}
			]
		}
	}),
	computed: {
		...mapGetters({
			markers: 'GET_MARKERS',
			center: 'GET_CENTER'
		})
	}
}
</script>
