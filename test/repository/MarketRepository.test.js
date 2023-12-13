var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const MarketRepository = require('../../src/repository/MarketRepository');
const { createConnection } = require('typeorm');
jest.mock('typeorm', () => ({
    createConnection: jest.fn(),
}));
describe('MarketRepository', () => {
    let marketRepository;
    beforeAll(() => {
        createConnection.mockResolvedValue({
            getRepository: jest.fn(() => ({
                save: jest.fn(),
                find: jest.fn(),
            })),
            close: jest.fn(),
        });
        marketRepository = new MarketRepository();
    });
    describe('save', () => {
        it('should save data', () => __awaiter(this, void 0, void 0, function* () {
            // Your test logic here
            yield marketRepository.save( /* Your test data */);
            expect(createConnection).toHaveBeenCalled();
            // Add more assertions based on your save method logic
        }));
        // Add more test cases for edge cases, error handling, etc.
    });
    describe('findAll', () => {
        it('should find all data', () => __awaiter(this, void 0, void 0, function* () {
            // Your test logic here
            yield marketRepository.findAll();
            expect(createConnection).toHaveBeenCalled();
            // Add more assertions based on your findAll method logic
        }));
        // Add more test cases for edge cases, error handling, etc.
    });
    afterAll(() => {
        jest.clearAllMocks();
    });
});
//# sourceMappingURL=MarketRepository.test.js.map