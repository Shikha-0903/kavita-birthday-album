// ============================================
// Memory Customization Configuration
// ============================================

/**
 * This file allows you to customize titles, descriptions, and emojis
 * for each memory based on the date from the filename.
 * 
 * Format: "YYYY-MM-DD" (matching your photo filenames)
 */

const MEMORY_CUSTOMIZATIONS = {
    "2022-09-23": {
        title: "Autumn Beginnings 🍂",
        description: "Where our beautiful journey started...",
        emoji: "🎨"
    },
    "2022-10-21": {
        title: "Our Chuha Selfie Era 🐭💕",
        description: "Because your messy pictures were always my favorite kind of perfect",
        emoji: "🐭💕"

    },
    "2022-12-17": {
        title: "Back to bachpan 🍬🧸",
        description: "Cozy moments and warm hearts",
        emoji: "💖"
    },
    "2022-12-19": {
        title: "Saree day ✨🌺",
        description: "Very first Saree day together",
        emoji: "💃"
    },
    "2023-01-17": {
        title: "Forever Smiles 😁",
        description: "Stored safely here",
        emoji: "🌟"
    },
    "2023-01-21": {
        title: "Moments That Matter 💫",
        description: "An Ordinary Day That Slowly Turned Into Something I’d Always Remember 🎈💫",
        emoji: "😂"
    },
    "2023-10-31": {
        title: "Jivdani temple with we4",
        description: "Golden moments captured forever",
        emoji: "💓"
    },
    "2023-12-11": {
        title: "Golden Memory ✨",
        description: "Shining forever",
        emoji: "✨"
    },
    "2023-12-13": {
        title: "From Tears to Laughter 😭😂",
        description: "I broke down, and you gently stitched me back with your smile",
        emoji: "🫂💖"
    },
    "2023-12-14": {
        title: "Captured Happiness",
        description: "A Bond That Words Could Never Explain 💞🔗",
        emoji: "🤍😊"
    },
    "2023-12-15": {
        title: "My beautiful kabbu",
        description: "Being With You Always Felt Like Coming Home Without Trying",
        emoji: "🏡"
    },
    "2023-12-18": {
        title: "Real Connection that we call as kya sync kia re",
        description: "Dil Aur Dimag Dono Se 🧠❤️",
        emoji: "♾️"
    },
    "2024-02-18": {
        title: "You look so cute and beautiful",
        description: "and i am in love with every Version of U💖",
        emoji: "🤪"
    },
    "2024-04-23": {
        title: "Iskon temple",
        description: "Love That Lives Inside This Memory 💓📸 isme se hi maine aapka moh maya wala gif banaya tha 😂",
        emoji: "📸"
    },
    "2024-07-05": {
        title: "Blessed to have you",
        description: "No Matter What, Always Us ♾️🤍",
        emoji: "💖"
    },
    "2024-09-19": {
        title: "Timeless Bond",
        description: "The Constant in Every Chapter of My Life 💕♾️",
        emoji: "⏰"
    },
    "2024-12-18": {
        title: "Sync Follows Us Everywhere 😂💞",
        description: "Even here, without trying, our hearts moved in the same rhythm",
        emoji: "♾️💖"
    },
    "2024-12-19": {
        title: "whats up my G",
        description: "No Matter Where Life Takes Us, You’ll Always Be My Person 👯‍♀️💖",
        emoji: "✨"
    },
    "2024-12-24": {
        title: "It was our last annual day",
        description: "Aur hum national park ghumne gaye the with lots of chaos😂",
        emoji: "🕊️"
    },
    "2025-01-31": {
        title: "Just us on VC",
        description: "and taking awkward Screenshots of each other😂Even After All This Time, It Still Feels Special ✨💞",
        emoji: "✨"
    },
    "2025-02-02": {
        title: "Your last birthday🎂✨",
        description: "which we have celebrated on 7th due to exams🤪These Are the Memories I Hold With Care 🌸🤍",
        emoji: "💝"
    },
    "2025-04-22": {
        title: "Soft Memories at ur house🌸",
        description: "Time Moved On, But This Moment Never Really Left where we laughed so hard created reels and everything we did was just awesome⏳💖",
        emoji: "🫂💖"
    },
    "2025-05-18": {
        title: "Ab mere ghr aao chalo😂",
        description: "Laughter That Left Its Mark on My Heart 😆💖",
        emoji: "💕"
    },
    "2025-07-07": {
        title: "we met again😂",
        description: "jaha humne makeup makeup khela tha😂",
        emoji: "😆💖"
    },
    "2025-09-09": {
        title: "One Picture, A Thousand Feelings 🥰📷",
        description: "seriously u made my birthday so special i never told u but i was just about to cry Some People Leave a Quiet Mark on Your Life — You’re One of Them 🌟🤍 thank you soo my gurl",
        emoji: "🌟🤍"
    },
    "2025-11-02": {
        title: "Somehow Unforgettable 🧩💖",
        description: "We chit chatted a lot aur wo so so sa sandwich usse accha toh humne ghr pe banaya tha,I shared many things and u listened to me very patiently That Smile Felt Like a Quiet Promise That Everything Would Be Okay 😊🕊️",
        emoji: "♾️🤍"
    },
    "2025-11-09": {
        title: "Trip to 7 wonders",
        description: "Yaha humne puri duniya ghum li😂",
        emoji: "😂🫀"
    },
    "2026-01-01": {
        title: "New year pagoda trip",
        description: "the trip was too tough but we enjoyed a lot A Small Journey That Ended Up Meaning So Much More 🗺️🤍",
        emoji: "🤍"
    },
    "2026-01-03": {
        title: "My dearest precious friend",
        description: "Happy Birthday, Kavita — This Entire Story Exists Because of You 🎂🕊️ I want you to always be with me",
        emoji: "🤍"
    }


};

