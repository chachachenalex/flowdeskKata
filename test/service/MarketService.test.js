"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const MarketService_1 = require("../../src/service/MarketService");
const MarketRepository_1 = require("../../src/repository/MarketRepository");
const MarketData_1 = require("../../src/entity/MarketData");
jest.mock('../../src/repository/MarketRepository', () => ({
    MarketRepository: {
        save: jest.fn(),
    },
}));
describe('MarketService', () => {
    let marketService;
    beforeEach(() => {
        marketService = new MarketService_1.MarketService({ save: MarketRepository_1.MarketRepository.save });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call saveMarketDataToDB with correct data', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockMarketData = new MarketData_1.MarketData('testExchange', new Date(), 150);
        yield marketService.saveMarketDataToDB(mockMarketData);
        expect(MarketRepository_1.MarketRepository.save).toHaveBeenCalledWith(mockMarketData);
    }));
});
//# sourceMappingURL=MarketService.test.js.map