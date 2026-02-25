/**
 * Hair Style Recommendation Controller
 * Handles image upload, face analysis, and hairstyle recommendations
 */

const { analyzeface } = require('../services/faceAnalysisService');
const hairstyleRecommendations = require('../data/hairstyleData');

/**
 * POST /api/hairstyle/analyze
 * Accepts an uploaded face image, analyzes face shape, returns recommendations
 */
const analyzeFaceAndRecommend = async (req, res) => {
    try {
        // Validate file upload
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'NO_IMAGE',
                message: 'No image file was uploaded. Please upload a face photo.'
            });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!allowedTypes.includes(req.file.mimetype)) {
            return res.status(400).json({
                success: false,
                error: 'INVALID_TYPE',
                message: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.'
            });
        }

        // Validate file size (max 10MB)
        if (req.file.size > 10 * 1024 * 1024) {
            return res.status(400).json({
                success: false,
                error: 'FILE_TOO_LARGE',
                message: 'Image file is too large. Maximum size is 10MB.'
            });
        }

        console.log(`📸 Analyzing image: ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)}KB)`);

        // Run face analysis
        const analysisResult = await analyzeface(req.file.buffer);

        if (!analysisResult.success) {
            return res.status(422).json(analysisResult);
        }

        // Get recommendations for the detected face shape
        const recommendations = hairstyleRecommendations[analysisResult.faceShape] || [];

        // Build response
        const response = {
            success: true,
            faceShape: analysisResult.faceShape,
            confidence: analysisResult.confidence,
            measurements: analysisResult.measurements,
            boundingBox: analysisResult.boundingBox,
            recommendations: recommendations.map(style => ({
                name: style.name,
                image: style.image,
                description: style.description,
                reason: style.reason
            })),
            disclaimer: "AI-based suggestion. Results may vary based on hair texture, density, and personal preferences."
        };

        console.log(`✅ Face shape detected: ${analysisResult.faceShape} (${analysisResult.confidence}% confidence)`);

        return res.status(200).json(response);

    } catch (error) {
        console.error('❌ Hair style analysis error:', error.message);
        console.error('   Stack:', error.stack);

        // Handle specific errors
        if (error.message && (error.message.includes('models not loaded') || error.message.includes('download-models'))) {
            return res.status(503).json({
                success: false,
                error: 'MODELS_NOT_READY',
                message: 'Face detection service is initializing. Please try again in a moment.'
            });
        }

        return res.status(500).json({
            success: false,
            error: 'SERVER_ERROR',
            message: 'An unexpected error occurred during analysis. Please try again. (' + (error.message || 'unknown') + ')'
        });
    }
};

/**
 * GET /api/hairstyle/shapes
 * Returns all available face shapes and their descriptions
 */
const getFaceShapes = (req, res) => {
    const shapes = {
        Oval: {
            description: "Face length is greater than width with a smooth, rounded jawline.",
            characteristics: ["Balanced proportions", "Slightly wider cheekbones", "Gently rounded jaw"]
        },
        Round: {
            description: "Face width is approximately equal to length with soft, curved edges.",
            characteristics: ["Equal width and length", "Full cheeks", "Rounded chin"]
        },
        Square: {
            description: "Strong, angular jawline with a wide forehead matching jaw width.",
            characteristics: ["Wide forehead", "Strong jawline", "Angular features"]
        },
        Heart: {
            description: "Wider forehead that narrows to a pointed chin.",
            characteristics: ["Broad forehead", "High cheekbones", "Narrow, pointed chin"]
        },
        Diamond: {
            description: "Narrow forehead and chin with the widest point at the cheekbones.",
            characteristics: ["Narrow forehead", "Wide cheekbones", "Narrow chin"]
        }
    };

    return res.status(200).json({
        success: true,
        shapes,
        totalStyles: Object.keys(hairstyleRecommendations).reduce(
            (acc, key) => acc + hairstyleRecommendations[key].length, 0
        )
    });
};

/**
 * GET /api/hairstyle/recommendations/:shape
 * Returns hairstyle recommendations for a specific face shape
 */
const getRecommendationsByShape = (req, res) => {
    const { shape } = req.params;
    const normalizedShape = shape.charAt(0).toUpperCase() + shape.slice(1).toLowerCase();

    const recommendations = hairstyleRecommendations[normalizedShape];

    if (!recommendations) {
        return res.status(404).json({
            success: false,
            error: 'INVALID_SHAPE',
            message: `Invalid face shape: "${shape}". Valid shapes are: Oval, Round, Square, Heart, Diamond.`
        });
    }

    return res.status(200).json({
        success: true,
        faceShape: normalizedShape,
        recommendations
    });
};

module.exports = {
    analyzeFaceAndRecommend,
    getFaceShapes,
    getRecommendationsByShape
};
