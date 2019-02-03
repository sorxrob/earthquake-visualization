import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
	load: {
		key: "AIzaSyCgNkOTZHhxuOX8zq_Vw00XbSH3odvRFV8",
		libraries: "places"
	}
});
