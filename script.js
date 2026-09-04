// ============================================
// RANDOM JOKE GENERATOR
// ============================================

class JokeGenerator {
    constructor() {
        this.currentJoke = null;
        this.jokeCount = 0;
        this.favorites = this.loadFavorites();
        this.selectedAPI = 'all';
        this.selectedCategory = 'Any';
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadJoke();
    }

    // Initialize DOM elements
    initializeElements() {
        this.jokeText = document.getElementById('jokeText');
        this.jokeType = document.getElementById('jokeType');
        this.newJokeBtn = document.getElementById('newJokeBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.apiSelect = document.getElementById('apiSelect');
        this.categorySelect = document.getElementById('categorySelect');
        this.categorySection = document.getElementById('categorySection');
        this.loading = document.getElementById('loading');
        this.errorMessage = document.getElementById('errorMessage');
        this.jokeCountDisplay = document.getElementById('jokeCount');
        this.currentApiDisplay = document.getElementById('currentApi');
        this.toggleFavoritesBtn = document.getElementById('toggleFavoritesBtn');
        this.clearFavoritesBtn = document.getElementById('clearFavoritesBtn');
        this.favoritesList = document.getElementById('favoritesList');
    }

    // Attach event listeners
    attachEventListeners() {
        this.newJokeBtn.addEventListener('click', () => this.loadJoke());
        this.shareBtn.addEventListener('click', () => this.shareJoke());
        this.copyBtn.addEventListener('click', () => this.copyJoke());
        this.apiSelect.addEventListener('change', (e) => {
            this.selectedAPI = e.target.value;
            this.categorySection.style.display = this.selectedAPI === 'jokeapi' ? 'flex' : 'none';
            this.loadJoke();
        });
        this.categorySelect.addEventListener('change', (e) => {
            this.selectedCategory = e.target.value;
            this.loadJoke();
        });
        this.toggleFavoritesBtn.addEventListener('click', () => this.toggleFavorites());
        this.clearFavoritesBtn.addEventListener('click', () => this.clearFavorites());
    }

    // Show loading state
    showLoading() {
        this.loading.style.display = 'flex';
        this.newJokeBtn.disabled = true;
        this.shareBtn.disabled = true;
        this.copyBtn.disabled = true;
        this.errorMessage.style.display = 'none';
    }

    // Hide loading state
    hideLoading() {
        this.loading.style.display = 'none';
        this.newJokeBtn.disabled = false;
        this.shareBtn.disabled = false;
        this.copyBtn.disabled = false;
    }

    // Show error message
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
        this.hideLoading();
    }

    // Hide error message
    hideError() {
        this.errorMessage.style.display = 'none';
    }

    // Load joke from API
    async loadJoke() {
        this.showLoading();
        
        try {
            let joke = null;
            let source = '';

            if (this.selectedAPI === 'all') {
                // Random API selection
                const apis = ['jokeapi', 'official', 'dad'];
                const randomAPI = apis[Math.floor(Math.random() * apis.length)];
                joke = await this.fetchFromAPI(randomAPI);
                source = this.getAPIName(randomAPI);
            } else {
                joke = await this.fetchFromAPI(this.selectedAPI);
                source = this.getAPIName(this.selectedAPI);
            }

            if (joke) {
                this.currentJoke = {
                    text: joke.text,
                    type: joke.type,
                    source: source
                };
                this.displayJoke();
                this.jokeCount++;
                this.updateStats();
                this.hideError();
            } else {
                this.showError('Failed to load joke. Please try again.');
            }
        } catch (error) {
            console.error('Error loading joke:', error);
            this.showError('Error loading joke. Please check your connection and try again.');
        } finally {
            this.hideLoading();
        }
    }

    // Fetch from specific API
    async fetchFromAPI(api) {
        try {
            switch (api) {
                case 'jokeapi':
                    return await this.fetchFromJokeAPI();
                case 'official':
                    return await this.fetchFromOfficialAPI();
                case 'dad':
                    return await this.fetchFromDadJokes();
                default:
                    return null;
            }
        } catch (error) {
            console.error(`Error fetching from ${api}:`, error);
            return null;
        }
    }

    // Fetch from JokeAPI
    async fetchFromJokeAPI() {
        const category = this.selectedCategory === 'Any' ? 'Any' : this.selectedCategory;
        const url = `https://v2.jokeapi.dev/joke/${category}?type=single`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            return null;
        }

