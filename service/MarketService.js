// service/MarketService.js
const axios = require('axios');
const MarketData = require('../entity/MarketData');

class MarketService {
    constructor(repository) {
        this.repository = repository;
    }

    async getMarketData(exchange) {
        try {
            const response = await axios.get(`https://api.${exchange}.com/orderbook/BTCUSDT`);
            const orderBook = response.data;

            const bestBidPrice = orderBook.bids[0].price;
            const bestAskPrice = orderBook.asks[0].price;
            const midPrice = this.calculateMidPrice(bestBidPrice, bestAskPrice);

            const currentTime = new Date();

            return new MarketData(exchange, currentTime, midPrice);
        } catch (error) {
            console.error(`Error fetching data from ${exchange}: ${error}`);
            throw new Error(`Error fetching data from ${exchange}`);
        }
    }

    calculateMidPrice(bestBidPrice, bestAskPrice) {
        return (bestBidPrice + bestAskPrice) / 2;
    }

    async saveMarketDataToDB(data) {
        try {
            return await this.repository.save(data);
        } catch (error) {
            console.error('Error saving market data:', error);
            throw new Error('Error saving market data');
        }
    }

    async calculateAndSaveAverageMidPrice(exchanges) {
        let totalMidPrice = 0;
        let count = 0;

        for (const exchange of exchanges) {
            try {
                const marketData = await this.getMarketData(exchange);
                totalMidPrice += marketData.midPrice;
                count++;
            } catch (error) {
                console.error('Error processing market data:', error);
            }
        }

        if (count === 0) {
            throw new Error('Failed to fetch market data for any exchange');
        }

        const averageMidPrice = totalMidPrice / count;
        const currentTime = new Date();

        const averageMarketData = new MarketData('Average', currentTime, averageMidPrice);

        try {
            await this.saveMarketDataToDB(averageMarketData);
            return averageMarketData;
        } catch (error) {
            console.error('Error saving average market data:', error);
            throw new Error('Error saving average market data');
        }
    }
}

module.exports = MarketService;