/**
 * Default titles and descriptions for months (fallback)
 */
const MONTH_THEMES = {
    0: { season: "Winter", emoji: "❄️", vibe: "Cozy and warm" },
    1: { season: "Winter", emoji: "💝", vibe: "Love and friendship" },
    2: { season: "Spring", emoji: "🌸", vibe: "Fresh beginnings" },
    3: { season: "Spring", emoji: "🌷", vibe: "Blooming memories" },
    4: { season: "Spring", emoji: "🌺", vibe: "Vibrant moments" },
    5: { season: "Summer", emoji: "☀️", vibe: "Sunny adventures" },
    6: { season: "Summer", emoji: "🌻", vibe: "Bright and cheerful" },
    7: { season: "Summer", emoji: "🏖️", vibe: "Fun in the sun" },
    8: { season: "Autumn", emoji: "🍂", vibe: "Golden memories" },
    9: { season: "Autumn", emoji: "🍁", vibe: "Colorful moments" },
    10: { season: "Autumn", emoji: "🎃", vibe: "Festive times" },
    11: { season: "Winter", emoji: "🎄", vibe: "Holiday magic" }
};

/**
 * Get customization for a specific date
 */
function getMemoryCustomization(dateString, date) {
    // Check if there's a custom configuration for this exact date
    if (MEMORY_CUSTOMIZATIONS[dateString]) {
        return MEMORY_CUSTOMIZATIONS[dateString];
    }

    // Otherwise, generate based on month/season
    const month = date.getMonth();
    const theme = MONTH_THEMES[month];
    const monthName = date.toLocaleString('default', { month: 'long' });

    return {
        title: `${theme.season} Memories ${theme.emoji}`,
        description: `${theme.vibe} - ${monthName} ${date.getFullYear()}`,
        emoji: theme.emoji
    };
}

// Export for use in firebase-config.js
window.MemoryCustomizations = {
    getMemoryCustomization,
    MEMORY_CUSTOMIZATIONS
};
