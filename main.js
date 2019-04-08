let weatherApp = new Vue({
	el: '#app',
	data: {
		search: 'London,uk',
		currentTemp: '',
		minTemp: '',
		maxTemp: '',
		sunrise: '',
		sunset: '',
		pressure: '',
		humidity: '',
		wind: '',
		overcast: '',
		icon: ''
	},
	methods: {
		getWeather() {
			axios
				.get('http://api.openweathermap.org/data/2.5/weather', {
					params: {
						q: this.search,
						units: 'metric',
						APPID: 'ec30838a0dfa2b506c06d2308d3de8d1',
					}
				})
				.then(response => {
					this.currentTemp = response.data.main.temp;
					this.minTemp = response.data.main.temp_min;
					this.maxTemp = response.data.main.temp_max;
					this.pressure = response.data.main.pressure;
					this.humidity = response.data.main.humidity + '%';
					this.wind = response.data.wind.speed + 'm/s';
					this.overcast = response.data.weather[0].description;
					this.icon = "images/" + response.data.weather[0].icon.slice(0, 2) + ".svg";
					this.sunrise = new Date(response.data.sys.sunrise * 1000).toLocaleTimeString("en-GB").slice(0, 4);
					this.sunset = new Date(response.data.sys.sunset * 1000).toLocaleTimeString("en-GB").slice(0, 4);
				})
				.catch(error => {
					console.log(error);
				});
		},
	},
	beforeMount() {
		this.getWeather();
	},
});