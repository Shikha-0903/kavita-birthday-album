// ============================================
// Main Application
// ============================================

class BirthdayAlbumApp {
    constructor() {
        this.memories = [];
        this.animationController = null;
        this.modalController = null;
        this.isLoading = true;
    }

    /**
     * Initialize the application
     */
    async init() {
        console.log('🎂 Initializing Birthday Album...');

        // Initialize controllers
        this.animationController = new AnimationController();
        this.modalController = new ModalController();

        // Show loading screen
        this.showLoading();

        try {
            // Fetch images from Firebase
            await this.loadMemories();

            // Render memory stations
            this.renderStations();

            // Hide loading screen
            this.hideLoading();

            console.log('✨ Album loaded successfully!');
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showError(error);
        }
    }

    /**
     * Show loading screen with progress
     */
    showLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        const loadingProgress = document.getElementById('loadingProgress');

        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }

        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            if (loadingProgress) {
                loadingProgress.style.width = `${progress}%`;
            }
        }, 200);
    }

    /**
     * Hide loading screen
     */
    hideLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        const loadingProgress = document.getElementById('loadingProgress');

        if (loadingProgress) {
            loadingProgress.style.width = '100%';
        }

        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
            this.isLoading = false;
        }, 500);
    }

    /**
     * Load memories from Firebase Storage
     */
    async loadMemories() {
        try {
            // Fetch images from Firebase Storage
            const images = await window.FirebaseService.fetchImagesFromFolder('kavita/memories');

            if (images.length === 0) {
                console.warn('No images found in Firebase Storage');
                // Use demo data for testing
                this.memories = this.createDemoMemories();
            } else {
                // Organize images into memory stations
                this.memories = window.FirebaseService.organizeMemories(images);
            }

            console.log(`📸 Loaded ${this.memories.length} memory stations`);
        } catch (error) {
            console.error('Error loading memories:', error);
            // Fallback to demo data
            this.memories = this.createDemoMemories();
        }
    }

    /**
     * Create demo memories for testing (when Firebase is not configured)
     */
    createDemoMemories() {
        return [
            {
                id: 'station-0',
                emoji: '🎨',
                title: 'Autumn Beginnings 🍂',
                date: 'Friday, September 23, 2022',
                description: 'Where our beautiful journey started...',
                images: [
                    { url: 'https://picsum.photos/800/600?random=1', name: 'Memory 1' },
                    { url: 'https://picsum.photos/800/600?random=2', name: 'Memory 2' }
                ],
                unlocked: true
            },
            {
                id: 'station-1',
                emoji: '🪔',
                title: 'Festive Moments ✨',
                date: 'Friday, October 21, 2022',
                description: 'Celebrating life and friendship together',
                images: [
                    { url: 'https://picsum.photos/800/600?random=3', name: 'Memory 3' },
                    { url: 'https://picsum.photos/800/600?random=4', name: 'Memory 4' }
                ],
                unlocked: false
            },
            {
                id: 'station-2',
                emoji: '☕',
                title: 'Winter Memories ❄️',
                date: 'Saturday, December 17, 2022',
                description: 'Cozy moments and warm hearts',
                images: [
                    { url: 'https://picsum.photos/800/600?random=5', name: 'Memory 5' },
                    { url: 'https://picsum.photos/800/600?random=6', name: 'Memory 6' }
                ],
                unlocked: false
            },
            {
                id: 'station-3',
                emoji: '🌟',
                title: 'New Year, New Adventures 🎊',
                date: 'Tuesday, January 17, 2023',
                description: 'Starting the year with joy and laughter',
                images: [
                    { url: 'https://picsum.photos/800/600?random=7', name: 'Memory 7' },
                    { url: 'https://picsum.photos/800/600?random=8', name: 'Memory 8' }
                ],
                unlocked: false
            },
            {
                id: 'station-4',
                emoji: '🍁',
                title: 'Autumn Magic 🍁',
                date: 'Tuesday, October 31, 2023',
                description: 'Golden moments captured forever',
                images: [
                    { url: 'https://picsum.photos/800/600?random=9', name: 'Memory 9' },
                    { url: 'https://picsum.photos/800/600?random=10', name: 'Memory 10' }
                ],
                unlocked: false
            }
        ];
    }

    /**
     * Render memory stations
     */
    renderStations() {
        const container = document.getElementById('stationsContainer');
        if (!container) return;

        container.innerHTML = '';

        this.memories.forEach((memory, index) => {
            const station = this.createStationElement(memory, index);
            container.appendChild(station);

            // Observe station for unlocking animation
            if (!memory.unlocked) {
                this.animationController.observeStation(station);
            }
        });
    }

    /**
     * Create a station element
     */
    createStationElement(memory, index) {
        const station = document.createElement('div');
        station.className = `memory-station ${memory.unlocked ? 'unlocked' : 'locked'}`;
        station.id = memory.id;

        station.innerHTML = `
      <div class="station-marker">
        ${memory.emoji}
      </div>
      <div class="memory-card">
        <div class="memory-preview">
          <img src="${memory.images[0]?.url || 'https://picsum.photos/800/600'}" 
               alt="${memory.title}"
               loading="lazy">
          <div class="photo-count">
            📷 ${memory.images.length} ${memory.images.length === 1 ? 'photo' : 'photos'}
          </div>
        </div>
        <div class="memory-info">
          <h3>${memory.title}</h3>
          <p class="memory-date">${memory.date}</p>
          <p class="memory-description">${memory.description}</p>
        </div>
      </div>
    `;

        // Add click handler to open modal
        const card = station.querySelector('.memory-card');
        if (card) {
            card.addEventListener('click', () => {
                if (memory.unlocked || station.classList.contains('unlocked')) {
                    this.openMemory(memory);
                }
            });
        }

        return station;
    }

    /**
     * Open memory in modal
     */
    openMemory(memory) {
        const modal = document.getElementById('memoryModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalDate = document.getElementById('modalDate');

        if (modalTitle) modalTitle.textContent = memory.title;
        if (modalDate) modalDate.textContent = memory.date;

        this.modalController.open(memory.images, 0);
    }

    /**
     * Show error message
     */
    showError(error) {
        const loadingScreen = document.getElementById('loadingScreen');
        const loadingContent = loadingScreen?.querySelector('.loading-content');

        if (loadingContent) {
            loadingContent.innerHTML = `
        <div style="text-align: center;">
          <div style="font-size: 4rem; margin-bottom: 1rem;">😔</div>
          <h2 style="font-family: var(--font-heading); margin-bottom: 1rem;">Oops! Something went wrong</h2>
          <p style="margin-bottom: 1rem;">Please check your Firebase configuration</p>
          <p style="font-size: 0.9rem; opacity: 0.7;">${error.message}</p>
          <button onclick="location.reload()" style="
            margin-top: 2rem;
            padding: 1rem 2rem;
            background: var(--gradient-warm);
            border: none;
            border-radius: 50px;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            font-family: var(--font-body);
          ">Try Again</button>
        </div>
      `;
        }
    }
}

// ============================================
// Initialize App on Load
// ============================================

window.app = new BirthdayAlbumApp();

window.addEventListener('DOMContentLoaded', () => {
    window.app.init();
});
