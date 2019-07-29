const config = {
    random: () => {
        return Math.random().toString(36).substr(2);
    },
    baseUrl: "http://127.0.0.1:3000",
    apiKey: 'KEY'
}

module.exports = config;