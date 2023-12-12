var express = require('express');
var MarketService = require('./service/MarketService');
var MarketController = require('./controller/MarketController');
var app = express();
var service = new MarketService();
var controller = new MarketController(service);
app.use(express.json());
var exchangesList = require('./entity/exchanges');
// router
app.get('/api/getAverageMidPrice/:exchanges', function (req, res) {
    controller.getAverageMidPrice(req, res);
});
var PORT = 3000;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
