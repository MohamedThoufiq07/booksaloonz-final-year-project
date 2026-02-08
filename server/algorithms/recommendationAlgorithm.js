// Recommendation Algorithm (NCF-inspired Service Suggestion)
// Purpose: Recommend products or salons based on rating and popularity.

const recommendationAlgorithm = (items, limit = 4) => {
    // Neural Collaborative Filtering inspired logic:
    // In this simple version, we recommend top-rated items that might interest the user.

    return [...items]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
};

module.exports = recommendationAlgorithm;
