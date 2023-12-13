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
        it('should save data', async () => {
            //when
            await marketRepository.save(/* Your test data */);
            //then
            expect(createConnection).toHaveBeenCalled();
        });

    });

    describe('findAll', () => {
        it('should find all data', async () => {
            //when
            await marketRepository.findAll();
            //then
            expect(createConnection).toHaveBeenCalled();
        });

    });

    afterAll(() => {
        jest.clearAllMocks();
    });
});
