const exchangesList = require('../entity/exchanges'); 

class MarketController {
    constructor(service) {
        this.service = service;
    }

    async getAverageMidPrice(req, res) {
        const { exchanges } = req.params;
        // check params
        if (!exchanges.every(exchange => exchangesList.includes(exchange))) {
            return res.status(400).json({ error: 'Invalid exchanges provided' });
        }

        try {
            const averageMarketData = await this.service.calculateAndSaveAverageMidPrice(exchanges);
            return res.status(200).json({ averageMarketData });
        } catch (error) {
            console.error('Error occurred while calculating average mid price:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = MarketController;
