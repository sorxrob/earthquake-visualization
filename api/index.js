const express = require('express');
const app = express();
const axios = require('axios');

app.get('/earthquakes', async (req, res, next) => {
	try {
		const { summary } = req.query;
		const response = await axios(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${summary}.geojson`);
		return res.json({
			success: true,
			features: response.data.features.map(({ properties, geometry }) => {
				return {
					properties,
					depth: geometry.coordinates[2],
					position: {
						lat: geometry.coordinates[1],
						lng: geometry.coordinates[0]
					}
				}
			})
		});
	} catch (error) {
		return res.json({
			success: false,
			message: 'Server error'
		});
	}
});

module.exports = {
	path: '/api',
	handler: app
}
