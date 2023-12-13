import { MarketService } from '../../src/service/MarketService';
import { MarketRepository } from '../../src/repository/MarketRepository';
import { MarketData } from '../../src/entity/MarketData';
import axios from 'axios';
const mockRepository = {
    save: jest.fn(),
};

describe('MarketService', () => {
    let marketService;

    beforeEach(() => {
        marketService = new MarketService(mockRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch market data from exchange', async () => {
        //mock
        const mockExchange = 'testExchange';
        const mockResponse = {
            data: {
                bids: [{ price: 100 }],
                asks: [{ price: 200 }],
            },
        };
        jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);

        const result = await marketService.getMarketData(mockExchange);

        //then
        expect(axios.get).toHaveBeenCalledWith(`https://api.${mockExchange}.com/orderbook/BTCUSDT`);
        expect(result).toBeInstanceOf(MarketData);
    });

    it('should calculate mid price', () => {
        const bestBidPrice = 100;
        const bestAskPrice = 200;

        const result = marketService.calculateMidPrice(bestBidPrice, bestAskPrice);
        //then
        expect(result).toBe(150);
    });

    it('should save market data to database', async () => {
        const mockMarketData = new MarketData('testExchange', new Date(), 150);

        await marketService.saveMarketDataToDB(mockMarketData);

        expect(mockRepository.save).toHaveBeenCalledWith(mockMarketData);
    });

    it('should calculate and save average mid price', async () => {
        //mock
        const exchanges = ['exchange1', 'exchange2'];
        const mockMarketData1 = new MarketData('exchange1', new Date(), 100);
        const mockMarketData2 = new MarketData('exchange2', new Date(), 200);
        jest.spyOn(marketService, 'getMarketData')
            .mockResolvedValueOnce(mockMarketData1)
            .mockResolvedValueOnce(mockMarketData2);
        //when
        await marketService.calculateAndSaveAverageMidPrice(exchanges);

        //then
        expect(mockRepository.save).toHaveBeenCalled();
    });
});
