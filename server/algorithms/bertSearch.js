// BERT-inspired Search Logic
// Purpose: Intelligent search matching user queries to salon services/names using semantic similarity (simplified).

const bertSearch = (query, salonData) => {
    // Placeholder logic for search algorithm
    // 1. Preprocess query
    console.log(`Searching for: ${query}`);

    // 2. Compute similarity (Mock)
    return salonData.filter(salon => salon.name.toLowerCase().includes(query.toLowerCase()));
};

module.exports = bertSearch;
