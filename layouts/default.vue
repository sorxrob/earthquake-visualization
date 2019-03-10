<template>
	<v-app id="inspire" :dark="$store.state.darkMode">
		<v-navigation-drawer v-model="drawer" clipped fixed left app>
			<v-list dense two-line>
				<v-list-tile v-for="m in markers" @click="$store.commit('SET_SELECTED', m)" ripple avatar :key="m.properties.code">
					<v-list-tile-action v-html="m.properties.mag"></v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title v-html="m.properties.place"></v-list-tile-title>
						<v-list-tile-sub-title v-html="m.properties.time"></v-list-tile-sub-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar app fixed clipped-left>
			<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
			<v-toolbar-title>
				<span class="hidden-sm-and-down">
					Latest Earthquakes
				</span>
				<span class="hidden-md-and-up">
					Earthquakes
				</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<Menu />
				<v-btn flat icon @click="refresh">
					<v-icon>refresh</v-icon>
				</v-btn>
				<v-btn flat icon @click.stop="settingsDialog = true">
					<v-icon>settings</v-icon>
				</v-btn>
			</v-toolbar-items>
		</v-toolbar>
		<v-content>
			<nuxt />
		</v-content>
		<v-dialog v-model="settingsDialog" max-width="400" persistent>
			<v-card>
				<v-card-title primary-title>
					<div class="headline">Settings</div>
					<v-spacer></v-spacer>
					<v-btn flat icon @click="settingsDialog = false">
						<v-icon>close</v-icon>
					</v-btn>
				</v-card-title>
				<v-divider></v-divider>
				<v-card-text>
					<v-list>
						<v-list-tile>
							<v-list-tile-content>
								Dark Mode
							</v-list-tile-content>
							<v-list-tile-action>
								<v-switch color="light" v-model="$store.state.darkMode"></v-switch>
							</v-list-tile-action>
						</v-list-tile>
					</v-list>
				</v-card-text>
			</v-card>
		</v-dialog>
		<v-footer app fixed class="px-2">
			<v-spacer></v-spacer>
			<span>Powered by USGS API &copy; {{ (new Date()).getFullYear() }}</span>
		</v-footer>
	</v-app>
</template>

<script>
import Menu from '@/components/Menu';
import { mapGetters } from 'vuex';

export default {
	data: () => ({
		drawer: null,
		settingsDialog: false
	}),
	created () {
		if (process.browser && localStorage.getItem('latest_earthquakes_dark_mode')) {
			this.$store.commit('SET_DARK_MODE', localStorage.getItem('latest_earthquakes_dark_mode'));
		}
	},
	methods: {
		async refresh () {
			this.$store.commit('SHOW_LOADER', 'Fetching earthquakes. Please wait...');
			try {
				await this.$store.dispatch('FIND_EARTHQUAKES');
			} catch (error) {
				console.log(error);
			}
			this.$store.commit('HIDE_LOADER');
		}
	},
	computed: {
		markers () {
			return this.$store.getters['GET_MARKERS'];
		}
	},
	components: {
		Menu
	},
	watch: {
		'$store.state.darkMode' (val) {
			localStorage.setItem('latest_earthquakes_dark_mode', val);
		}
	}
}
</script>
