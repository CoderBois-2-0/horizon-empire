async function migrateData() {
    try {
        // migrating to mongo
        
    } catch (error) {
        console.error("Error migrating data to mongoDB:", error);
    }

    // TODO: insert migraton to neo4j

    console.log("Migrated all data successfully!");
}

// migrateData()