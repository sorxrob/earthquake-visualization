<template>
	<v-dialog v-model="loader" persistent width="300">
		<v-card color="primary" dark>
			<v-card-text>
				<v-layout row wrap>
					<v-flex xs3>
						<v-progress-circular indeterminate color="white"></v-progress-circular>
					</v-flex>
					<v-flex xs9>
						{{message}}
					</v-flex>
				</v-layout>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	computed: {
		loader () {
			return this.$store.state.loader;
		},
		message () {
			return this.$store.state.loaderMessage;
		}
	}
}
</script>
