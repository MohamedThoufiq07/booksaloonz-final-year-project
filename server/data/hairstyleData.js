/**
 * Hairstyle Recommendations Database
 * Maps face shapes to recommended hairstyles with details
 */

const hairstyleRecommendations = {
    Oval: [
        {
            name: "Classic Pompadour",
            image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80",
            description: "A timeless voluminous style swept upward and back from the forehead.",
            reason: "Oval faces are versatile — the pompadour adds height and structure while complementing balanced proportions."
        },
        {
            name: "Textured Quiff",
            image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80",
            description: "A modern variation with textured layers and natural movement on top.",
            reason: "The quiff enhances your symmetrical face shape, adding personality without overwhelming your features."
        },
        {
            name: "Side Part",
            image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=600&q=80",
            description: "A clean, defined part with medium length on top and tapered sides.",
            reason: "Oval faces handle defined parts beautifully — it creates a polished, sophisticated look that highlights your jawline."
        },
        {
            name: "Medium Length Waves",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
            description: "Natural flowing waves at medium length, creating an effortless look.",
            reason: "Your balanced face proportions pair perfectly with natural waves — soft and stylish without much effort."
        },
        {
            name: "Buzz Cut with Fade",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
            description: "A clean buzz cut with a gradient fade on the sides for a sharp finish.",
            reason: "Oval faces can pull off minimal styles — the fade adds dimension while showing off your natural face shape."
        }
    ],
    Round: [
        {
            name: "High Fade Undercut",
            image: "https://images.unsplash.com/photo-1585747860019-8764e8414795?auto=format&fit=crop&w=600&q=80",
            description: "Short on the sides with a sharp fade, longer and styled on top for height.",
            reason: "The high fade creates vertical emphasis, elongating a round face and adding definition to your jawline."
        },
        {
            name: "Spiky Textured Top",
            image: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?auto=format&fit=crop&w=600&q=80",
            description: "Short, textured spikes on top with tight, clean sides.",
            reason: "Vertical spikes create the illusion of a longer face, perfectly counterbalancing round proportions."
        },
        {
            name: "Faux Hawk",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
            description: "A modern mohawk-inspired style with tapered sides and a styled center ridge.",
            reason: "Adds angular dimension and height to your face, creating the appearance of a slimmer, more defined shape."
        },
        {
            name: "Asymmetric Fringe",
            image: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=600&q=80",
            description: "A longer fringe swept to one side with short sides.",
            reason: "The diagonal line of the fringe breaks the symmetry of a round face, creating visual interest and a slimming effect."
        },
        {
            name: "Slicked Back",
            image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
            description: "Hair combed back smoothly with a matte or shine finish.",
            reason: "Pulls volume away from the sides and emphasizes forehead height, making round faces appear more angular."
        }
    ],
    Square: [
        {
            name: "Messy Textured Crop",
            image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=600&q=80",
            description: "A short, layered crop with a naturally tousled, textured finish.",
            reason: "Soft textures on top balance a strong jawline, adding playfulness without compromising your masculine features."
        },
        {
            name: "Classic Taper",
            image: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&w=600&q=80",
            description: "Gradually shorter from top to neckline with a refined, clean finish.",
            reason: "The taper's gradual transition softens the angular lines of a square face while maintaining a polished look."
        },
        {
            name: "Layered Medium Length",
            image: "https://images.unsplash.com/photo-1580518337843-f959e992563b?auto=format&fit=crop&w=600&q=80",
            description: "Medium-length hair with layered cuts to create movement and volume.",
            reason: "Layers around the face soften strong square features and add visual flow that complements your bone structure."
        },
        {
            name: "Fringe with Fade",
            image: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?auto=format&fit=crop&w=600&q=80",
            description: "A textured fringe paired with a clean fade on the sides.",
            reason: "The fringe draws attention upward while the fade keeps the sides sleek, balancing a strong jawline perfectly."
        },
        {
            name: "Brushed Up Style",
            image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=600&q=80",
            description: "Hair brushed upward from the forehead with light hold for natural volume.",
            reason: "Adds height and softness to a square face, creating a more elongated silhouette while looking effortlessly groomed."
        }
    ],
    Heart: [
        {
            name: "Side-Swept Fringe",
            image: "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?auto=format&fit=crop&w=600&q=80",
            description: "A longer fringe swept naturally to the side, with medium-length sides.",
            reason: "Covers the wider forehead area and draws the eye downward, creating balance with a narrower chin."
        },
        {
            name: "Chin-Length Layers",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
            description: "Layered hair that falls to chin length, adding volume around the jawline.",
            reason: "Adds width at the chin level to balance a wider forehead, creating more harmonious face proportions."
        },
        {
            name: "Textured Curtain Bangs",
            image: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=600&q=80",
            description: "Parted bangs that frame the face with a vintage-modern aesthetic.",
            reason: "Curtain bangs minimize perceived forehead width and frame the cheekbones beautifully on heart-shaped faces."
        },
        {
            name: "Low Fade with Volume",
            image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80",
            description: "Short fade on the lower sides with controlled volume on top.",
            reason: "Keeps volume proportional — avoiding too much height while maintaining width lower down to balance the chin."
        },
        {
            name: "Casual Messy Look",
            image: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=600&q=80",
            description: "An effortless, naturally tousled style with medium texture.",
            reason: "The relaxed texture across your forehead softens the wider top portion and adds casual charm to heart-shaped faces."
        }
    ],
    Diamond: [
        {
            name: "Voluminous Top with Tapered Sides",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
            description: "Full volume on top with gradually tapered sides for a balanced look.",
            reason: "Adds width to a narrow forehead and chin while the taper prevents extra bulk at the already-wide cheekbones."
        },
        {
            name: "Textured Fringe",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
            description: "A piece-y, textured fringe that falls naturally across the forehead.",
            reason: "Widens the appearance of a narrow forehead and softens angular cheekbones, creating ideal proportions."
        },
        {
            name: "Side Part with Volume",
            image: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=600&q=80",
            description: "A defined side part with voluminous styling on the heavier side.",
            reason: "The volume fills out the forehead area while the part adds sophistication that works with diamond face angles."
        },
        {
            name: "Medium Length Swept Back",
            image: "https://images.unsplash.com/photo-1542327897-d73f4005b533?auto=format&fit=crop&w=600&q=80",
            description: "Hair grown to medium length and swept back for a sleek, confident look.",
            reason: "Gives fullness to the forehead and chin while keeping cheekbone-level hair smooth and controlled."
        },
        {
            name: "Curly Top Fade",
            image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
            description: "Natural curls or waves on top with a clean fade on the sides.",
            reason: "Curls add width at the temples and crown, balancing the narrow forehead typical of diamond faces."
        }
    ]
};

module.exports = hairstyleRecommendations;
