const mongoose = require('mongoose');
const fs = require('fs');

const logFile = 'db_analysis.txt';
fs.writeFileSync(logFile, 'Database Analysis\n=================\n');

const log = (msg) => {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
};

const checkDB = async (dbName) => {
    log(`\nChecking database: ${dbName}...`);
    try {
        const conn = await mongoose.createConnection(`mongodb://localhost:27017/${dbName}`).asPromise();
        const collections = await conn.db.listCollections().toArray();

        if (collections.length === 0) {
            log(`  [${dbName}] has NO collections.`);
        } else {
            log(`  [${dbName}] contains ${collections.length} collections:`);
            for (const col of collections) {
                const count = await conn.collection(col.name).countDocuments();
                log(`    - ${col.name}: ${count} documents`);
            }
        }
        await conn.close();
    } catch (err) {
        log(`  Error connecting to ${dbName}: ${err.message}`);
    }
};

const main = async () => {
    await checkDB('booksaloon');
    await checkDB('booksaloonz');
    log('\nDone.');
    process.exit(0);
};

main();
