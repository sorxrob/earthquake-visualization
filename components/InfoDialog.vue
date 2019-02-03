<template>
	<div>
		<v-bottom-sheet v-model="dialog" hide-overlay persistent inset max-width="600">
			<v-card>
				<v-card-title class="py-2">
					<div class="headline" v-html="details.properties.place"></div>
					<v-spacer></v-spacer>
					<v-btn flat icon @click="$store.commit('CLOSE_SHEET')">
						<v-icon>arrow_drop_down</v-icon>
					</v-btn>
				</v-card-title>
				<v-divider></v-divider>
				<v-card-text class="py-2">
					Magnitude: {{ details.properties.mag }} <br />
					Time: {{ details.properties.time }} <br />
					Depth: {{ details.depth }} km <br />
					More: <a class="white--text" :href="details.properties.url" target="_BLANK" v-html="details.properties.url"></a>
				</v-card-text>
			</v-card>
		</v-bottom-sheet>
	</div>
</template>

<script>
export default {
	computed: {
		dialog () {
			return this.$store.state.sheet;
		},
		details () {
			return this.$store.state.selected;
		}
	}
}
</script>
