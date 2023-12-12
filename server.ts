const express = require('express');
const MarketService = require('./service/MarketService');
const MarketController = require('./controller/MarketController');

const app = express();
const service = new MarketService();
const controller = new MarketController(service);

app.use(express.json());
const exchangesList = require('./entity/exchanges');

// router
app.get('/api/getAverageMidPrice/:exchanges', (req, res) => {
    controller.getAverageMidPrice(req, res);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
