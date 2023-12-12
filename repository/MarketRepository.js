const { EntitySchema, createConnection, getConnection } = require('typeorm');
const MarketData = require('../entity/MarketData');

class MarketRepository {
    async save(data) {
        try {
            const connection = await createConnection(); 
            const marketRepository = connection.getRepository(MarketData);

            const savedData = await marketRepository.save(data); 

            await connection.close(); 
            return savedData;
        } catch (error) {
            console.error('Error saving data:', error);
            throw new Error('Error saving data');
        }
    }

    async findAll() {
        try {
            const connection = await createConnection(); 
            const marketRepository = connection.getRepository(MarketData);

            const allData = await marketRepository.find(); 

            await connection.close(); 
            return allData;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error('Error fetching data');
        }
    }
}

module.exports = MarketRepository;
