import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment';

Vue.use(Vuex);

const store = () => {
	return new Vuex.Store({
		state: {
			markers: [],
			selected: {
				properties: {},
				position: {}
			},
			sheet: false,
			center: {
				lat: 20,
				lng: -160
			},
			autoUpdate: false,
			loader: false,
			loaderMessage: null,
			darkMode: true
		},
		getters: {
			GET_MARKERS: (state) => state.markers.map((marker) => {
				marker.properties.time = moment(marker.properties.time).format('MMM D, YYYY, h:mm:ss a');
				marker.icon = {
					path: google.maps.SymbolPath.CIRCLE,
					scale: Math.exp(parseFloat(marker.properties.mag)) * 0.1,
					fillColor: '#f00',
					fillOpacity: 0.35,
					strokeWeight: 0
				}
				return marker;
			}),
			GET_CENTER: state => state.center
		},
		mutations: {
			SET_MARKERS (state, payload) {
				state.markers = payload;
			},
			SET_SELECTED (state, payload) {
				state.selected = payload;
				console.log(payload);
				state.center = payload.position;
				state.sheet = true;
			},
			SET_CENTER (state, payload) {
				state.center = payload;
			},
			CLOSE_SHEET (state, payload) {
				state.sheet = false;
			},
			SHOW_LOADER (state, payload) {
				state.loaderMessage = payload;
				state.loader = true;
			},
			HIDE_LOADER (state, payload) {
				state.loaderMessage = null;
				state.loader = false;
			}
		},
		actions: {
			async FIND_EARTHQUAKES ({ commit }, summary = 'all_day') {
				try {
					const res = await axios(`/api/earthquakes?summary=${summary}`);
					if (res.data.success) {
						commit('SET_MARKERS', res.data.features);
					}
					return;
				} catch (error) {
					throw error;
				}
			}
		}
	});
}

export default store;