        return {
            text: data.joke,
            type: `${data.category} Joke`
        };
    }

    // Fetch from Official Joke API
    async fetchFromOfficialAPI() {
        const url = 'https://official-joke-api.appspot.com/random_joke';
        const response = await fetch(url);
        const data = await response.json();

        const jokeText = data.setup ? `${data.setup} ${data.punchline}` : data.joke;
        return {
            text: jokeText,
            type: 'General Joke'
        };
    }

    // Fetch from Dad Jokes API
    async fetchFromDadJokes() {
        const url = 'https://icanhazdadjoke.com/?format=json';
        const response = await fetch(url);
        const data = await response.json();

        return {
            text: data.joke,
            type: 'Dad Joke'
        };
    }

    // Display joke on screen
    displayJoke() {
        if (this.currentJoke) {
            this.jokeText.textContent = this.currentJoke.text;
            this.jokeType.textContent = this.currentJoke.type;
            this.currentApiDisplay.textContent = this.currentJoke.source;
        }
    }

    // Copy joke to clipboard
    copyJoke() {
        if (this.currentJoke) {
            navigator.clipboard.writeText(this.currentJoke.text).then(() => {
                const originalText = this.copyBtn.textContent;
                this.copyBtn.textContent = '✓ Copied!';
                setTimeout(() => {
                    this.copyBtn.textContent = originalText;
                }, 2000);
            });
        }
    }

    // Share joke
    shareJoke() {
        if (this.currentJoke) {
            const text = this.currentJoke.text;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Random Joke Generator',
                    text: text
                }).catch((error) => console.log('Error sharing:', error));
            } else {
                // Fallback: copy and show message
                navigator.clipboard.writeText(text);
                alert('Joke copied to clipboard! Share it wherever you like.');
            }
        }
    }

    // Add joke to favorites
    addToFavorites() {
        if (this.currentJoke) {
            const favorite = {
                id: Date.now(),
                text: this.currentJoke.text,
                timestamp: new Date().toLocaleString()
            };
            this.favorites.push(favorite);
            this.saveFavorites();
            this.updateFavoritesList();
        }
    }

    // Remove joke from favorites
    removeFromFavorites(id) {
        this.favorites = this.favorites.filter(fav => fav.id !== id);
        this.saveFavorites();
        this.updateFavoritesList();
    }

    // Toggle favorites visibility
    toggleFavorites() {
        if (this.favoritesList.style.display === 'none') {
            this.favoritesList.style.display = 'flex';
            this.clearFavoritesBtn.style.display = 'block';
            this.toggleFavoritesBtn.textContent = 'Hide Favorites';
            this.updateFavoritesList();
        } else {
            this.favoritesList.style.display = 'none';
            this.clearFavoritesBtn.style.display = 'none';
            this.toggleFavoritesBtn.textContent = 'Show Favorites';
        }
    }

    // Update favorites list display
    updateFavoritesList() {
        this.favoritesList.innerHTML = '';
        
        if (this.favorites.length === 0) {
            this.favoritesList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No favorite jokes yet!</p>';
            return;
        }

        this.favorites.forEach((favorite) => {
            const item = document.createElement('div');
            item.className = 'favorite-item';
            item.innerHTML = `
                <div class="favorite-item-text">${favorite.text}</div>
                <button class="favorite-item-remove" onclick="jokeGenerator.removeFromFavorites(${favorite.id})">Delete</button>
            `;
            this.favoritesList.appendChild(item);
        });
    }

    // Clear all favorites
    clearFavorites() {
        if (confirm('Are you sure you want to delete all favorite jokes?')) {
            this.favorites = [];
            this.saveFavorites();
            this.updateFavoritesList();
        }
    }

    // Save favorites to localStorage
    saveFavorites() {
        localStorage.setItem('jokeGeneratorFavorites', JSON.stringify(this.favorites));
    }

    // Load favorites from localStorage
    loadFavorites() {
        const stored = localStorage.getItem('jokeGeneratorFavorites');
        return stored ? JSON.parse(stored) : [];
    }

    // Update statistics display
    updateStats() {
        this.jokeCountDisplay.textContent = this.jokeCount;
    }

    // Get API name for display
    getAPIName(api) {
        const names = {
            'jokeapi': 'JokeAPI',
            'official': 'Official Joke API',
            'dad': 'Dad Jokes'
        };
        return names[api] || 'Unknown';
    }
}

// Initialize the app when DOM is ready
let jokeGenerator;

document.addEventListener('DOMContentLoaded', () => {
    jokeGenerator = new JokeGenerator();
    
    // Add favorites button functionality
    const favIcon = document.createElement('button');
    favIcon.id = 'addToFavoritesBtn';
    favIcon.className = 'btn btn-secondary';
    favIcon.textContent = '⭐ Add to Favorites';
    favIcon.style.position = 'absolute';
    favIcon.style.top = '10px';
    favIcon.style.right = '10px';
    favIcon.onclick = () => {
        jokeGenerator.addToFavorites();
        favIcon.textContent = '✓ Added to Favorites!';
        setTimeout(() => {
            favIcon.textContent = '⭐ Add to Favorites';
        }, 2000);
    };
    
    const jokeCard = document.querySelector('.joke-card');
    jokeCard.style.position = 'relative';
    jokeCard.appendChild(favIcon);
});
