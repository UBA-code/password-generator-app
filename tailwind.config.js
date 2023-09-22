/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./srcs/**/*.{html,js}',
		'./index.html'
	],
	theme: {
		extend:{
			colors: {
				'green': '#a1feb1',
				'bodyBackground': '#191820',
				'textLightGray': '#7e798e',
				'bgLightGray': '#23222a',
				'blackText': '#1c1d23',
				'lightOrange': '#f8cb63'
			},
			width: {
				'desktop': '40rem',
			},
			fontFamily: {
				'body-font': 'JetBrains Mono',
			},
			container:{
				center: true,
			}
		}
	}
}
