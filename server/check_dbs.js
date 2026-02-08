const mongoose = require('mongoose');

const checkDB = async (dbName) => {
    console.log(`\nChecking database: ${dbName}...`);
    try {
        const conn = await mongoose.createConnection(`mongodb://localhost:27017/${dbName}`).asPromise();
        const collections = await conn.db.listCollections().toArray();

        if (collections.length === 0) {
            console.log(`  [${dbName}] has NO collections.`);
        } else {
            console.log(`  [${dbName}] contains ${collections.length} collections:`);
            for (const col of collections) {
                const count = await conn.collection(col.name).countDocuments();
                console.log(`    - ${col.name}: ${count} documents`);
            }
        }
        await conn.close();
    } catch (err) {
        console.error(`  Error connecting to ${dbName}:`, err.message);
    }
};

const main = async () => {
    await checkDB('booksaloon');
    await checkDB('booksaloonz');
    console.log('\nDone.');
    process.exit(0);
};

main();
