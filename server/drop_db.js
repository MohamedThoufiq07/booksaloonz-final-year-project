const mongoose = require('mongoose');

const dropDB = async () => {
    const dbName = 'booksaloonz';
    console.log(`\nConnecting to ${dbName}...`);
    try {
        const conn = await mongoose.createConnection(`mongodb://localhost:27017/${dbName}`).asPromise();
        console.log(`Dropping database: ${dbName}...`);
        await conn.dropDatabase();
        console.log(`Database ${dbName} dropped successfully.`);
        await conn.close();
    } catch (err) {
        console.error(`Error dropping ${dbName}:`, err.message);
    }
    process.exit(0);
};

dropDB();
