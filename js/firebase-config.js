// ============================================
// Firebase Configuration
// ============================================

// Firebase configuration - Using environment variables via Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Storage reference
const storage = firebase.storage();
const storageRef = storage.ref();

// ============================================
// Firebase Storage Functions
// ============================================

/**
 * Fetch all images from a specific folder in Firebase Storage
 * @param {string} folderPath - Path to the folder (e.g., 'kavita/memories')
 * @returns {Promise<Array>} Array of image objects with URL and metadata
 */
async function fetchImagesFromFolder(folderPath) {
  try {
    const folderRef = storageRef.child(folderPath);
    const result = await folderRef.listAll();

    const imagePromises = result.items.map(async (itemRef) => {
      const url = await itemRef.getDownloadURL();
      const metadata = await itemRef.getMetadata();

      return {
        url: url,
        name: itemRef.name,
        fullPath: itemRef.fullPath,
        timeCreated: metadata.timeCreated,
        updated: metadata.updated,
        size: metadata.size,
        contentType: metadata.contentType
      };
    });

    const images = await Promise.all(imagePromises);

    // Sort by creation date
    images.sort((a, b) => new Date(a.timeCreated) - new Date(b.timeCreated));

    return images;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

/**
 * Group images by date/month for creating memory stations
 * @param {Array} images - Array of image objects
 * @returns {Array} Array of grouped memories
 */
function groupImagesByDate(images) {
  const grouped = {};

  images.forEach(image => {
    const date = new Date(image.timeCreated);
    const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

    if (!grouped[monthYear]) {
      grouped[monthYear] = {
        title: monthYear,
        date: date,
        images: []
      };
    }

    grouped[monthYear].images.push(image);
  });

  // Convert to array and sort by date
  const memories = Object.values(grouped).sort((a, b) => a.date - b.date);

  return memories;
}

/**
 * Organize images into memory stations with custom titles
 * @param {Array} images - Array of image objects
 * @returns {Array} Array of memory stations
 */
function organizeMemories(images) {
  // Group images by date extracted from filename
  const dateGroups = {};

  images.forEach(image => {
    // Extract date from filename (format: YYYY-MM-DD.jpg or YYYY-MM-DD_2.jpg)
    const dateMatch = image.name.match(/(\d{4}-\d{2}-\d{2})/);

    if (dateMatch) {
      const dateString = dateMatch[1]; // e.g., "2022-09-23"

      if (!dateGroups[dateString]) {
        dateGroups[dateString] = {
          dateString: dateString,
          date: new Date(dateString),
          images: []
        };
      }

      dateGroups[dateString].images.push(image);
    }
  });

  // Convert to array and sort by date
  const sortedGroups = Object.values(dateGroups).sort((a, b) => a.date - b.date);

  // Create memory stations with custom titles and descriptions
  const memoryStations = sortedGroups.map((group, index) => {
    const date = group.date;
    const dateString = group.dateString;

    // Get customization (either from config or auto-generated)
    const customization = window.MemoryCustomizations
      ? window.MemoryCustomizations.getMemoryCustomization(dateString, date)
      : {
        title: date.toLocaleString('default', { month: 'long', year: 'numeric' }),
        description: 'Beautiful memories from this day',
        emoji: '📸'
      };

    // Format date beautifully
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });

    return {
      id: `station-${index}`,
      emoji: customization.emoji,
      title: customization.title,
      date: formattedDate,
      dateString: dateString,
      description: customization.description,
      images: group.images,
      unlocked: index === 0 // First station is unlocked by default
    };
  });

  return memoryStations;
}

// Export for use in app.js
window.FirebaseService = {
  fetchImagesFromFolder,
  groupImagesByDate,
  organizeMemories
};
