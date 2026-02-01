// ============================================
// Animation Controllers
// ============================================

class AnimationController {
    constructor() {
        this.scrollPosition = 0;
        this.trainPosition = 0;
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupIntersectionObserver();
    }

    /**
     * Setup scroll-based animations
     */
    setupScrollAnimations() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            this.scrollPosition = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateAnimations();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /**
     * Update animations based on scroll position
     */
    updateAnimations() {
        this.updateTrainPosition();
        this.updateParallax();
        this.hideScrollIndicator();
    }

    /**
     * Update train position along the track
     */
    updateTrainPosition() {
        const train = document.getElementById('train');
        if (!train) return;

        const journeySection = document.querySelector('.journey-section');
        if (!journeySection) return;

        const sectionTop = journeySection.offsetTop;
        const sectionHeight = journeySection.offsetHeight;
        const scrollInSection = this.scrollPosition - sectionTop + window.innerHeight / 2;

        // Calculate train position (0% to 100%)
        const progress = Math.max(0, Math.min(1, scrollInSection / sectionHeight));
        this.trainPosition = progress * 100;

        train.style.left = `${this.trainPosition}%`;
    }

    /**
     * Parallax effect for hero background
     */
    updateParallax() {
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(this.scrollPosition * speed);
            orb.style.transform = `translateY(${yPos}px)`;
        });
    }

    /**
     * Hide scroll indicator after scrolling
     */
    hideScrollIndicator() {
        const indicator = document.querySelector('.scroll-indicator');
        if (indicator) {
            if (this.scrollPosition > 100) {
                indicator.style.opacity = '0';
                indicator.style.pointerEvents = 'none';
            } else {
                indicator.style.opacity = '1';
                indicator.style.pointerEvents = 'auto';
            }
        }
    }

    /**
     * Setup Intersection Observer for station unlocking
     */
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.unlockStation(entry.target);
                }
            });
        }, options);
    }

    /**
     * Observe a station element
     */
    observeStation(stationElement) {
        if (this.observer) {
            this.observer.observe(stationElement);
        }
    }

    /**
     * Unlock a station with animation
     */
    unlockStation(stationElement) {
        if (stationElement.classList.contains('locked')) {
            stationElement.classList.remove('locked');
            stationElement.classList.add('unlocked');

            // Add particle effect
            this.createUnlockEffect(stationElement);

            // Play sound (optional)
            // this.playUnlockSound();
        }
    }

    /**
     * Create particle effect when unlocking a station
     */
    createUnlockEffect(element) {
        const marker = element.querySelector('.station-marker');
        if (!marker) return;

        const particleCount = 20;
        const rect = marker.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #c471f5 0%, #fa71cd 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${centerX}px;
        top: ${centerY}px;
      `;

            document.body.appendChild(particle);

            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 100 + Math.random() * 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${tx}px, ${ty}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            }).onfinish = () => particle.remove();
        }
    }

    /**
     * Smooth scroll to element
     */
    smoothScrollTo(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// ============================================
// Modal Animation Controller
// ============================================

class ModalController {
    constructor() {
        this.modal = null;
        this.currentIndex = 0;
        this.images = [];
    }

    /**
     * Open modal with images
     */
    open(images, startIndex = 0) {
        this.modal = document.getElementById('memoryModal');
        this.images = images;
        this.currentIndex = startIndex;

        if (this.modal) {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.showImage(this.currentIndex);
            this.setupModalControls();
        }
    }

    /**
     * Close modal
     */
    close() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    /**
     * Show image at index
     */
    showImage(index) {
        const image = document.getElementById('galleryImage');
        if (image && this.images[index]) {
            // Fade out
            image.style.opacity = '0';

            setTimeout(() => {
                image.src = this.images[index].url;
                image.alt = this.images[index].name;

                // Fade in
                image.onload = () => {
                    image.style.opacity = '1';
                };
            }, 200);

            this.updateDots();
        }
    }

    /**
     * Navigate to next image
     */
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(this.currentIndex);
    }

    /**
     * Navigate to previous image
     */
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(this.currentIndex);
    }

    /**
     * Go to specific image
     */
    goTo(index) {
        this.currentIndex = index;
        this.showImage(this.currentIndex);
    }

    /**
     * Update navigation dots
     */
    updateDots() {
        const dotsContainer = document.getElementById('galleryDots');
        if (!dotsContainer) return;

        dotsContainer.innerHTML = '';

        this.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === this.currentIndex ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goTo(index));
            dotsContainer.appendChild(dot);
        });
    }

    /**
     * Setup modal controls
     */
    setupModalControls() {
        const closeBtn = document.getElementById('modalClose');
        const overlay = document.getElementById('modalOverlay');
        const prevBtn = document.getElementById('galleryPrev');
        const nextBtn = document.getElementById('galleryNext');

        if (closeBtn) {
            closeBtn.onclick = () => this.close();
        }

        if (overlay) {
            overlay.onclick = () => this.close();
        }

        if (prevBtn) {
            prevBtn.onclick = () => this.prev();
        }

        if (nextBtn) {
            nextBtn.onclick = () => this.next();
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;

            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
            if (e.key === 'Escape') this.close();
        });

        // Touch swipe support
        this.setupTouchSwipe();
    }

    /**
     * Setup touch swipe for mobile
     */
    setupTouchSwipe() {
        const gallery = document.getElementById('galleryContainer');
        if (!gallery) return;

        let touchStartX = 0;
        let touchEndX = 0;

        gallery.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        gallery.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    /**
     * Handle swipe gesture
     */
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }
}

// Export controllers
window.AnimationController = AnimationController;
window.ModalController = ModalController;
