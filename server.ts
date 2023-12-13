const fs = require('fs');
const path = require('path');

const express = require('express');
const MarketService = require('./src/service/MarketService');
const MarketController = require('./src/controller/MarketController');

const app = express();
const service = new MarketService();
const controller = new MarketController(service);

app.use(express.json());

// get exchanges values from properties file
const configFile = path.resolve(__dirname, './exchanges.json'); // get config file of exchanges
const rawdata = fs.readFileSync(configFile);
const data = JSON.parse(rawdata);
const exchangesList = data.exchanges;

// router
app.get('/api/getAverageMidPrice/:exchanges', (req, res) => {
    controller.getAverageMidPrice(req, res);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
