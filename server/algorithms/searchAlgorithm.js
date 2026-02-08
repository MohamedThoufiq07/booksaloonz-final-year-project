// Search Algorithm (BERT-inspired Keyword Matching)
// Purpose: Perform semantic-like search by looking for keywords in name, category, and description.

const searchAlgorithm = (items, query) => {
    if (!query) return items;

    const keywords = query.toLowerCase().split(' ');

    return items.filter(item => {
        const name = item.name.toLowerCase();
        const address = (item.address || '').toLowerCase();
        const category = (item.category || '').toLowerCase();

        // Simple logic: if any keyword matches name, address or category, it ranks higher.
        return keywords.some(word =>
            name.includes(word) || address.includes(word) || category.includes(word)
        );
    });
};

module.exports = searchAlgorithm;
