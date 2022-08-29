module.exports = {
	apps: [
		{
			name: 'real-estate-app-back',
			script: './dist/main.js',
			watch: false,
			instances: 1,
		},
	],
};
